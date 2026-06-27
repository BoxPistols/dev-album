import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const methods = [
  {
    title: "KPT",
    full: "Keep / Problem / Try",
    description:
      "続けたいこと・問題・次に試すこと、の 3 枠で整理する。シンプルで導入しやすく、最初の手法に向く。",
  },
  {
    title: "YWT",
    full: "やったこと / わかったこと / つぎにやること",
    description:
      "経験から学びを引き出すことに重点を置く。行動と気づきを結びつけたいときに合う。",
  },
  {
    title: "Fun Done Learn",
    full: "楽しかった / 終わったこと / 学んだこと",
    description:
      "ポジティブな側面に光を当てる。チームの士気が下がり気味なときや、達成を祝いたいときに効く。",
  },
];

export default function Retrospective() {
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
            ふりかえりと継続的改善
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ふりかえり（レトロスペクティブ）は、チームが自分たちのやり方を見つめ直し、
            次に向けて改善する場です。レトロの目的から、KPT・YWT・Fun Done Learn
            といった手法の比較、
            タイムライン作成やアクションアイテムの扱い、そして心理的安全性とファシリテーションまでを
            一通り体験できる形で整理します。
          </p>
        </div>

        <WhyNowBox tags={["ふりかえり", "KPT", "カイゼン", "心理的安全性"]}>
          <p>
            速く走り続けても、走り方そのものを見直さなければ同じ失敗を繰り返します。
            ふりかえりは、立ち止まってチームの動き方を点検し、小さな改善を積み重ねる時間です。
            一度きりの反省会ではなく、繰り返すことで効いてきます。
            この継続こそが、トヨタ生産方式に由来する「カイゼン」の核心です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* レトロの目的 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              レトロの目的
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ふりかえりの目的は、犯人探しではなく<strong>仕組みの改善</strong>
              です。
              「誰がミスしたか」ではなく「どうすればチームとして次は防げるか」を考えます。
              成果物（プロダクト）ではなく、作り方（プロセス）に焦点を当てるのが特徴です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              一定の周期で繰り返すことに意味があります。
              スプリントごと、あるいはリリースごとに振り返ることで、
              小さなズレが大きくなる前に手を打てます。
              「うまくいったこと」も同じくらい大切で、再現したい成功を意識的に言語化します。
            </p>

            <InfoBox type="info" title="プロダクトではなくプロセスを見る">
              「機能が良かったか」ではなく「その機能を、どんなやり方で作ったか」を振り返ります。
              プロセスを改善できれば、次に作るものすべての質が底上げされます。
            </InfoBox>
          </section>

          {/* 手法の比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              KPT・YWT・Fun Done Learn の比較
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ふりかえりの手法はいくつもあり、状況に応じて選びます。 代表的な 3
              つを比べると、それぞれが照らす角度が違うことが分かります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {methods.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-1 text-base">
                    {m.title}
                  </h3>
                  <p
                    className="text-xs text-primary font-medium mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {m.full}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      手法
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      向いている場面
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      特徴
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      KPT
                    </td>
                    <td className="py-3 px-4">初めてのふりかえり</td>
                    <td className="py-3 px-4">問題と改善案を出しやすい</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      YWT
                    </td>
                    <td className="py-3 px-4">学びを定着させたい</td>
                    <td className="py-3 px-4">経験と気づきを結びつける</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">
                      Fun Done Learn
                    </td>
                    <td className="py-3 px-4">士気を上げたい・達成を祝う</td>
                    <td className="py-3 px-4">ポジティブな面に光を当てる</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="ふりかえりの目的として最も適切なのはどれ？"
              options={[
                { label: "ミスをした担当者を特定して責任を問う" },
                {
                  label:
                    "プロセス（作り方）を見直し、チームとして次に改善する点を見つける",
                  correct: true,
                },
                { label: "完成したプロダクトの売上を分析する" },
                { label: "個人の評価を決める材料を集める" },
              ]}
              explanation="ふりかえりは犯人探しではなく、プロセスの改善が目的です。プロダクトそのものより「どんなやり方で作ったか」に焦点を当て、チームとして次に防ぐ・再現する方法を見つけます。個人の評価や責任追及の場にすると、率直な意見が出なくなります。"
            />
          </section>

          {/* タイムライン作成 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              タイムライン作成
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              いきなり意見を出そうとしても、記憶は曖昧で偏ります。
              そこで有効なのが<strong>タイムライン</strong>です。
              期間中に起きた出来事を時系列に並べ、
              「いつ何があったか」をチームで思い出すところから始めます。
              事実を共有してから解釈に進むと、議論の土台が揃います。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              出来事には感情も添えると、より深く振り返れます。
              「リリース直前、ここで全員が焦った」といった感情の起伏は、
              プロセスのどこに負荷がかかったかを示すサインになります。
              事実と感情の両方を並べることで、改善すべき場所が見えてきます。
            </p>
          </section>

          {/* アクションアイテム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              アクションアイテムを次に繋ぐ
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ふりかえりが「話して終わり」になると、改善は起きません。
              出てきた気づきを<strong>具体的なアクションアイテム</strong>
              に落とし込み、
              担当と期限を決めて、次のふりかえりで結果を確認します。
              この「繋ぐ」工程があって初めて、ふりかえりは継続的改善になります。
            </p>

            <InfoBox type="success" title="アクションは少なく・具体的に">
              一度にたくさん決めても実行されません。 本当に効きそうなものを 1〜2
              個に絞り、「誰が・いつまでに・何を」を具体化します。
              次回その達成を確認することで、改善のループが回り始めます。
            </InfoBox>
          </section>

          {/* カイゼンと心理的安全性 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              カイゼンと心理的安全性・ファシリテーション
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <strong>カイゼン</strong>は、大きな改革を一度にやるのではなく、
              小さな改善を絶え間なく積み重ねる考え方です。
              ひとつひとつは地味でも、続けることでチームの動き方が着実に整っていきます。
              ふりかえりは、このカイゼンを回すためのエンジンです。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              率直な意見が出るかどうかは、<strong>心理的安全性</strong>
              に懸かっています。
              「こんなことを言ったら責められる」と感じる場では、本音は出てきません。
              ファシリテーターは、発言を否定せず受け止め、
              全員が話せるよう順番を配り、特定の人だけが話し続けないよう場を整えます。
              安全な場づくりが、良いふりかえりの前提になります。
            </p>
          </section>

          {/* マンネリ対策 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              マンネリ対策
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              毎回同じ手法を続けると、形式だけが残って中身が薄くなりがちです。
              KPT に慣れてきたら YWT や Fun Done Learn に切り替える、
              タイムラインを使う回を挟むなど、手法を入れ替えると新鮮さが戻ります。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              時には、ふりかえりのやり方そのものをふりかえる回を設けるのも有効です。
              「このふりかえりは役に立っているか」をチームで点検すると、
              形骸化を早めに立て直せます。手法は目的のための道具であり、固定する必要はありません。
            </p>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ふりかえりで出た気づきを継続的改善に繋げるために最も重要なのはどれ？"
              options={[
                { label: "できるだけ多くのアクションを一度に決める" },
                {
                  label:
                    "効きそうなアクションを 1〜2 個に絞り、担当と期限を決めて次回に達成を確認する",
                  correct: true,
                },
                { label: "気づきを共有するだけで満足する" },
                { label: "アクションは決めずに各自の判断に任せる" },
              ]}
              explanation="アクションを「誰が・いつまでに・何を」まで具体化し、数を絞って次回に結果を確認することで、ふりかえりは継続的改善のループになります。たくさん決めても実行されず、共有だけで終わると改善は起きません。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Atlassian - Retrospectives の進め方",
                  url: "https://www.atlassian.com/team-playbook/plays/retrospective",
                  description:
                    "レトロの目的と進行手順を、テンプレート付きで解説",
                },
                {
                  title: "Atlassian - 心理的安全性",
                  url: "https://www.atlassian.com/blog/teamwork/how-to-build-psychological-safety",
                  description: "率直な議論を支える心理的安全性の作り方",
                },
                {
                  title: "Retromat - ふりかえり手法集",
                  url: "https://retromat.org/",
                  description:
                    "KPT 以外も含む多数のふりかえり手法を検索できるサイト",
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
