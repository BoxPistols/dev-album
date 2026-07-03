import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

const useCases = [
  {
    title: "まず無料で試したい",
    body: "Gemini CLI（個人 Google アカウントで 1,000 リクエスト/日）か GitHub Copilot Free（補完 2,000 回/月・チャット 50 回/月）が入口になる。ターミナルエージェントの働き方を体験するなら Gemini CLI、IDE 補完を体験するなら Copilot Free が近道。",
  },
  {
    title: "既に ChatGPT / Claude を契約している",
    body: "既存サブスクリプションの利用枠を活かすのが合理的。ChatGPT の各プランには Codex が、Claude のサブスクリプションには Claude Code が含まれる。追加費用なしでエージェント開発を始められる。",
  },
  {
    title: "GitHub 中心のチーム開発",
    body: "Copilot が最短。Issue アサインで PR を作るコーディングエージェント、Copilot コードレビュー、組織向けのガバナンス機能が GitHub の権限モデルの中で完結する。",
  },
  {
    title: "AWS 上の運用・レガシー変換が主題",
    body: "AWS リソースへの質問はコンソール内の Q アシスタント、コーディングは後継の Kiro が対象になる（Amazon Q Developer 単体の新規契約は受付終了）。Java / .NET の大規模変換は AWS Transform 系の領域。",
  },
  {
    title: "ターミナルでの自律的なタスク実行を深めたい",
    body: "Claude Code・Codex CLI・Gemini CLI の 3 つが同カテゴリ。MCP・フック・サブエージェントのような拡張の深さ、サンドボックスと承認の設計、料金モデルを比較して選ぶ。本マニュアルの他章では Claude Code を軸に解説している。",
  },
];

export default function ChoosingTools() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ツールの選び方と使い分け
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            ここまで見てきた 4 つのツールと Claude Code
            を並べて比較し、ユースケース別の選び方を整理する。
          </p>
        </div>

        <WhyNowBox tags={["比較", "選定基準", "使い分け", "併用"]}>
          <p>
            AI コーディングツールは「どれか 1 つを選んで終わり」ではなく、
            補完・対話・自律タスクという役割ごとに併用するのが実務の主流に
            なりつつあります。各ツールの提供元・形態・料金モデルを一度
            横に並べておくと、チームの契約状況やプラットフォームに合わせて
            冷静に判断できます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ── 比較表 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              5 ツール比較表
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              料金・機能は執筆時点の各社公式ページに基づく。改定される
              ことがあるため、契約前に必ず一次情報を確認してほしい。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      ツール
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      提供元
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      形態
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      主な強み
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      料金の目安
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      エコシステム
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Claude Code
                    </td>
                    <td className="p-3 text-muted-foreground">Anthropic</td>
                    <td className="p-3 text-muted-foreground">
                      CLI / IDE 連携 / GitHub Actions
                    </td>
                    <td className="p-3 text-muted-foreground">
                      MCP・Hooks・Subagents 等の拡張性、CLAUDE.md
                      によるハーネス設計
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Claude サブスクリプションまたは API 従量課金
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Claude / Anthropic API
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Gemini CLI
                    </td>
                    <td className="p-3 text-muted-foreground">Google</td>
                    <td className="p-3 text-muted-foreground">
                      CLI（OSS・Apache 2.0）
                    </td>
                    <td className="p-3 text-muted-foreground">
                      大きな無料枠、Google 検索グラウンディング、1M
                      トークンコンテキスト
                    </td>
                    <td className="p-3 text-muted-foreground">
                      無料（1,000 req/日）〜 API 従量 / Code Assist 有料版
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Google Cloud / Vertex AI
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      OpenAI Codex
                    </td>
                    <td className="p-3 text-muted-foreground">OpenAI</td>
                    <td className="p-3 text-muted-foreground">
                      CLI（OSS）/ IDE 拡張 / クラウド
                    </td>
                    <td className="p-3 text-muted-foreground">
                      クラウドタスクへの委任、OS
                      レベルのサンドボックス、構造化出力
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ChatGPT 各プランに含まれる（Plus $20/月〜）+ API 従量
                    </td>
                    <td className="p-3 text-muted-foreground">
                      ChatGPT / OpenAI API
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      GitHub Copilot
                    </td>
                    <td className="p-3 text-muted-foreground">
                      GitHub (Microsoft)
                    </td>
                    <td className="p-3 text-muted-foreground">
                      IDE 補完 / Chat / CLI / クラウドエージェント
                    </td>
                    <td className="p-3 text-muted-foreground">
                      GitHub 統合（Issue → PR）、複数ベンダーのモデル選択
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Free $0 / Pro $10/月 / Business $19/月〜
                    </td>
                    <td className="p-3 text-muted-foreground">
                      GitHub / Microsoft
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Amazon Q Developer
                    </td>
                    <td className="p-3 text-muted-foreground">AWS</td>
                    <td className="p-3 text-muted-foreground">
                      IDE / CLI / AWS コンソール
                    </td>
                    <td className="p-3 text-muted-foreground">
                      AWS リソース連携、Java / .NET コード変換
                    </td>
                    <td className="p-3 text-muted-foreground">
                      新規受付終了（後継 Kiro へ移行）
                    </td>
                    <td className="p-3 text-muted-foreground">AWS / Bedrock</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="比較表の読み方">
              この表は優劣のランキングではない。各ツールは重心が異なる
              （補完特化 / ターミナル特化 / プラットフォーム統合 /
              クラウド運用）ため、「自分の開発がどこで行われているか」を
              起点に読むと判断しやすい。
            </InfoBox>
          </section>

          {/* ── ユースケース別 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ユースケース別の選び方
            </h2>

            <div className="space-y-4">
              {useCases.map((uc) => (
                <div
                  key={uc.title}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {uc.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 併用の設計 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              併用を前提にした設計
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              複数ツールを併用する場合、それぞれが独自のコンテキストファイル
              （CLAUDE.md / GEMINI.md / AGENTS.md /
              copilot-instructions.md）を読む点が運用上の論点になる。
              幸い、Copilot は AGENTS.md や CLAUDE.md も参照でき、Codex は
              AGENTS.md
              を標準とするなど、共通化の余地は広がっている。プロジェクトの
              ルールを 1 か所に集約し、各ツールから参照させる設計は
              「シングルソースオブトゥルース設計」の章で詳しく扱う。
            </p>

            <InfoBox type="info" title="選定チェックリスト">
              1. どのプラットフォーム（GitHub / AWS / Google Cloud）に
              重心があるか。 2. 既存の契約（ChatGPT / Claude / GitHub）で
              使える枠はあるか。 3. 補完・対話・自律タスクのどれを
              強化したいか。 4. サンドボックスと承認の方針はチームの
              セキュリティ要件に合うか。 — この 4 点を先に決めると、
              ツールの比較は短時間で終わる。
            </InfoBox>
          </section>

          {/* ── Quiz ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>

            <div className="space-y-6">
              <Quiz
                question="AI コーディングツールを選定する際の考え方として、このページの内容に最も沿っているのはどれ？"
                options={[
                  { label: "最も高額なツールを選べば失敗しない" },
                  {
                    label:
                      "開発の重心（プラットフォーム・既存契約・強化したい役割）を起点に選び、必要なら併用する",
                    correct: true,
                  },
                  { label: "1 つのツールにすべてを統一するのが常に正しい" },
                  { label: "モデルの知名度だけで決める" },
                ]}
                explanation="各ツールは補完特化・ターミナル特化・プラットフォーム統合など重心が異なります。GitHub / AWS 等のプラットフォーム、ChatGPT / Claude 等の既存契約、強化したい役割（補完・対話・自律タスク）を起点に選び、役割が重ならない範囲で併用するのが実務的な結論です。"
              />

              <Quiz
                question="複数の AI ツールを併用するとき、コンテキストファイルの運用として推奨される方向性はどれ？"
                options={[
                  {
                    label: "ツールごとに完全に独立したルールを書き、同期しない",
                  },
                  {
                    label:
                      "プロジェクトのルールを 1 か所に集約し、各ツールから参照させる",
                    correct: true,
                  },
                  { label: "コンテキストファイルは使わない" },
                  { label: "最も長いファイルをコピーして全部に配る" },
                ]}
                explanation="CLAUDE.md / GEMINI.md / AGENTS.md / copilot-instructions.md とツールごとにファイルが分かれるため、ルールを重複させると乖離が起きます。共通ルールを 1 か所（例: AGENTS.md）に集約し、各ツールから参照させる SSOT 設計が推奨です。Copilot が CLAUDE.md や AGENTS.md も読むなど、ツール側の相互参照も進んでいます。"
              />
            </div>
          </section>

          {/* ── Reference Links ── */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Claude Code 公式ドキュメント",
                  url: "https://code.claude.com/docs",
                  description: "Claude Code の機能・料金体系の一次情報",
                },
                {
                  title: "google-gemini/gemini-cli (GitHub)",
                  url: "https://github.com/google-gemini/gemini-cli",
                  description: "Gemini CLI の README と無料枠の説明",
                },
                {
                  title: "OpenAI Codex 公式ドキュメント",
                  url: "https://developers.openai.com/codex",
                  description: "Codex の提供形態と料金",
                },
                {
                  title: "GitHub Copilot features / pricing",
                  url: "https://github.com/features/copilot",
                  description: "Copilot のプラン別料金と機能",
                },
                {
                  title: "Amazon Q Developer 公式ページ",
                  url: "https://aws.amazon.com/jp/q/developer/",
                  description: "Q Developer の概要と Kiro 移行情報への入口",
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
