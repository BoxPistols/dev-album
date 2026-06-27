import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodeBlock from "@/components/CodeBlock";

const strategies = [
  {
    title: "Git Flow",
    summary: "main / develop / feature / release / hotfix の複数ブランチ",
    fit: "リリースが計画的で、複数バージョンを並行保守する製品",
  },
  {
    title: "GitHub Flow",
    summary: "main + 短命なフィーチャーブランチ。PR でマージ",
    fit: "継続的にデプロイする Web サービス。シンプルさ重視",
  },
  {
    title: "トランクベース開発",
    summary: "main（トランク）へ全員が頻繁に直接統合する",
    fit: "高頻度デプロイと CI/CD を徹底するチーム",
  },
];

export default function Branching() {
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
            ブランチ戦略とリリースフロー
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            ブランチ戦略は、チームがどう並行作業し、どうリリースするかを決める設計です。
            Git Flow / GitHub Flow / トランクベース開発の 3 つを比較し、
            短命ブランチと頻繁な統合、フィーチャーフラグやリリーストレインといった
            仕組み、そして CI/CD との関係までを一通り整理します。
            最後に、自分のチームではどれを選ぶかの指針を示します。
          </p>
        </div>

        <WhyNowBox
          tags={[
            "ブランチ戦略",
            "GitHub Flow",
            "トランクベース",
            "フィーチャーフラグ",
            "CI/CD",
          ]}
        >
          <p>
            ブランチ戦略はチームの開発リズムを直接左右します。
            長く生きるブランチが増えるほどマージは難しくなり、
            リリースは遅く・怖くなります。逆に小さな変更を頻繁に統合すれば、
            コンフリクトは小さく保たれ、CI/CD と噛み合って
            <strong>速く安全にリリースできる状態</strong>に近づきます。 DORA
            メトリクスのリードタイムにも直結するテーマです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 3戦略の比較 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              3 つの代表的なブランチ戦略
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              まず代表的な 3 戦略の全体像を掴みます。 Git Flow
              はブランチが多く構造化されている一方、 GitHub Flow
              とトランクベース開発はシンプルさと統合の速さを重視します。
              どれが正解という話ではなく、チームのデプロイ頻度や製品の性質に合わせて選びます。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {strategies.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground mb-2 text-base">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {s.summary}
                  </p>
                  <p className="text-xs text-primary font-medium leading-relaxed">
                    向く場面: {s.fit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              戦略の比較表
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              同じ軸で並べると違いがはっきりします。
              注目したいのは「ブランチの寿命」と「統合の頻度」です。 この 2
              つが、マージの難しさやリリースの速さを決めます。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      Git Flow
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      GitHub Flow
                    </th>
                    <th className="text-left py-3 px-3 font-bold text-foreground">
                      トランクベース
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      長期ブランチ
                    </td>
                    <td className="py-3 px-3">main + develop</td>
                    <td className="py-3 px-3">main のみ</td>
                    <td className="py-3 px-3">main（トランク）のみ</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      ブランチ寿命
                    </td>
                    <td className="py-3 px-3">長め</td>
                    <td className="py-3 px-3">短い</td>
                    <td className="py-3 px-3">非常に短い（1日以内）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      統合の頻度
                    </td>
                    <td className="py-3 px-3">低い</td>
                    <td className="py-3 px-3">高い</td>
                    <td className="py-3 px-3">非常に高い</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-3 font-medium text-foreground">
                      リリース管理
                    </td>
                    <td className="py-3 px-3">release ブランチ</td>
                    <td className="py-3 px-3">main から随時</td>
                    <td className="py-3 px-3">フラグ + トレイン</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium text-foreground">
                      CI/CD 相性
                    </td>
                    <td className="py-3 px-3">普通</td>
                    <td className="py-3 px-3">良い</td>
                    <td className="py-3 px-3">最も良い</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 短命ブランチと頻繁な統合 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              短命ブランチと頻繁な統合
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ブランチが長く生きるほど、main との差分は広がり、
              マージ時のコンフリクトは大きくなります。
              これは「マージ地獄」と呼ばれる状態で、リリースを遅く・怖くします。
              トランクベース開発は、ブランチを 1 日以内に main
              へ統合することで、
              <strong>差分を常に小さく保つ</strong>ことを狙います。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              短命ブランチを回すには、こまめに main
              の変更を取り込む習慣が要ります。
              下は、フィーチャーブランチを作って小さく統合する基本的な流れです。
            </p>

            <CodeBlock
              language="bash"
              title="短命なフィーチャーブランチの基本フロー"
              code={`# main から短命ブランチを切る
git switch -c feature/add-search main

# 小さく作業してコミット
git add .
git commit -m "検索フォームを追加"

# 統合前に main の最新を取り込み、差分を小さく保つ
git switch main
git pull
git switch feature/add-search
git rebase main

# PR を作成し、CI 通過後すぐに main へマージする
git push -u origin feature/add-search`}
            />

            <InfoBox type="info" title="仕様は範囲、実測は運用">
              「短命」は仕様では数時間〜1日とされますが、実測ではレビュー待ちで
              数日伸びることがあります。理由はコードの完成度ではなく、
              レビューやCIの待ち時間です。ブランチを短く保ちたいなら、
              レビューの速さや小さな PR
              の習慣づけまで含めて設計する必要があります。
            </InfoBox>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="トランクベース開発が「短命ブランチ」を重視する主な理由はどれ？"
              options={[
                { label: "ブランチ名を覚えやすくするため" },
                {
                  label:
                    "main との差分を小さく保ち、マージのコンフリクトを抑えるため",
                  correct: true,
                },
                { label: "コミット数を増やして評価を上げるため" },
                { label: "release ブランチを複数並行で持つため" },
              ]}
              explanation="ブランチが長く生きるほど main との差分が広がり、マージ時のコンフリクト（マージ地獄）が大きくなります。短命ブランチで頻繁に統合すれば差分が小さく保たれ、統合の痛みが減ります。これが CI/CD とも噛み合い、リードタイム短縮につながります。"
            />
          </section>

          {/* フィーチャーフラグ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              フィーチャーフラグで「未完成」を隠す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              頻繁に main へ統合したいけれど、機能はまだ未完成——
              この矛盾を解くのが<strong>フィーチャーフラグ</strong>です。
              未完成のコードも main に入れてデプロイし、
              フラグで利用者から隠しておきます。準備ができたらフラグを有効化するだけで、
              コードのデプロイと機能の公開を分離できます。
            </p>

            <CodeBlock
              language="ts"
              title="フィーチャーフラグによる分岐"
              code={`// フラグでコードのデプロイと機能の公開を分離する
const flags = {
  newCheckout: false, // 準備ができたら true にして公開
};

function renderCheckout() {
  if (flags.newCheckout) {
    return renderNewCheckout();
  }
  return renderLegacyCheckout();
}`}
            />

            <InfoBox type="success" title="デプロイと公開を分けられる">
              フィーチャーフラグでコードのデプロイ（届ける）と機能の公開（見せる）を
              切り離せます。これにより、未完成の機能を抱えていても main
              へ統合し続けられ、
              トランクベース開発が成立します。問題が起きたらフラグを切るだけで戻せるのも利点です。
            </InfoBox>
          </section>

          {/* リリーストレインとCI/CD */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              リリーストレインと CI/CD の関係
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>リリーストレイン</strong>は、決まった間隔（毎週など）で
              出発する列車のようにリリースする方式です。
              間に合った変更だけが乗り、間に合わなければ次の便を待ちます。
              「いつ出るか」が固定されるため、機能の遅れがリリース全体を止めません。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              どの戦略も、最終的には CI/CD
              パイプラインと噛み合って初めて力を発揮します。
              統合のたびに自動でビルド・テストが走り、main
              が常にリリース可能な状態に保たれること。
              これが前提にあるから、短命ブランチや頻繁な統合が安全に回せます。
              トランクベース開発が CI/CD
              と最も相性が良いのは、この前提を最大限に活かすからです。
            </p>

            <InfoBox type="warning" title="自動テストなしの頻繁な統合は危険">
              頻繁に main へ統合しても、CI で品質が守られていなければ
              壊れた状態を量産するだけになります。トランクベース開発は 「main
              は常にリリース可能」という規律とセットで初めて成立します。
              戦略だけ真似て CI を整えないと、かえって不安定になります。
            </InfoBox>
          </section>

          {/* 選択の指針 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              どれを選ぶかの指針
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              選択はチームの状況で決まります。下を出発点にして、
              実際の運用で調整していくのが現実的です。
            </p>

            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground text-base mb-1">
                  継続的にデプロイする Web サービス
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  GitHub Flow から始め、CI/CD とフラグが整ってきたら
                  トランクベース開発へ寄せる。シンプルさと統合の速さを優先する。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground text-base mb-1">
                  バージョンを並行保守する製品・パッケージ
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Git Flow や release ブランチが向く。複数バージョンへの hotfix
                  を整理して管理できる。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground text-base mb-1">
                  高頻度デプロイを目指すチーム
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  トランクベース開発 + フィーチャーフラグ + 強い CI/CD。 DORA
                  のリードタイム短縮に最も効く組み合わせ。
                </p>
              </div>
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="フィーチャーフラグが解決する主な課題はどれ？"
              options={[
                { label: "Git のコミット履歴を消すこと" },
                {
                  label:
                    "未完成の機能を main に統合しつつ、利用者への公開はあとから切り替えられるようにすること",
                  correct: true,
                },
                { label: "CI のビルド時間をゼロにすること" },
                { label: "release ブランチを永久に保持すること" },
              ]}
              explanation="フィーチャーフラグは「コードのデプロイ」と「機能の公開」を分離します。未完成の機能もフラグで隠しながら main に統合・デプロイでき、準備ができたらフラグを有効化して公開します。これにより長命ブランチを避けつつ頻繁な統合が可能になり、問題時はフラグを切るだけで戻せます。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Atlassian - Git Flow ワークフロー",
                  url: "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow",
                  description:
                    "Git Flow をはじめ各ワークフローを図解で比較した定番チュートリアル",
                },
                {
                  title: "Trunk Based Development",
                  url: "https://trunkbaseddevelopment.com/",
                  description:
                    "トランクベース開発の原則・パターンを体系化した一次情報サイト",
                },
                {
                  title: "Martin Fowler - Feature Toggles (Flags)",
                  url: "https://martinfowler.com/articles/feature-toggles.html",
                  description:
                    "フィーチャーフラグの種類と運用上の注意点を詳しく解説した記事",
                },
                {
                  title: "Google Cloud - Trunk-based development (DORA)",
                  url: "https://cloud.google.com/architecture/devops/devops-tech-trunk-based-development",
                  description:
                    "トランクベース開発とデリバリーパフォーマンスの関係を扱う DORA の解説",
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
