import { ExternalLink } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

/** Google の公式ヘルプに記載がある演算子だけを載せる */
const DOCUMENTED: { op: string; does: string; example: string }[] = [
  { op: '"..."', does: "語句を完全一致で探す", example: '"tallest building"' },
  { op: "site:", does: "サイトやドメインの中だけを探す", example: "site:youtube.com cat videos" },
  { op: "-", does: "その語を含むものを除く", example: "jaguar speed -car" },
  { op: "before:", does: "指定した日より前", example: "avengers endgame before:2019" },
  { op: "after:", does: "指定した日より後", example: "astronomy discoveries after:2026/03/10" },
  { op: "filetype:", does: "ファイル形式で絞る", example: "photoelectric effect paper filetype:pdf" },
];

export default function SearchTechnique() {
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
            検索の技術
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            探し方を変えると、たどり着くまでの手数が変わります。
            まず、提供元が文書化している道具だけを覚えます。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold mb-6">文書化されている演算子</h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Google のヘルプに記載があるのは次の 6 つです。
              <code>before:</code> と <code>after:</code> は組み合わせて期間指定にできます。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[42rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">演算子</th>
                    <th className="text-left p-3 font-semibold">できること</th>
                    <th className="text-left p-3 font-semibold">例</th>
                  </tr>
                </thead>
                <tbody>
                  {DOCUMENTED.map((d) => (
                    <tr key={d.op} className="border-t border-border">
                      <td className="p-3 font-mono text-xs whitespace-nowrap">{d.op}</td>
                      <td className="p-3">{d.does}</td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">
                        {d.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <InfoBox type="warning" title="よく紹介されるが、公式には載っていないもの">
                <code>inurl:</code>、<code>intitle:</code>、<code>AROUND(n)</code>、
                <code>related:</code> などは、記事でよく紹介され、実際に動くこともあります。
                ただし Google のヘルプには記載がありません。
                <strong>文書化されていないものは、予告なく止まっても文句が言えない</strong>
                という前提で使います。仕事の手順に組み込むなら、上の 6 つだけにします。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">実際の組み立て方</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              演算子を覚えるより、<strong>どう組み合わせるか</strong>のほうが効きます。
              目的別に 4 つだけ持っておけば足ります。
            </p>
            <CodeBlock
              language="text"
              title="よく使う 4 つの型"
              code={`# 1. 公式だけを読む（二次情報を最初から外す）
site:code.claude.com hooks

# 2. エラーメッセージを完全一致で探す（可変部分は削る）
"Cannot find module" "vite.config"

# 3. 古い情報を落とす（大きな変更があった時期で切る）
next.js app router after:2025/01/01

# 4. 形式で絞る（仕様書や論文を狙う）
webauthn filetype:pdf`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              2 番の「可変部分を削る」は効果が大きいわりに見落とされます。
              エラー文をそのまま貼ると、自分のファイルパスやハッシュ値が混ざって
              1 件も出ません。<strong>固定の文言だけを引用符で囲みます</strong>。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">言語を切り替えて 2 回引く</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              日本語で探して出ないものが、英語では 1 件目に出ることがあります。
              母数が違うためで、内容の質とは別の問題です。
            </p>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              技術用語は英語のまま検索すると当たりやすくなります。
              日本語の解説がほしい場合でも、
              <strong>まず英語で一次情報を見つけてから、日本語の解説を探す</strong>ほうが
              早く着きます。順序が逆だと、古い訳や誤読を掴む確率が上がります。
            </p>
            <div className="mt-6">
              <InfoBox type="info" title="公式ドキュメントの日本語版は遅れることがある">
                翻訳が追いつかず、英語版だけ更新されている場合があります。
                挙動が説明と合わないときは、URL の言語部分を <code>/en/</code> に
                変えて原文を見ます。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">検索で終わらせない</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              検索はたどり着くための手段で、答えそのものではありません。
              このコースで一貫して置いている順序は次のとおりです。
            </p>
            <CodeBlock
              language="text"
              code={`検索          … 当たりをつける。ここで結論は出さない
  ↓
一次情報      … 公式・仕様・ソースで裏を取る
  ↓
手元で実行    … 自分の環境で本当にそうなるかを見る
  ↓
記録          … 何を確認したか、いつの情報かを残す`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              3 番目の「手元で実行」を省くと、
              一次情報どおりに書いたのに動かない場面で止まります。仕様と実測がずれる
              箇所は実在するので、最後は自分の環境で見ます。
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-muted/40">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label: "Google 検索ヘルプ: ウェブ検索の精度を高める（演算子の正本）",
                  url: "https://support.google.com/websearch/answer/2466433",
                },
                {
                  label: "Google 検索セントラル: 検索演算子の一覧",
                  url: "https://developers.google.com/search/docs/monitor-debug/search-operators",
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
