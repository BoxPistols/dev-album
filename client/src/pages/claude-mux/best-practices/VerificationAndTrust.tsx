import {
  CheckCircle2,
  Target,
  ShieldAlert,
  Eye,
  History,
  ExternalLink,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodingChallenge from "@/components/CodingChallenge";
import VerifiedBox from "@/components/VerifiedBox";

export default function VerificationAndTrust() {
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
            検証スキル — 無監督実行を信頼する
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude
            に「自分で回せるチェック」を渡し、結果は証拠で受け取る。見ていないセッションの成果を信頼できる状態にするための技術。
          </p>
          <VerifiedBox
            verifiedAt="2026-08-22"
            cmuxVersion="Claude Code 2.1.239"
            platform="macOS (Apple Silicon)"
            officialDocs="https://code.claude.com/docs/en/best-practices"
            officialDocsLabel="公式ベストプラクティス"
          />
        </div>

        <div className="space-y-12 mt-8">
          {/* 原則 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-[var(--claude-primary)]" />
              原則: チェックが無ければ、あなたが検証ループになる
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude
              は「できたように見えた」ところで止まります。実行できるチェックが無いと「見た目上できた」が唯一のシグナルになり、
              <strong>すべてのミスはあなたが気づくまで残ります</strong>。pass /
              fail を返すものを渡せば、Claude は「実装 → チェック実行 →
              結果を読む → 直す」のループを自走します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">チェックになるもの</h4>
                <p className="text-xs text-muted-foreground">
                  テストスイート / ビルドの exit code / linter / 出力を fixture
                  と diff するスクリプト /
                  デザインと比較するブラウザスクリーンショット。
                  <strong>会話の中で Claude が読めるシグナルを返すもの</strong>
                  なら何でもよい。
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">指示の書き換え例</h4>
                <p className="text-xs text-muted-foreground">
                  「ビルドが失敗している」→「ビルドがこのエラーで失敗する:
                  [貼り付け]。修正してビルドが通ることを確認して。
                  <strong>エラーを握り潰さず根本原因を直して</strong>」
                </p>
              </div>
            </div>
          </section>

          {/* エスカレーションの階段 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-[var(--claude-primary)]" />
              チェックの効かせ方には段階がある
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              チェックを用意したら、それが「停止をどれだけ強くゲートするか」を選びます。段階が上がるほどセットアップは増え、代わりにあなたの注意が不要になります。
            </p>
            <div className="space-y-3">
              {[
                {
                  level: "1. プロンプト内",
                  how: "「実装したらテストを実行して、失敗があれば直して」と同じメッセージで頼む。今日から任意のタスクで使える。",
                },
                {
                  level: "2. /goal 条件",
                  how: "チェックを /goal の条件に設定する。独立した評価器が毎ターン後に再チェックし、条件が満たされるまで Claude が作業を続ける。",
                },
                {
                  level: "3. Stop hook",
                  how: "チェックをスクリプトとして Stop hook に置く決定的ゲート。パスするまでターン終了をブロックする（連続 8 回ブロックで Claude Code がフックを上書きして終了）。",
                },
                {
                  level: "4. 第三者の目",
                  how: "検証サブエージェントや、自分の発見を自分で反証する動的ワークフロー。作業したエージェントと採点するエージェントを分離する。",
                },
              ].map((item) => (
                <div
                  key={item.level}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
                >
                  <code className="text-[var(--claude-primary)] font-bold text-xs min-w-[120px] shrink-0">
                    {item.level}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {item.how}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 証拠で受け取る */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Eye className="text-[var(--claude-primary)]" />
              「成功した」ではなく証拠を出させる
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              完了報告は主張ではなく<strong>証拠</strong>で受け取ります:
              テストの出力、実行したコマンドとその戻り、結果のスクリーンショット。証拠のレビューは検証の再実行より速く、見ていなかったセッションにも効きます。
            </p>
            <CodeBlock
              code={`# 指示に「証拠の提出」を含める例
> リトライ処理を実装して。テストを追加して npm test を実行し、
> 全テストがパスした出力をそのまま見せて。

# 差分は自分の目でも確認する
> /diff`}
              language="bash"
            />
            <InfoBox type="warning" title="ビルドグリーン ≠ 正しい描画">
              テストとビルドが通ることと、UI
              が意図どおり描画・動作することは別です。UI
              変更は実ブラウザのスクリーンショットで確認するか、「結果のスクリーンショットを撮って元デザインと比較し、差分を列挙して直して」のように視覚的な検証まで指示に含めます。
            </InfoBox>
          </section>

          {/* 敵対的レビュー */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ShieldAlert className="text-[var(--claude-primary)]" />
              敵対的レビュー: 作った本人に採点させない
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              無監督で長く走らせるほど、完了と見なす前の
              <strong>独立したチェック</strong>
              が重要になります。新しいサブエージェントのコンテキストで動くレビュアーは、変更を生んだ推論を知らず、差分と基準だけを見て評価します。
            </p>
            <CodeBlock
              code={`# バグ検出なら同梱の /code-review（差分を新しいサブエージェントでレビュー）
> /code-review

# 計画との突き合わせは自分でプロンプトを書く
> サブエージェントを使って、レートリミッターの差分を PLAN.md と
> 突き合わせてレビューして。全要件が実装されているか、列挙した
> エッジケースにテストがあるか、タスクの範囲外の変更が無いかを
> 確認して。スタイルの好みではなくギャップだけを報告して。`}
              language="bash"
            />
            <InfoBox type="warning" title="レビュアーの指摘を全部追いかけない">
              「ギャップを探せ」と言われたレビュアーは、健全な実装に対しても何かしら報告します。全指摘を追うと過剰設計（不要な抽象層・防御コード・起こり得ないケースのテスト）に向かいます。
              <strong>
                正しさと明記した要件に影響するギャップだけを報告させ
              </strong>
              、残りは任意として扱います。
            </InfoBox>
          </section>

          {/* 失敗からの復帰 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <History className="text-[var(--claude-primary)]" />
              失敗したら巻き戻す
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              検証で問題が見つかったとき、修正を重ね続けるより
              <strong>チェックポイントに戻ってやり直す</strong>
              方が速いことがあります。公式も「2 回直して直らなければ{" "}
              <code>/clear</code>{" "}
              して、学んだことを織り込んだ良い初期プロンプトを書き直す」ことを推奨しています。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">
                  /rewind（Esc Esc）
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  コード・会話を以前のポイントに復元。チェックポイントは Claude
                  の編集前と各プロンプト時点で自動作成される。
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <code className="text-[var(--claude-primary)] font-bold text-sm">
                  /clear + 書き直し
                </code>
                <p className="text-xs text-muted-foreground mt-2">
                  失敗したアプローチでコンテキストが汚れたら、修正の積み重ねをやめて仕切り直す。
                </p>
              </div>
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="検証込みのタスク指示を書こう"
            description="「バリデーション関数の実装」を、検証基準・証拠の提出・独立レビューまで含む 1 セットの指示として書いてください。"
            initialCode={`# 1. 検証基準を含む実装指示\n# > validateEmail 関数を書いて。テストケース:\n#   user@example.com は true、invalid は false、user@.com は false。\n#   実装後に ___ を実行して。  # ← ここを埋める（検証コマンド）\n\n# 2. 証拠の提出を求める\n# > 全テストがパスした___をそのまま見せて。  # ← ここを埋める\n\n# 3. 独立レビュー（同梱スキル）\n# > ___  # ← ここを埋める（差分をサブエージェントでレビューするコマンド）`}
            answer={`# 1. 検証基準を含む実装指示\n# > validateEmail 関数を書いて。テストケース:\n#   user@example.com は true、invalid は false、user@.com は false。\n#   実装後に npm test を実行して。\n\n# 2. 証拠の提出を求める\n# > 全テストがパスした出力をそのまま見せて。\n\n# 3. 独立レビュー（同梱スキル）\n# > /code-review`}
            hints={[
              "実装指示にはテストケースの例と、実行する検証コマンド（npm test 等）を含めます",
              "完了報告は「成功した」という主張ではなく、テスト出力などの証拠で受け取ります",
              "/code-review は現在の差分を新しいサブエージェントのコンテキストでレビューします",
            ]}
            keywords={["npm test", "出力", "/code-review"]}
          />

          {/* 参考リンク */}
          <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label:
                    "Best practices — Give Claude a way to verify its work（公式）",
                  url: "https://code.claude.com/docs/en/best-practices",
                },
                {
                  label: "Checkpointing（公式）",
                  url: "https://code.claude.com/docs/en/checkpointing",
                },
                {
                  label: "Keep Claude working toward a goal — /goal（公式）",
                  url: "https://code.claude.com/docs/en/goal",
                },
                {
                  label: "実践Claude Code: 検証（公式ラーニングパス）",
                  url: "https://academy.claude.com/courses/claude-code-in-action/verification-skills",
                },
              ].map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--claude-primary)] underline underline-offset-2"
                  >
                    {item.label}
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
