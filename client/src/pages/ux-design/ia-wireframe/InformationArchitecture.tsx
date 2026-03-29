import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import {
  FolderTree,
  Navigation,
  Tag,
  Search,
  Layers,
  LayoutGrid,
  ChevronRight,
  Menu,
  PanelLeft,
} from "lucide-react";

const iaComponents = [
  {
    icon: <Layers className="w-5 h-5" />,
    title: "組織化（Organization）",
    description:
      "コンテンツをカテゴリやグループに分類する。ユーザーが「どこに何があるか」を予測できる構造を作る。",
  },
  {
    icon: <Tag className="w-5 h-5" />,
    title: "ラベリング（Labeling）",
    description:
      "カテゴリやリンクに適切な名前をつける。ユーザーの言葉を使い、専門用語を避けることが原則。",
  },
  {
    icon: <Navigation className="w-5 h-5" />,
    title: "ナビゲーション（Navigation）",
    description:
      "ユーザーがサイト内を移動する仕組み。グローバルナビ、ブレッドクラム、サイドバーなどを設計する。",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "検索（Search）",
    description:
      "ナビゲーションで見つからない場合の代替手段。検索窓の配置、オートコンプリート、フィルタリングを含む。",
  },
];

const sitemapTree = {
  label: "ホーム",
  children: [
    {
      label: "商品一覧",
      children: [
        { label: "カテゴリA" },
        { label: "カテゴリB" },
        { label: "カテゴリC" },
      ],
    },
    {
      label: "会社概要",
      children: [{ label: "チーム紹介" }, { label: "採用情報" }],
    },
    {
      label: "お問い合わせ",
      children: [{ label: "フォーム" }, { label: "FAQ" }],
    },
    {
      label: "ブログ",
      children: [{ label: "記事一覧" }, { label: "タグ別" }],
    },
  ],
};

const navPatterns = [
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    name: "グローバルナビ",
    useCase: "全ページ共通のメインナビゲーション",
    pros: "サイト全体の構造が一目でわかる",
    cons: "項目数が多いと煩雑になる",
    example: "ヘッダーの横並びメニュー",
  },
  {
    icon: <ChevronRight className="w-5 h-5" />,
    name: "ブレッドクラム",
    useCase: "現在位置と階層構造の表示",
    pros: "深い階層でも迷いにくい",
    cons: "モバイルでは表示スペースが不足しがち",
    example: "ホーム > 商品 > カテゴリA",
  },
  {
    icon: <Navigation className="w-5 h-5" />,
    name: "タブナビゲーション",
    useCase: "同一ページ内のコンテンツ切り替え",
    pros: "画面遷移なしで情報を比較できる",
    cons: "タブの数が多いと破綻する（5個以内が目安）",
    example: "設定画面のタブ切り替え",
  },
  {
    icon: <PanelLeft className="w-5 h-5" />,
    name: "サイドバー",
    useCase: "管理画面やドキュメントサイト",
    pros: "多階層のナビゲーションに対応できる",
    cons: "モバイルでは常時表示が難しい",
    example: "管理画面の左メニュー",
  },
  {
    icon: <Menu className="w-5 h-5" />,
    name: "ハンバーガーメニュー",
    useCase: "モバイルでのナビゲーション格納",
    pros: "画面スペースを節約できる",
    cons: "メニューの存在に気づかれにくい",
    example: "モバイルサイトの三本線アイコン",
  },
];

const labelingPrinciples = [
  {
    title: "ユーザーの言葉を使う",
    good: "料金プラン",
    bad: "プライシングストラクチャー",
    description:
      "専門用語や社内用語ではなく、ユーザーが日常的に使う言葉でラベルをつける。",
  },
  {
    title: "一貫性を保つ",
    good: "設定 → アカウント設定 → 通知設定",
    bad: "設定 → マイアカウント → お知らせ管理",
    description:
      "同じレベルのラベルは同じ文体・表記ルールで統一する。名詞で揃えるか、動詞で揃えるかを決める。",
  },
  {
    title: "具体的に書く",
    good: "注文履歴を確認",
    bad: "こちらをクリック",
    description:
      "リンクやボタンのラベルは、クリックした後に何が起きるかをユーザーが予測できる具体性が必要。",
  },
];

function TreeNode({
  label,
  children,
  depth = 0,
}: {
  label: string;
  children?: { label: string; children?: { label: string }[] }[];
  depth?: number;
}) {
  return (
    <div className={depth > 0 ? "ml-6 mt-2" : ""}>
      <div className="flex items-center gap-2">
        {depth > 0 && (
          <div className="w-4 h-px bg-border" />
        )}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
            depth === 0
              ? "bg-primary text-primary-foreground"
              : depth === 1
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-muted text-foreground border border-border"
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          {label}
        </div>
      </div>
      {children?.map((child) => (
        <TreeNode
          key={child.label}
          label={child.label}
          children={child.children}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export default function InformationArchitecture() {
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
            情報アーキテクチャ
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            コンテンツの整理・分類・ラベリングの設計を通じて、ユーザーが迷わず目的の情報にたどり着ける構造を作ります。
          </p>
        </div>

        {/* WhyNowBox */}
        <WhyNowBox tags={["IA", "サイトマップ", "ナビゲーション", "ラベリング"]}>
          <p>
            どれだけ見た目が整っていても、情報の整理がされていなければユーザーは目的のコンテンツにたどり着けない。
            情報アーキテクチャ（IA）はナビゲーション設計の土台であり、
            サイトマップやラベリングを通じてコンテンツの構造を定義する工程です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* IA の 4 要素 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Layers className="text-primary" />
              IA の 4 つの構成要素
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              情報アーキテクチャは大きく分けて 4 つの要素で構成されます。
              それぞれが連携することで、ユーザーが迷わないサイト構造が実現します。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {iaComponents.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary">{item.icon}</span>
                    <h3 className="font-bold text-foreground text-sm">
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

          {/* サイトマップ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <FolderTree className="text-primary" />
              サイトマップの設計
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サイトマップはサイト全体のページ構造をツリー状に可視化したものです。
              IA 設計の成果物として、チームやクライアントとの認識合わせに使います。
              以下は EC サイトのサイトマップ例です。
            </p>

            {/* Tree Diagram */}
            <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Site Map Example
              </p>
              <TreeNode
                label={sitemapTree.label}
                children={sitemapTree.children}
              />
            </div>

            <InfoBox type="info" title="深さは 3 階層以内が目安">
              トップから目的のページまで 3 クリック以内で到達できる構造が理想的とされる。
              階層が深くなるほどユーザーの離脱率が上がるため、カテゴリの分け方を工夫して階層を浅く保つ。
            </InfoBox>
          </section>

          {/* ナビゲーションパターン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Navigation className="text-primary" />
              ナビゲーションパターン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              サイトの構造をユーザーに伝えるためのナビゲーション手法を比較します。
              用途に応じて複数のパターンを組み合わせるのが一般的です。
            </p>

            <div className="space-y-3">
              {navPatterns.map((pattern) => (
                <div
                  key={pattern.name}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">{pattern.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground text-sm">
                          {pattern.name}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {pattern.useCase}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                        <div>
                          <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-0.5">
                            Merit
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {pattern.pros}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-0.5">
                            Demerit
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {pattern.cons}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground mb-0.5">
                            Example
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {pattern.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="情報アーキテクチャ（IA）の 4 つの構成要素に含まれないものはどれ？"
              options={[
                { label: "組織化（Organization）" },
                { label: "ラベリング（Labeling）" },
                { label: "ビジュアルデザイン（Visual Design）", correct: true },
                { label: "検索（Search）" },
              ]}
              explanation="IA の 4 要素は組織化・ラベリング・ナビゲーション・検索です。ビジュアルデザインは IA の後工程で扱う領域であり、IA そのものには含まれません。IA はあくまで情報の構造と分類に関する設計です。"
            />
          </section>

          {/* カードソーティング */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              カードソーティング
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              カードソーティングは、ユーザーにコンテンツをグルーピングしてもらう手法です。
              IA 設計においてカテゴリ分けの妥当性を検証するために使います。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold">
                    オープン
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">
                  オープンソーティング
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  カテゴリ名もユーザーに自由につけてもらう方式。ユーザーがどのような分類を自然と行うかを発見するために使う。
                </p>
                <div className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
                  <span className="font-bold text-foreground">用途: </span>
                  新規サイト構築時、カテゴリ設計の初期段階
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold">
                    クローズド
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">
                  クローズドソーティング
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  あらかじめ用意したカテゴリにカードを分類してもらう方式。既存のカテゴリ構造がユーザーにとって妥当かを検証するために使う。
                </p>
                <div className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
                  <span className="font-bold text-foreground">用途: </span>
                  既存サイトのリニューアル、カテゴリの妥当性検証
                </div>
              </div>
            </div>

            <InfoBox type="info" title="リモートでもカードソーティングは実施できる">
              Optimal Workshop や UserZoom などのツールを使えば、オンラインでカードソーティングを実施できる。
              対面でのポストイットを使った方法と同等の結果が得られる。
            </InfoBox>
          </section>

          {/* ラベリングの原則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Tag className="text-primary" />
              ラベリングの原則
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ラベリングはナビゲーションやリンクのテキストを決める工程です。
              ユーザーが迷わずクリックできるかどうかは、ラベルの質に大きく依存します。
            </p>

            <div className="space-y-4">
              {labelingPrinciples.map((principle) => (
                <div
                  key={principle.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h3 className="font-bold text-foreground text-sm mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {principle.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 px-3 py-2">
                      <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-0.5">
                        Good
                      </p>
                      <p className="text-sm text-foreground">{principle.good}</p>
                    </div>
                    <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-3 py-2">
                      <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-0.5">
                        Bad
                      </p>
                      <p className="text-sm text-foreground">{principle.bad}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="新規サイト構築時に、ユーザーの自然な分類傾向を発見するために適したカードソーティング手法は？"
              options={[
                {
                  label: "オープンソーティング（カテゴリ名もユーザーが自由に決める）",
                  correct: true,
                },
                {
                  label: "クローズドソーティング（事前にカテゴリを用意する）",
                },
                {
                  label: "ツリーテスト（既存構造でタスクを実行させる）",
                },
                {
                  label: "A/B テスト（2パターンを比較する）",
                },
              ]}
              explanation="オープンソーティングはカテゴリ名もユーザーに自由につけてもらう方式で、ユーザーがどのような分類を自然に行うかを発見できる。新規サイト構築のように、カテゴリ設計の手がかりが少ない段階で有効。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "NNGroup: IA vs Navigation",
                  url: "https://www.nngroup.com/articles/ia-vs-navigation/",
                  description:
                    "情報アーキテクチャとナビゲーションの違いと関係性",
                },
                {
                  title:
                    "Card Sorting - Nielsen Norman Group",
                  url: "https://www.nngroup.com/articles/card-sorting-definition/",
                  description:
                    "カードソーティングの手法と実施手順を詳しく解説した記事",
                },
                {
                  title:
                    "NNGroup: Information Architecture",
                  url: "https://www.nngroup.com/articles/information-architecture/",
                  description:
                    "IA の定義と基本原則を解説した NNGroup の記事",
                },
                {
                  title: "Optimal Workshop",
                  url: "https://www.optimalworkshop.com/",
                  description:
                    "カードソーティングやツリーテストをオンラインで実施できるツール",
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
