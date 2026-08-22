import { ExternalLink } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const TIERS: { tier: string; what: string; examples: string; caution: string }[] = [
  {
    tier: "一次",
    what: "作った側が出しているもの",
    examples:
      "仕様書・RFC、公式ドキュメント、リリースノートと変更履歴、ソースコード、公式リポジトリの issue",
    caution: "書かれていないことは「未定義」であって「不可能」ではない",
  },
  {
    tier: "二次",
    what: "一次を読んだ人がまとめたもの",
    examples: "書籍、公式以外のガイド、カンファレンス登壇、MDN のような編集された文書",
    caution: "書かれた時点のバージョンで止まる。日付と対象バージョンを先に見る",
  },
  {
    tier: "三次",
    what: "二次を集めたもの",
    examples: "まとめ記事、比較サイト、SNS の要約、AI の回答",
    caution: "元をたどれないものは、確認済みの事実として扱わない",
  },
];

const LINKS = [
  {
    label: "RFC Editor（インターネット標準の原文）",
    url: "https://www.rfc-editor.org/",
  },
  {
    label: "WHATWG HTML Standard（HTML の現行仕様）",
    url: "https://html.spec.whatwg.org/multipage/",
  },
  {
    label: "W3C WCAG 2.2（アクセシビリティの達成基準）",
    url: "https://www.w3.org/TR/WCAG22/",
  },
  {
    label: "TC39 Proposals（JavaScript の仕様提案と段階）",
    url: "https://github.com/tc39/proposals",
  },
  {
    label: "MDN Web Docs（編集された二次情報。仕様へのリンクを備える）",
    url: "https://developer.mozilla.org/ja/",
  },
];

export default function PrimarySources() {
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
            一次情報の見分け方
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            誰が書いたものかで、扱い方が変わります。原典に近いほど寿命が長く、
            遠いほど早く古くなります。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold mb-6">3 つの層</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[52rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">層</th>
                    <th className="text-left p-3 font-semibold">何か</th>
                    <th className="text-left p-3 font-semibold">具体例</th>
                    <th className="text-left p-3 font-semibold">扱うときの注意</th>
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map((t) => (
                    <tr key={t.tier} className="border-t border-border">
                      <td className="p-3 font-bold whitespace-nowrap">{t.tier}</td>
                      <td className="p-3">{t.what}</td>
                      <td className="p-3 text-muted-foreground">{t.examples}</td>
                      <td className="p-3 text-muted-foreground">{t.caution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mt-6 text-muted-foreground">
              三次を読むなと言っているのではありません。三次は入口として速く、
              二次は理解の助けになります。ただし
              <strong>「そうである」と結論を出す前に一次まで降りる</strong>という順序だけは
              変えません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">一次にたどり着く経路</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              二次・三次の文章から一次へ降りる道は、だいたい決まっています。
            </p>
            <ul className="space-y-3 leading-relaxed text-muted-foreground list-disc pl-5">
              <li>
                <strong>公式ドキュメント本文中のリンク。</strong> 仕様書や RFC への
                リンクが張られていれば、それが 1 段下です
              </li>
              <li>
                <strong>リポジトリの README とリリースノート。</strong> 挙動が変わった
                理由は、たいてい変更履歴に 1 行だけ書いてあります
              </li>
              <li>
                <strong>ソースコードとテスト。</strong> ドキュメントに書かれていない
                挙動は、テストコードが実質的な仕様書になっていることがあります
              </li>
              <li>
                <strong>issue と Pull Request。</strong> 「なぜそうなっているか」は
                ドキュメントより議論のほうに残ります
              </li>
            </ul>
            <div className="mt-6">
              <InfoBox type="warning" title="GitHub の閲覧ページは本文が取れないことがある">
                <code>github.com</code> の blob ページは本文を JavaScript で描画するため、
                機械的に取得すると中身が空になります。原文がほしいときは
                <code>raw.githubusercontent.com</code> を引きます。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">出典を書き残す形</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              調べた結果をメモするとき、
              <strong>結論だけでなく、どこで確認したかを同じ行に置きます</strong>。
              後から自分で検算できるかどうかが、その情報の寿命を決めます。
            </p>
            <CodeBlock
              language="markdown"
              title="使えるメモと、使えないメモ"
              code={`# 使えない
- fetch はタイムアウトしない

# 使える
- fetch には既定のタイムアウトが無い（AbortSignal.timeout() で自分で付ける）
  https://developer.mozilla.org/ja/docs/Web/API/AbortSignal/timeout_static
  2026-08-23 確認 / 実機でも 60 秒待って切れないことを確認`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              確認日を書くのは、情報が古くなることを前提にしているからです。
              日付があれば、半年後に読み返したときに
              「これは取り直したほうがよい」と自分で判断できます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">
              書かれていないことは「不可能」ではない
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              一次情報でよくある読み違いです。仕様に書かれていないのは
              <strong>そこを決めていない</strong>という意味で、禁止でも不可能でもありません。
              実装依存になっている、というのが正しい読み方です。
            </p>
            <p className="leading-relaxed text-muted-foreground">
              「仕様に無い＝やってはいけない」と読むと選択肢を必要以上に狭め、
              「仕様に無い＝どう書いても安全」と読むと環境が変わったときに壊れます。
              未定義だとわかった時点で、<strong>実測で確かめて、その環境を明記する</strong>
              のが現実的な扱いです。
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-muted/40">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {LINKS.map((l) => (
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
