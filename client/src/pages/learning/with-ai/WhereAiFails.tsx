import { Link } from "wouter";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const FAILURES: { kind: string; looks: string; check: string }[] = [
  {
    kind: "存在しない API・パッケージ・オプション",
    looks: "命名規則が自然で、いかにも在りそうな名前になっている",
    check: "公式ドキュメント内を検索する。パッケージなら npm のレジストリを引く",
  },
  {
    kind: "古い版の書き方",
    looks: "文法として正しく、数年前までは実際に正解だった",
    check: "その書き方が入った版・消えた版を、変更履歴で確認する",
  },
  {
    kind: "実在する URL に似た偽の URL",
    looks: "ドメインは本物で、パスだけがそれらしく作られている",
    check:
      "開いて、最終的な URL と中身を見る。転送されて別ページに着いたり、200 のまま検索結果や案内ページが返ることがあるので、状態コードだけでは判定できない",
  },
  {
    kind: "モデル名やバージョン番号の取り違え",
    looks: "命名の規則に沿っていて、区別がつきにくい",
    check: "提供元の一覧ページか、CLI の --version・--help で実物に聞く",
  },
  {
    kind: "数値の丸め・単位の混同",
    looks: "計算過程は筋が通っている",
    check: "自分で 1 回計算し直す。単位が書かれているかを見る",
  },
  {
    kind: "「一般にはこうです」で始まる一般論",
    looks: "反論しにくい書き方になっている",
    check: "自分の状況に当てはまるか、条件を挙げさせる",
  },
];

export default function WhereAiFails() {
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
            AI が間違えるところ
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            間違え方には型があります。型を知っていれば、どこを見に行けばよいかが
            決まります。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold mb-6">
              間違いは「変な答え」の形では出てこない
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              明らかにおかしい回答は自分で気づけるので、実害はあまりありません。
              困るのは<strong>もっともらしい形をした誤り</strong>のほうです。
              文体も構成も正しい回答と変わらないため、内容を確かめる以外に
              見分ける方法がありません。
            </p>
            <p className="leading-relaxed text-muted-foreground">
              裏を返すと、確かめる場所さえ決まっていれば対処できます。
              下の 6 つが頻出の型です。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">6 つの型と、確かめ方</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[50rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">型</th>
                    <th className="text-left p-3 font-semibold">見た目</th>
                    <th className="text-left p-3 font-semibold">確かめ方</th>
                  </tr>
                </thead>
                <tbody>
                  {FAILURES.map((f) => (
                    <tr key={f.kind} className="border-t border-border">
                      <td className="p-3 font-medium">{f.kind}</td>
                      <td className="p-3 text-muted-foreground">{f.looks}</td>
                      <td className="p-3 text-muted-foreground">{f.check}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <InfoBox type="warning" title="事実確認を頼んだ相手も間違える">
                このサイトの教材を作る過程で、事実確認のために動かした AI が
                <strong>存在しないモデル名を作って報告してきた</strong>ことがあります。
                役割を「確認係」にしても、確認そのものが正しい保証にはなりません。
                最後は一次情報か実機に当てます。
              </InfoBox>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">機械的に潰せるもの</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              6 つのうち、いくつかは自分の目で読むより
              <strong>コマンドで確かめたほうが速くて確実</strong>です。
            </p>
            <CodeBlock
              language="bash"
              title="実在するかどうかは、聞けばわかる"
              code={`# パッケージが実在するか（存在しなければ 404）
npm view some-package version

# 入っている版と、そのパッケージが公開している版
npm ls some-package
npm view some-package versions --json

# URL が生きているか。転送を追って、最終的にどこに着いたかを見る
# （404 にならず、案内ページへ飛ばされているだけのことがある）
curl -s -o /dev/null -L --max-time 10 \
  -w 'status=%{http_code} final=%{url_effective}\n' \
  https://example.com/docs/page

# CLI のオプションが実在するか
some-cli --help | grep -- --that-option`}
            />
            <p className="leading-relaxed mt-6 text-muted-foreground">
              教材の全コードブロックからパッケージ名を抜き出してレジストリに問い合わせる、
              といった走査も作れます。読み返して気づくより、こちらのほうが漏れません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">確かめる順序を決めておく</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              全部を毎回検算する必要はありません。
              <strong>間違っていたときの損害</strong>で順序を決めます。
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm min-w-[40rem]">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">内容</th>
                    <th className="text-left p-3 font-semibold">扱い</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["コピーして実行するコマンド・設定", "必ず実行して確かめる。壊れるのは自分の環境"],
                    ["パッケージ名・API 名・URL", "機械的に実在を確認する。数が多くても自動化できる"],
                    ["版によって変わる挙動", "対象の版を明示させ、変更履歴で裏を取る"],
                    ["概念の説明・設計の考え方", "一次情報で 1 箇所だけ裏を取る。全文の検算は要らない"],
                    ["文章の構成や言い回しの提案", "検算不要。読んで判断する"],
                  ].map(([a, b]) => (
                    <tr key={a} className="border-t border-border">
                      <td className="p-3 font-medium">{a}</td>
                      <td className="p-3 text-muted-foreground">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mt-6 text-muted-foreground">
              判断の軸は「事実として正しいか」ではなく
              <strong>「間違っていたら、この先で何が起きるか」</strong>です。
              コピーして実行するものが最優先になるのはそのためです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">それでも AI を使う理由</h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              ここまで確認の話ばかり書きましたが、確認が要るのは
              <strong>速く広く当たりをつけられる</strong>からです。知らない領域で
              「何を検索すればいいかがわからない」段階を短くできるのが最大の利点で、
              そこから先は一次情報と実機に渡します。
            </p>
            <p className="leading-relaxed text-muted-foreground">
              エージェントに作業そのものを任せる場面での信頼の作り方は、
              <Link
                href="/claude-code/best-practices/verification-and-trust"
                className="text-primary underline underline-offset-2 mx-1"
              >
                Claude Code の「検証スキル」
              </Link>
              で扱っています。
            </p>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
