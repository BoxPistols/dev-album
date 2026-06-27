import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const investItems = [
  {
    letter: "I",
    title: "Independent（独立している）",
    description:
      "他のストーリーへの依存が少なく、単独で着手・リリースできる。依存が強いと並行作業や順序入れ替えがしにくくなる。",
  },
  {
    letter: "N",
    title: "Negotiable（交渉可能）",
    description:
      "詳細を作り込んだ契約書ではなく、対話のきっかけ。実装方法やスコープはチームとの会話で詰める余地を残す。",
  },
  {
    letter: "V",
    title: "Valuable（価値がある）",
    description:
      "ユーザーやビジネスにとっての価値が説明できる。技術的なタスクの羅列ではなく、誰が何のために嬉しいかが分かる。",
  },
  {
    letter: "E",
    title: "Estimable（見積もり可能）",
    description:
      "おおよその大きさを見積もれる程度に内容が明確。見積もれない場合は情報不足か、分割が必要なサイン。",
  },
  {
    letter: "S",
    title: "Small（小さい）",
    description:
      "1 スプリント内に収まる大きさ。大きすぎるストーリーは分割して、こまめに完了とフィードバックを得る。",
  },
  {
    letter: "T",
    title: "Testable（テスト可能）",
    description:
      "完了したかどうかを判定できる受け入れ基準を書ける。テストできない要件は曖昧なまま実装に入ってしまう。",
  },
];

export default function Backlog() {
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
            バックログとユーザーストーリー
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            プロダクトバックログは「これから作るかもしれないことの一覧」です。
            その中身を「機能名の箇条書き」ではなく「誰が・何を・なぜ欲しいのか」という
            ユーザーストーリーの形で書くと、チームは価値を起点に会話できます。
            ここでは、バックログの考え方と、ストーリー・受け入れ基準の書き方を一通り体験できます。
          </p>
        </div>

        <WhyNowBox
          tags={["バックログ", "ユーザーストーリー", "INVEST", "受け入れ基準"]}
        >
          <p>
            やることリストを TODO
            として並べるだけだと、「なぜそれを作るのか」がすぐに抜け落ちます。
            実装が進むほど判断の場面が増え、価値の文脈を共有できていないチームは
            細かい仕様で立ち止まりがちです。ユーザーストーリーは、その文脈を
            一行に閉じ込めて持ち運べるようにする道具です。バックログを「価値の優先順位つきリスト」
            として育てられるようになると、何から作るかの議論がぐっと進めやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* プロダクトバックログ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              プロダクトバックログとは
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              プロダクトバックログは、プロダクトに加えうる変更を一つのリストにまとめたものです。
              機能・改善・不具合修正・技術的な調査などが、価値と優先順位の観点で並びます。
              重要なのは「完成版の仕様書」ではなく、
              <strong>常に並び替えられ、足され、削られる生きたリスト</strong>
              だという点です。上にあるものほど詳細で実装に近く、下にいくほど粗いままで構いません。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    上位（近い未来）
                  </p>
                  <p className="text-muted-foreground">
                    詳細で見積もり済み。次のスプリントで着手できる粒度
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">中位</p>
                  <p className="text-muted-foreground">
                    方向性は固まるが詳細はこれから。リファインメントの対象
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="font-bold text-primary mb-1">
                    下位（遠い未来）
                  </p>
                  <p className="text-muted-foreground">
                    粗いアイデアやエピックのまま。今は深掘りしない
                  </p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="DEEP な状態を保つ">
              良いバックログは Detailed
              appropriately（適切に詳細化）・Estimated（見積もり済み）・
              Emergent（変化していく）・Prioritized（優先順位つき）の頭文字で
              DEEP と言われます。
              すべてを一度に完璧にする必要はなく、上位だけを厚く保つのがコツです。
            </InfoBox>
          </section>

          {/* ユーザーストーリー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ユーザーストーリー（As a / I want / So that）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ユーザーストーリーは、機能を「利用者の視点」で短く表現する書き方です。
              定番のテンプレートは
              <strong>
                「As a（誰として） / I want（何をしたい） / So that（なぜ）」
              </strong>
              の 3 行。特に
              <strong>So that</strong>
              が大切で、ここに価値の理由が書かれます。理由が書けないストーリーは、
              そもそも作る必要があるかを問い直す合図になります。
            </p>

            <CodeBlock
              language="bash"
              title="ユーザーストーリーの記述例"
              code={`As a   通販サイトの会員として
I want 過去の注文履歴を一覧で確認したい
So that 同じ商品を探し直さずに再注文できるようにするため`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              「注文履歴ページを作る」という機能名だけでは、何のために作るのかが分かりません。
              上の例なら「再注文の手間を減らす」という目的がはっきりするので、
              一覧の代わりに「再注文ボタン」を目立たせるといった別案も検討できます。
              ストーリーは仕様を縛るためではなく、
              <strong>会話のきっかけを残すため</strong>に書きます。
            </p>
          </section>

          {/* INVEST */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              良いストーリーの基準：INVEST 原則
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              書いたストーリーが扱いやすいかどうかは、INVEST という 6
              つの観点でチェックできます。
              すべてを満たす完璧さを目指すより、「どれが弱いか」を見つけて改善のヒントにする使い方が実用的です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {investItems.map((item) => (
                <div
                  key={item.letter}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {item.letter}
                    </span>
                    <h3 className="font-bold text-foreground text-base">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ユーザーストーリーの「So that（なぜ）」が最も役立つのはどんな場面？"
              options={[
                { label: "実装に使うフレームワークを決めるとき" },
                {
                  label:
                    "そのストーリーに価値があるか、別の解決策がないかを判断するとき",
                  correct: true,
                },
                { label: "コードのレビュー担当者を決めるとき" },
                { label: "テストの実行時間を短くするとき" },
              ]}
              explanation="So that には「なぜ欲しいのか」という価値の理由が書かれます。理由が明確だと、本当に作るべきかの判断ができ、同じ目的を満たす別の（より小さい）解決策も検討できます。理由が書けないストーリーは見直しのサインです。"
            />
          </section>

          {/* 受け入れ基準 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              受け入れ基準（Given-When-Then）
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ストーリーが「何のために」を表すのに対し、受け入れ基準は
              <strong>「どうなったら完了と言えるか」</strong>を表します。
              定番の書き方が
              <strong>「Given（前提） / When（操作） / Then（結果）」</strong>
              という 3
              部構成です。具体的な状況・操作・期待される結果をセットで書くと、
              そのままテストケースに落とせます。
            </p>

            <CodeBlock
              language="bash"
              title="受け入れ基準の記述例（注文履歴のストーリーに対して）"
              code={`シナリオ: 会員が注文履歴を確認する
Given ログイン済みの会員で、過去に 3 件の注文がある
When  マイページの「注文履歴」を開く
Then  3 件の注文が新しい順に一覧表示される
And   各注文に「再注文」ボタンが表示される

シナリオ: 注文が一件もない場合
Given ログイン済みで注文が 0 件の会員
When  「注文履歴」を開く
Then  「まだ注文がありません」というメッセージが表示される`}
            />

            <p className="text-muted-foreground mt-6 leading-relaxed">
              基準を書くと「注文が 0
              件のときどう見せるか」のような抜けが、実装前に表に出てきます。
              受け入れ基準は実装後のチェックリストであると同時に、
              <strong>実装前に仕様の穴を見つける道具</strong>でもあります。
            </p>

            <InfoBox type="warning" title="基準は多すぎても少なすぎても困る">
              受け入れ基準が 1 つもないと「完了」の判断が人によってブレます。
              逆に十数個も並ぶと、ストーリーが大きすぎる可能性が高いです。
              基準が膨らんできたら、ストーリー自体の分割を検討しましょう。
            </InfoBox>
          </section>

          {/* 階層 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              エピック → ストーリー → タスクの階層
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              バックログの項目は、粒度の違いで 3
              つの層に整理できます。大きな目標を表す
              <strong>エピック</strong>、ユーザー価値の単位である
              <strong>ストーリー</strong>、それを実現する作業の単位である
              <strong>タスク</strong>
              です。上の層ほど価値や目的に近く、下の層ほど実装の手順に近づきます。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      層
                    </th>
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      表すもの
                    </th>
                    <th className="text-left py-2 px-3 font-bold text-foreground">
                      例
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      エピック
                    </td>
                    <td className="py-2 px-3">
                      数スプリントにまたがる大きなまとまり
                    </td>
                    <td className="py-2 px-3">「会員のリピート購入を促す」</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      ストーリー
                    </td>
                    <td className="py-2 px-3">
                      1 スプリントに収まるユーザー価値の単位
                    </td>
                    <td className="py-2 px-3">「注文履歴から再注文できる」</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-medium text-foreground">
                      タスク
                    </td>
                    <td className="py-2 px-3">
                      ストーリーを実装する作業の単位
                    </td>
                    <td className="py-2 px-3">
                      「履歴 API を作る」「一覧 UI を作る」
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              エピックは「いつか分割される予約席」のようなものです。
              着手が近づいたら、リファインメントでストーリーへ割り、
              さらにスプリント計画でタスクへ落とします。
              最初から全部を細かくしないことで、計画に無駄な労力を使わずに済みます。
            </p>
          </section>

          {/* リファインメント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              バックログリファインメント
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              バックログリファインメント（グルーミングとも呼ばれます）は、
              バックログの上位項目を継続的に整える活動です。
              ストーリーを分割し、内容を明確にし、受け入れ基準を書き、見積もりを更新します。
              一度きりのイベントではなく、
              <strong>少しずつ前倒しで準備しておく習慣</strong>
              として捉えると効果的です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  リファインメントでやること
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  大きすぎる項目の分割、曖昧な項目の明確化、受け入れ基準の追加、
                  優先順位の見直し、不要になった項目の削除。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-1 text-base">
                  「準備完了」の目安
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  チームが「これなら次のスプリントで着手できる」と合意できる状態。
                  Definition of
                  Ready（着手準備の定義）として明文化するチームもある。
                </p>
              </div>
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="受け入れ基準を「Given-When-Then」で書く主な利点はどれ？"
              options={[
                { label: "コードの行数が減る" },
                {
                  label:
                    "前提・操作・期待結果が揃い、完了判定とテストケースに落としやすくなる",
                  correct: true,
                },
                { label: "サーバーの応答が速くなる" },
                { label: "デザインのレビューが不要になる" },
              ]}
              explanation="Given（前提）・When（操作）・Then（結果）を揃えると、どんな状況で何をしたらどうなるべきかが具体化されます。これは完了の判定基準になると同時に、そのままテストケースへ変換でき、実装前に仕様の抜けを見つける助けにもなります。"
            />
          </section>

          {/* Quiz 3 */}
          <section>
            <Quiz
              question="INVEST の「S（Small）」を満たせていないストーリーへの対応として適切なのは？"
              options={[
                { label: "受け入れ基準を削除して内容を曖昧にする" },
                {
                  label:
                    "1 スプリントに収まるよう、価値のある単位で複数に分割する",
                  correct: true,
                },
                { label: "優先順位を一番下に固定して放置する" },
                { label: "見積もりをせずにそのまま着手する" },
              ]}
              explanation="大きすぎるストーリーは、ユーザー価値が説明できる単位を保ったまま分割するのが基本です。小さくすることで見積もりやテストがしやすくなり、こまめに完了とフィードバックを得られます。曖昧化や放置は問題を先送りするだけです。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Atlassian - User Stories",
                  url: "https://www.atlassian.com/agile/project-management/user-stories",
                  description:
                    "ユーザーストーリーの書き方と運用を平易にまとめたガイド",
                },
                {
                  title: "Atlassian - Backlog Refinement / Grooming",
                  url: "https://www.atlassian.com/agile/scrum/backlog-refinement",
                  description: "バックログを継続的に整える活動の進め方と狙い",
                },
                {
                  title: "Mike Cohn - INVEST in Good Stories",
                  url: "https://www.mountaingoatsoftware.com/blog/invest-in-good-stories",
                  description:
                    "INVEST 原則の提唱に近い文脈での解説（ストーリー分割の考え方）",
                },
                {
                  title: "Scrum Guide - Product Backlog",
                  url: "https://scrumguides.org/scrum-guide.html",
                  description:
                    "プロダクトバックログの位置づけを定義する一次情報",
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
