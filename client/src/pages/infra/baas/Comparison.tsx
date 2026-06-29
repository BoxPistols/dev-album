import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import MermaidDiagram from "@/components/MermaidDiagram";

const comparisonRows = [
  {
    axis: "データモデル",
    supabase: "SQL / PostgreSQL（リレーショナル）",
    firebase: "NoSQL / ドキュメント（Firestore）",
  },
  {
    axis: "認可",
    supabase: "Row Level Security（SQL ポリシー）",
    firebase: "セキュリティルール（専用言語）",
  },
  {
    axis: "リアルタイム",
    supabase: "テーブル変更の購読",
    firebase: "ドキュメント変更の購読（標準で強い）",
  },
  {
    axis: "料金モデル",
    supabase: "DB サイズ・転送量・関数実行など",
    firebase: "読み書き回数・転送量・関数実行など",
  },
  {
    axis: "ロックイン",
    supabase: "標準 SQL 中心で相対的に低め",
    firebase: "独自 API・データモデルへの依存が出やすい",
  },
  {
    axis: "OSS / セルフホスト",
    supabase: "オープンソース・セルフホスト可",
    firebase: "マネージド（セルフホストは前提でない）",
  },
  {
    axis: "学習曲線",
    supabase: "SQL 既習なら入りやすい",
    firebase: "NoSQL 設計とルール記法に慣れが要る",
  },
];

export default function Comparison() {
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
            Supabase と Firebase の比較
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            Supabase と Firebase はどちらも完成度の高い BaaS
            ですが、出発点が違います。 Supabase は PostgreSQL
            を中心にしたリレーショナル、Firebase は Firestore を中心にした
            ドキュメント型 NoSQL
            です。この違いがデータ設計・認可・移行のしやすさへ波及します。
            ここでは軸ごとに並べて、用途に応じた選び方を整理します。
          </p>
        </div>

        <WhyNowBox
          tags={["比較", "Supabase", "Firebase", "選定", "SQL", "NoSQL"]}
        >
          <p>
            「どっちが優れているか」を一般論で決めても、自分のアプリには当てはまりません。
            大事なのは、データの形・認可の書き方・将来の移行可能性といった軸で、
            自分の要件に対してどちらが素直かを見極めることです。両者の設計思想を並べて理解すれば、
            目の前のプロジェクトに合うほうを根拠を持って選べるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 比較表 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              軸ごとの比較
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              主要な観点を並べた表です。どの行も「優劣」ではなく「性質の違い」として読んでください。
              要件によって、同じ性質が利点にも制約にもなります。
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      観点
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      Supabase
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground">
                      Firebase
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {comparisonRows.map((row) => (
                    <tr key={row.axis} className="border-b border-border">
                      <td className="py-3 px-4 font-medium text-foreground">
                        {row.axis}
                      </td>
                      <td className="py-3 px-4">{row.supabase}</td>
                      <td className="py-3 px-4">{row.firebase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* データモデルの違い */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              データモデルが選定の起点になる
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              最も影響が大きいのはデータモデルです。Supabase
              はリレーショナルなので、
              テーブル間の関連・結合・トランザクションを素直に表現できます。
              Firebase の Firestore
              はドキュメント型で、ネストした構造や非正規化を前提に、
              読み取りに最適化した設計を取ります。「正規化して結合する」発想と
              「読みやすい形で持つ」発想は方向が違うため、ここで合うほうが後の作業を楽にします。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-2">
                  リレーショナルが向く
                </p>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>エンティティ間の関連が複雑</li>
                  <li>集計や複合的なクエリが多い</li>
                  <li>SQL の資産・知識を活かしたい</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-2">
                  ドキュメント型が向く
                </p>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>画面単位で読みやすい形に持ちたい</li>
                  <li>リアルタイム同期が中心の体験</li>
                  <li>スキーマを柔軟に変えていきたい</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="Supabase と Firebase の最も根本的な違いはどれ？"
              options={[
                { label: "対応しているプログラミング言語の数" },
                {
                  label:
                    "データモデル — Supabase はリレーショナル(SQL/Postgres)、Firebase はドキュメント型 NoSQL",
                  correct: true,
                },
                { label: "どちらがリアルタイム機能を持つか" },
                { label: "片方だけが認証機能を持つこと" },
              ]}
              explanation="両者とも認証・リアルタイム・ストレージ・関数を備えています。根本的に異なるのはデータモデルで、Supabase は PostgreSQL のリレーショナル、Firebase は Firestore のドキュメント型 NoSQL です。この違いが認可の書き方や設計方針に波及します。"
            />
          </section>

          {/* 認可・ロックイン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              認可・ロックイン・運用形態
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              認可は、Supabase が SQL の Row Level Security、Firebase
              が専用言語のセキュリティルールです。
              どちらも「クライアント直アクセスを安全に保つ」目的は同じで、書き方が違います。
              ロックインの観点では、Supabase は標準 SQL
              に寄っているぶん移行余地を残しやすく、
              オープンソースでセルフホストもできます。Firebase
              はマネージド前提で運用が軽い反面、 独自 API
              やデータモデルへの依存が積み上がりやすい傾向があります。
            </p>

            <InfoBox type="info" title="ロックインの度合いは設計でも変わる">
              同じサービスでも、固有機能にどこまで依存するかで移行コストは変わります。
              データのエクスポート手段を確認し、ビジネスロジックをサービス固有部分から分離しておくと、
              将来の選択肢を残せます。これはどちらを選ぶ場合にも効く備えです。
            </InfoBox>
          </section>

          {/* 用途別の選び方 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              用途別の選び方
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              要件から逆算すると、選択は素直になります。下は典型的な目安です。
              実際には複数の軸が絡むため、最も重い要件を優先軸にして判断します。
            </p>

            <MermaidDiagram
              title="図: データの形から考える選定フロー"
              chart={`flowchart TD
    S["どんなデータを扱う?"] --> Q1{"関連が多く<br/>集計や結合が中心?"}
    Q1 -->|"はい"| SB["SQL / Supabase<br/>(PostgreSQL)"]
    Q1 -->|"いいえ"| Q2{"リアルタイム同期や<br/>オフライン対応が中心?"}
    Q2 -->|"はい"| FB["NoSQL / Firebase<br/>(Firestore)"]
    Q2 -->|"いいえ"| Q3{"SQL の知識や<br/>セルフホストを重視?"}
    Q3 -->|"はい"| SB
    Q3 -->|"いいえ"| FB`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-2">
                  Supabase を選びやすい
                </p>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>関連の多いデータを正規化して扱いたい</li>
                  <li>集計・複合クエリが中心</li>
                  <li>SQL の知識をそのまま活かしたい</li>
                  <li>セルフホストや移行可能性を重視する</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary mb-2">
                  Firebase を選びやすい
                </p>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                  <li>リアルタイム同期とオフライン対応が中心</li>
                  <li>モバイルアプリとの相性を重視する</li>
                  <li>Google Cloud との連携を見込む</li>
                  <li>運用をできるだけ手放したい</li>
                </ul>
              </div>
            </div>
          </section>

          {/* どちらも正解 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              「どちらも正解になりうる」という前提
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              比較は優劣をつけるためではなく、要件との相性を見るために行います。
              多くのアプリでは、どちらを選んでも作りきれます。だからこそ、
              「自分のチームが慣れている技術」「最も重い要件」「将来の移行可能性」といった
              実情に即した軸で決めるのが現実的です。
            </p>

            <InfoBox type="success" title="決め手は要件とチームの相性">
              迷ったら、扱うデータの形（関連が多いか、ドキュメント単位か）と、
              チームが SQL と NoSQL のどちらに慣れているかを基準にしてください。
              どちらも正解になりうる以上、最後に効くのは「素早く正しく作り続けられるか」です。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="ロックインを過度に恐れず、現実的に選定するうえで有効な備えはどれ？"
              options={[
                {
                  label:
                    "サービス固有機能に一切触れず、全機能を自前で抽象化し直す",
                },
                {
                  label:
                    "データのエクスポート手段を確認し、ビジネスロジックをサービス固有部分から分離しておく",
                  correct: true,
                },
                { label: "比較表で総合点が高いほうを無条件に選ぶ" },
                { label: "リアルタイム機能の有無だけで決める" },
              ]}
              explanation="ロックインはゼロにするものではなくトレードオフです。全機能を抽象化し直すと BaaS の利点である速さが失われます。現実的なのは、データのエクスポート可否を確認し、ロジックをサービス固有部分から分離して将来の選択肢を残すことです。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Supabase Documentation",
                  url: "https://supabase.com/docs",
                  description:
                    "Supabase の公式ドキュメント。データモデルや RLS の考え方を確認できる",
                },
                {
                  title: "Firebase Documentation",
                  url: "https://firebase.google.com/docs",
                  description:
                    "Firebase の公式ドキュメント。Firestore やセキュリティルールの基礎を確認できる",
                },
                {
                  title: "Cloud Firestore データモデル",
                  url: "https://firebase.google.com/docs/firestore/data-model",
                  description:
                    "ドキュメント型 NoSQL の設計思想を理解するための公式解説",
                },
                {
                  title: "Supabase - Row Level Security",
                  url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
                  description:
                    "SQL ベースの認可（RLS）の考え方。Firebase のルールと対比して読むと違いが掴める",
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
