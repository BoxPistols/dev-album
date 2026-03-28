import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const milestones = [
  {
    year: "1956",
    title: "AI の誕生",
    description:
      "ダートマス会議で「人工知能」という用語が正式に使われた。初期の研究は記号処理と論理推論が中心だった。",
  },
  {
    year: "2012",
    title: "AlexNet",
    description:
      "ImageNet 画像認識コンペティションで深層 CNN が圧勝。ディープラーニングの実用性を証明し、AI 研究に再び注目が集まった。",
  },
  {
    year: "2017",
    title: "Transformer",
    description:
      "Google が「Attention Is All You Need」を発表。Self-Attention 機構により並列処理が可能になり、GPT・BERT など LLM の基盤アーキテクチャとなった。",
  },
  {
    year: "2022",
    title: "ChatGPT",
    description:
      "GPT-3.5 ベースの対話型 AI がリリースされ、2ヶ月で1億ユーザーを突破。AI が一般ユーザーに浸透する転換点となった。",
  },
  {
    year: "2024",
    title: "マルチモーダル / AI エージェント",
    description:
      "GPT-4o、Claude 3.5 などマルチモーダルモデルが普及。Claude Code のような AI エージェントが開発ワークフローに統合され始めた。",
  },
];

const webDevAiCards = [
  {
    title: "LLM API",
    examples: "チャットボット、コード生成、文章要約",
    description:
      "OpenAI API や Anthropic API を呼び出して、テキスト生成・分類・要約などを Web アプリに組み込む。最も一般的な AI 活用パターン。",
  },
  {
    title: "RAG",
    examples: "社内文書検索、FAQ ボット",
    description:
      "Retrieval-Augmented Generation の略。外部データを検索し、その結果を LLM のコンテキストに含めて回答を生成する。ハルシネーション対策に有効。",
  },
  {
    title: "ベクトル検索",
    examples: "類似検索、レコメンド、セマンティック検索",
    description:
      "テキストや画像を数値ベクトルに変換し、意味的な近さで検索する。キーワード一致ではなく、意味の類似性に基づいた検索が可能になる。",
  },
  {
    title: "画像生成 AI",
    examples: "UI デザイン支援、プロトタイプ素材",
    description:
      "Stable Diffusion、DALL-E、Midjourney などを使って画像を生成する。UI モックアップの素材作成やプレースホルダー画像の生成に活用できる。",
  },
];

export default function Landscape() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            AI・ML・DL・LLM の全体像
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            AI 関連の用語は多いですが、それぞれの関係はシンプルな入れ子構造で整理できます。
            まずは全体の見取り図を把握し、各領域の役割を確認します。
          </p>
        </div>

        {/* WhyNowBox */}
        <WhyNowBox tags={["AI", "ML", "DL", "LLM", "Web開発"]}>
          <p>
            Web 開発の現場でも LLM API の組み込みや RAG
            の実装が求められる場面が増えています。 API
            を呼ぶだけなら理論は不要に思えますが、モデルの特性やプロンプト設計の背景を理解しておくと、適切なモデル選定・コスト最適化・エラー対応の判断がしやすくなります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 階層図: AI > ML > DL > LLM */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AI・ML・DL・LLM の階層構造
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI（人工知能）を最も広い概念として、その内側に ML、DL、LLM
              が入れ子状に含まれています。
              外側の概念ほど範囲が広く、内側ほど特化した技術です。
              この構造を理解しておくと、各技術の位置づけが整理しやすくなります。
            </p>

            {/* Nested visual diagram */}
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-primary">AI</span>
                <span className="text-xs text-muted-foreground">
                  Artificial Intelligence
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                人間の知能を模倣する技術全般。ルールベースのエキスパートシステムから、統計的手法、ニューラルネットワークまでを含む最も広い概念。
              </p>

              <div className="rounded-lg border-2 border-blue-400/30 bg-blue-50 dark:bg-blue-950/20 p-4 ml-4 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    ML
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Machine Learning
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  データからパターンを学習する AI のサブ分野。
                  明示的にルールをプログラムするのではなく、データから規則性を自動的に獲得する。
                  スパムフィルタやレコメンドエンジンが代表例。
                </p>

                <div className="rounded-lg border-2 border-violet-400/30 bg-violet-50 dark:bg-violet-950/20 p-4 ml-4 mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                      DL
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Deep Learning
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    多層のニューラルネットワークを使った ML のサブ分野。
                    画像認識や音声認識で高い性能を発揮する。2012 年の AlexNet
                    以降、急速に発展した。
                  </p>

                  <div className="rounded-lg border-2 border-amber-400/30 bg-amber-50 dark:bg-amber-950/20 p-4 ml-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                        LLM
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Large Language Model
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      大量のテキストデータで訓練された大規模言語モデル。Transformer
                      アーキテクチャをベースに、テキスト生成・要約・翻訳・コード生成を行う。
                      GPT、Claude、Gemini が代表例。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Web 開発者の視点">
              Web 開発で直接扱うのは主に LLM（API 経由）ですが、ML や DL
              の基礎概念を知っておくと、モデルの得意・不得意やハルシネーションの原因を理解しやすくなります。
            </InfoBox>
          </section>

          {/* 各レイヤーの具体例 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              各レイヤーの代表的な技術と応用例
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              それぞれの階層にどのような技術が属するか、具体的な応用例とともに確認します。
              階層が深くなるほど、扱うデータ量や計算コストが大きくなる傾向があります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  AI（広義）
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>
                    <span className="font-medium text-foreground">
                      ルールベース:
                    </span>{" "}
                    チェスエンジン、エキスパートシステム
                  </li>
                  <li>
                    <span className="font-medium text-foreground">探索:</span>{" "}
                    経路探索（A*アルゴリズム）、ゲーム AI
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      ロボティクス:
                    </span>{" "}
                    自律走行、産業用ロボット制御
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  ML（機械学習）
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>
                    <span className="font-medium text-foreground">
                      教師あり学習:
                    </span>{" "}
                    スパムフィルタ、価格予測
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      教師なし学習:
                    </span>{" "}
                    顧客セグメンテーション、異常検知
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      強化学習:
                    </span>{" "}
                    ゲーム AI（AlphaGo）、レコメンド最適化
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  DL（ディープラーニング）
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>
                    <span className="font-medium text-foreground">CNN:</span>{" "}
                    画像分類、物体検出
                  </li>
                  <li>
                    <span className="font-medium text-foreground">RNN:</span>{" "}
                    音声認識、時系列予測
                  </li>
                  <li>
                    <span className="font-medium text-foreground">GAN:</span>{" "}
                    画像生成、スタイル変換
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold text-foreground mb-2 text-base">
                  LLM（大規模言語モデル）
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>
                    <span className="font-medium text-foreground">
                      テキスト生成:
                    </span>{" "}
                    GPT-4、Claude、Gemini
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      コード生成:
                    </span>{" "}
                    GitHub Copilot、Claude Code
                  </li>
                  <li>
                    <span className="font-medium text-foreground">
                      マルチモーダル:
                    </span>{" "}
                    画像+テキストの統合理解
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* タイムライン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AI の主要マイルストーン
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI 研究は 1950 年代に始まりましたが、実用的な成果が加速したのは 2010
              年代以降です。
              特にディープラーニングの進展と計算資源の拡大が転換点になりました。
              以下は、Web 開発者が押さえておくと役立つ主要な出来事です。
            </p>

            <div className="space-y-4">
              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  className="flex gap-4 items-start rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold"
                      style={{ fontSize: 13 }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz 1 */}
          <section>
            <Quiz
              question="機械学習（ML）は AI のどの位置づけ？"
              options={[
                { label: "AI と同義で、まったく同じ概念" },
                {
                  label:
                    "AI のサブ分野で、データからパターンを学習する手法",
                  correct: true,
                },
                { label: "AI より広い概念で、AI は ML の一部" },
                { label: "AI とは独立した別の技術分野" },
              ]}
              explanation="ML（機械学習）は AI の一部です。AI は人間の知能を模倣する技術全般を指し、ML はその中でもデータから自動的にパターンを学習するアプローチを指します。"
            />
          </section>

          {/* Web開発者に関係するAI技術 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Web 開発者に関係する AI 技術
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI の範囲は広いですが、Web
              開発者が実務で使う技術はある程度絞られます。
              以下の 4 つが、現時点で Web 開発と接点の多い AI 技術です。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {webDevAiCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold">
                      {card.title}
                    </span>
                  </div>
                  <p
                    className="text-xs text-muted-foreground mb-2"
                    style={{ fontSize: 13 }}
                  >
                    {card.examples}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <InfoBox type="info" title="どこから手をつけるか">
              Web 開発者にとって最も取り組みやすいのは LLM API
              の利用です。OpenAI や Anthropic の API を HTTP
              リクエストで呼ぶだけで、テキスト生成や分類の機能をアプリに追加できます。
              RAG やベクトル検索は、その次のステップとして自然に繋がります。
            </InfoBox>
          </section>

          {/* AI の冬と現在のブーム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AI の冬と現在のブーム
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              AI の歴史には「AI の冬」と呼ばれる停滞期が複数回ありました。
              期待が先行して実用的な成果が追いつかず、研究資金が縮小した時期です。
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              現在のブームは、ディープラーニングの成功（2012 年以降）と GPU
              を中心とした計算資源の拡大、大規模データセットの蓄積という 3
              つの要因が重なって起きています。
              過去の冬と異なり、実際の製品やサービスに組み込まれている点が特徴です。
            </p>

            {/* Comparison table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted">
                      時期
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted">
                      状況
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-foreground bg-muted">
                      主な原因
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">
                      1974-1980
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      第一次 AI の冬
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      初期の楽観的な予測が現実に追いつかなかった
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">
                      1987-1993
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      第二次 AI の冬
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      エキスパートシステムの限界が明らかになった
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-muted-foreground">
                      2012-現在
                    </td>
                    <td className="py-3 px-4 text-primary font-medium">
                      第三次 AI ブーム
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      DL の成功 + GPU + 大規模データ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="AI の冬は再来するか？">
              現在のブームが永続する保証はありません。ただし、過去の冬と異なり、AI
              は既に多くの製品・サービスに組み込まれて実用化されています。
              技術の進歩が一時的に鈍化する可能性はありますが、実務での利用が後退する可能性は低いと考えられています。
            </InfoBox>
          </section>

          {/* Quiz 2 */}
          <section>
            <Quiz
              question="2017 年に発表された、LLM の基盤となったアーキテクチャは？"
              options={[
                { label: "CNN（畳み込みニューラルネットワーク）" },
                { label: "RNN（再帰型ニューラルネットワーク）" },
                { label: "Transformer", correct: true },
                { label: "GAN（敵対的生成ネットワーク）" },
              ]}
              explanation="Transformer は 2017 年に Google が発表したアーキテクチャで、Self-Attention 機構により並列処理が可能になりました。GPT、BERT、Claude など現在の主要な LLM はすべて Transformer をベースにしています。"
            />
          </section>

          {/* Reference Links */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Machine Learning - Google Developers",
                  url: "https://developers.google.com/machine-learning",
                  description:
                    "Google が提供する ML の基礎コース。概念の整理に役立つ",
                },
                {
                  title: "Attention Is All You Need (2017)",
                  url: "https://arxiv.org/abs/1706.03762",
                  description:
                    "Transformer アーキテクチャの原論文。LLM の基盤技術",
                },
                {
                  title: "Anthropic Research",
                  url: "https://www.anthropic.com/research",
                  description:
                    "Claude を開発する Anthropic の研究ページ。AI Safety に関する論文が多い",
                },
                {
                  title: "Stanford CS229 - Machine Learning",
                  url: "https://cs229.stanford.edu/",
                  description:
                    "Stanford 大学の ML 講義。理論をより深く学びたい場合の参考",
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
