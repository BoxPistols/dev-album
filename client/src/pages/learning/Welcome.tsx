import { Link } from "wouter";
import { Compass, ListOrdered, Scale, Route } from "lucide-react";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const PARTS = [
  {
    icon: Compass,
    title: "向き合い方",
    body: "初めての領域に入るときの手順。全体像から入り、最小の実行まで下りて、わからない箇所を切り分ける。",
    href: "/learning/approach/first-encounter",
    label: "初めての領域に入る手順へ",
  },
  {
    icon: Scale,
    title: "情報にたどり着く",
    body: "一次情報とそれ以外を見分ける。公式の変更を追う。検索で、文書化された演算子だけを使う。",
    href: "/learning/sources/primary-sources",
    label: "一次情報の見分け方へ",
  },
  {
    icon: ListOrdered,
    title: "AI と学ぶ",
    body: "前提の渡し方、説明の粒度の指定、出典の要求。そして AI が間違えるところと、その見つけ方。",
    href: "/learning/with-ai/how-to-ask",
    label: "AI への聞き方へ",
  },
  {
    icon: Route,
    title: "続ける",
    body: "詰まったときに何から切るか。次の自分が読める形で記録を残す。人に聞くときに何を書くか。",
    href: "/learning/habits/when-stuck",
    label: "詰まったときの手順へ",
  },
];

export default function LearningWelcome() {
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
            このコースについて
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            初めての領域に入るときの手順そのものを扱います。何を学ぶかではなく、
            どう調べ、何を信じ、どこで確かめ、どう続けるか。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold mb-6">なぜ学び方から始めるのか</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              このサイトの他のマニュアルは、Git、React、Claude Code のように
              「何を学ぶか」で分かれています。ただ、どれを開いても最初に必要になるのは
              同じことです。<strong>公式はどこにあるのか。この説明はいつの情報なのか。
              動かないとき何から切るのか。</strong>
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              この手順は経験のある人が暗黙にやっていることで、教材の側では
              たいてい省略されます。省略されたぶんは各自の経験で埋めることになり、
              経験が無いところから入る人ほど時間がかかります。ここではその部分を
              明示的に扱います。
            </p>
            <p className="leading-relaxed text-muted-foreground">
              対象は、未経験からこの分野に入る人と、経験はあるが新しい領域に入るたびに
              手探りになる人です。技術そのものの前提知識は要りません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">扱う範囲</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {PARTS.map(({ icon: Icon, title, body, href, label }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-5 hover:shadow-sm hover:shadow-primary/5 transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={18} className="text-primary shrink-0" />
                    <h3 className="text-lg font-bold">{title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {body}
                  </p>
                  <Link
                    href={href}
                    className="text-sm font-medium text-primary underline underline-offset-2"
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">扱わないこと</h2>
            <ul className="space-y-2 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>
                記憶術や時間管理などの一般的な学習法。技術領域に入るときの手順に絞ります
              </li>
              <li>特定の有料サービスの推奨</li>
              <li>
                精神論。ここに書いてあるのは、うまくいかないときに次に取れる手が
                残っている形に段取りを組む方法です
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">この教材自身の作り方</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              調べ方を扱う教材なので、書いてある内容の裏取りが緩いと成立しません。
              このコースでは次を守っています。
            </p>
            <ul className="space-y-2 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>
                検索演算子は、提供元が公式に文書化しているものだけを「使える」と書く。
                実際には動くが文書化されていないものは、そう明記して区別する
              </li>
              <li>例に出す URL はフルパスで載せ、実在を確認してから書く</li>
              <li>
                AI の挙動は製品と時期で変わるため、断定せず「自分で確かめる手順」の形で書く
              </li>
            </ul>
            <div className="mt-6">
              <InfoBox type="info" title="このサイトの他のマニュアルとの関係">
                エージェントの出力をどこまで信頼できるかは
                <Link
                  href="/claude-code/best-practices/verification-and-trust"
                  className="text-primary underline underline-offset-2 mx-1"
                >
                  Claude Code の「検証スキル」
                </Link>
                で扱っています。あちらは「AI に任せた作業を信じる条件」、
                こちらは「自分の理解を確かめる方法」です。
              </InfoBox>
            </div>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
