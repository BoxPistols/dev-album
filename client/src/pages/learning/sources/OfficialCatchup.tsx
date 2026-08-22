import { ExternalLink } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const SIGNALS: { where: string; what: string; how: string }[] = [
  {
    where: "リリースノート / CHANGELOG",
    what: "何が変わったか。壊れる変更（breaking change）はここに集まる",
    how: "バージョンを上げる前に、自分が使っている機能名で検索する",
  },
  {
    where: "移行ガイド（Migration / Upgrade）",
    what: "古い書き方から新しい書き方への対応表",
    how: "メジャーバージョンを跨ぐときは、まずこれだけ読む",
  },
  {
    where: "非推奨（Deprecated）の一覧",
    what: "まだ動くが、いずれ消えるもの",
    how: "新しく書くコードでは選ばない。既存は消える時期を確認する",
  },
  {
    where: "リポジトリの Releases",
    what: "実際に公開された版と、その差分",
    how: "GitHub の Watch → Custom → Releases だけを購読すると通知が絞れる",
  },
  {
    where: "ロードマップ / RFC リポジトリ",
    what: "これから入るもの、検討中のもの",
    how: "採用判断の材料。まだ入っていないので実装の根拠にはしない",
  },
];

export default function OfficialCatchup() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            公式から変化を追う
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            一度覚えた知識は静かに古くなります。どこを見れば変化に気づけるかを
            決めておきます。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold mb-6">見る場所は 5 つ</h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              公式サイトを毎日見る必要はありません。変化が最初に現れる場所は
              決まっているので、そこだけ押さえます。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[48rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">場所</th>
                    <th className="text-left p-3 font-semibold">わかること</th>
                    <th className="text-left p-3 font-semibold">使い方</th>
                  </tr>
                </thead>
                <tbody>
                  {SIGNALS.map((s) => (
                    <tr key={s.where} className="border-t border-border">
                      <td className="p-3 font-medium whitespace-nowrap">{s.where}</td>
                      <td className="p-3 text-muted-foreground">{s.what}</td>
                      <td className="p-3 text-muted-foreground">{s.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">
              「いま自分が使っている版」を先に確定する
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              変更履歴を読む前に、手元が何版なのかを確かめます。ここを飛ばすと、
              自分に関係のない変更を延々と読むことになります。
            </p>
            <CodeBlock
              language="bash"
              title="手元の版を確かめる"
              code={`# 実際にインストールされている版（lockfile が決めた 1 つの値）
npm ls react

# 公開されている最新版と、配布中のタグ
npm view react version
npm view react dist-tags

# CLI ツールは本体に聞く
node --version
git --version`}
            />
            <div className="mt-6">
              <InfoBox type="info" title="package.json の ^1.2.3 は答えではない">
                <code>package.json</code> に書いてあるのは許容する範囲で、
                実際に入っている版ではありません。実測値は lockfile と
                <code>npm ls</code> が持っています。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">通知を絞る</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              リポジトリをまるごと Watch すると issue のやり取りまで流れてきて、
              数日で見なくなります。<strong>リリースだけを購読する</strong>と続きます。
            </p>
            <ul className="space-y-2 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>
                GitHub: リポジトリの Watch → Custom → Releases のみにチェック
              </li>
              <li>
                RSS が要るとき: GitHub は
                <code>https://github.com/&lt;owner&gt;/&lt;repo&gt;/releases.atom</code>
                を配信しています
              </li>
              <li>
                依存の更新: Dependabot や Renovate に PR を作らせ、
                変更履歴へのリンクを本文に含めさせる
              </li>
            </ul>
            <p className="leading-relaxed mt-4 text-muted-foreground">
              購読先は増やしすぎないほうが続きます。実際に使っているものだけに絞り、
              使わなくなったら外します。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">教材と記事は日付から読む</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              二次情報を読むときに最初に見るのは本文ではなく、
              <strong>公開日と、対象にしているバージョン</strong>です。どちらも書いていない
              記事は、正しいかどうかを自分では判定できません。
            </p>
            <p className="leading-relaxed text-muted-foreground">
              これはこのサイト自身にも当てはまります。Claude Code のように動きの速い
              対象を扱うページには、いつ・どの版で確認したかを本文の先頭に置いています。
              半年後に読む人が、そこを見て信頼度を決められるようにするためです。
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-muted/40">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label: "GitHub Docs: リポジトリの通知を設定する",
                  url: "https://docs.github.com/ja/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications",
                },
                {
                  label: "npm Docs: npm ls",
                  url: "https://docs.npmjs.com/cli/v11/commands/npm-ls",
                },
                {
                  label: "Semantic Versioning 2.0.0",
                  url: "https://semver.org/lang/ja/",
                },
              ].map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary underline underline-offset-2"
                  >
                    {l.label}
                    <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
