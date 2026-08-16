import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";

export default function HarnessEngineering() {
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
            ハーネスエンジニアリング
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Agent = Model + Harness。AI エージェントを実用で使うために、
            モデル本体ではなく「周りの仕組み」を設計する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* ── ハーネスとは ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ハーネスとは
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              ハーネス（harness）は「エージェントの土台」を指す。
              モデルそのもの以外の全要素 —
              与えられるコンテキスト、使えるツール、
              実行できるアクション、検証の仕組み、人間との接点 —
              をまとめてハーネスと呼ぶ。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              Martin Fowler のサイトには「Harness engineering for coding agent
              users」（2026-04-02 公開）があり、Anthropic
              のエンジニアリングブログもこの語を用いている。 Claude Code
              のようなエージェントツールは「ハーネスの実装例」にあたる。
            </p>

            <CodeBlock
              language="bash"
              code={`# 公式: Agent = Model + Harness
#
# Model: Claude Opus 4.7 等の LLM 本体
# Harness: それ以外の全部
#   - 渡されるコンテキスト（CLAUDE.md, ファイル, ツール出力）
#   - 使えるツール（Bash, Edit, Read, Subagent...）
#   - 検証の仕組み（hooks, tests, 型チェック）
#   - 修正のループ（rewind, /clear, plan mode）
#   - 人間との接点（permissions, plan の確認）`}
            />
          </section>

          {/* ── なぜ harness か ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              なぜハーネスが重要か
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              モデル単体は強力だが、本番で動くエージェントには信頼性が要る。
              「正しいことを正しく、間違ったら気づく」を成立させるのが harness
              の役割。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              ある実例では、LangChain がモデルを変えずに harness
              を作り直すだけで、 Terminal-Bench 2.0 のスコアを 52.8% → 66.5%
              に伸ばした。 モデルではなく harness
              を設計する余地が大きい、という典型例。
            </p>

            <InfoBox type="info" title="プロンプトとの違い">
              プロンプトは「今このターン何を頼むか」。
              ハーネスは「常に成立する仕組み」。
              プロンプトを書き直すのではなく、ハーネスを直す方が長持ちする。
            </InfoBox>
          </section>

          {/* ── 4 要素 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ハーネスの 4 要素
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              Martin Fowler の整理に従うと、ハーネスは次の 4 機能で構成される。
              これは「ガバナンスの古典」(Constrain / Inform / Verify / Correct)
              と同じ枠組み。
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. Constrain（制限する）
                </h3>
                <p className="text-muted-foreground">
                  エージェントが取れる行動を絞る。permissions、sandbox、
                  allowlist のツール、ファイル書き込みのスコープなどが該当する。
                  最初は
                  read-only、明示的承認で書き込み許可、というデフォルトが筋。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2. Inform（伝える）
                </h3>
                <p className="text-muted-foreground">
                  必要な文脈を渡す。CLAUDE.md、AGENTS.md、Skills、@import、
                  Subagents
                  が読み込む参照資料、検証コマンドの場所、コードベース固有の規約など。
                  「Claude が推測できないこと」を明示するのが基本。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3. Verify（検証する）
                </h3>
                <p className="text-muted-foreground">
                  生成物を機械的に確認する。tests、型チェック、linter、
                  hooks、UI のスクリーンショット比較、cmux ブラウザ操作。
                  「動いて見える」と「実際に動く」のギャップを埋める層。
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4. Correct（修正する）
                </h3>
                <p className="text-muted-foreground">
                  失敗を巻き戻す・修正する経路を残す。/rewind、checkpoints、
                  /clear、plan mode、複数セッションでの再挑戦が該当する。
                  「失敗するのを許す代わりに回復は速くする」設計。
                </p>
              </div>
            </div>
          </section>

          {/* ── Claude Code は harness の好例 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Claude Code はハーネスの実装例
            </h2>

            <p className="text-foreground mb-8 leading-relaxed">
              Claude Code が備える機能を 4 要素にマップすると、
              ハーネスがどう組み立てられているかが見える。
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="p-3 text-left font-semibold text-foreground">
                      要素
                    </th>
                    <th className="p-3 text-left font-semibold text-foreground">
                      Claude Code の機能
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Constrain
                    </td>
                    <td className="p-3 text-muted-foreground">
                      permissions / sandbox / allowlist / auto mode の
                      classifier
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Inform
                    </td>
                    <td className="p-3 text-muted-foreground">
                      CLAUDE.md / @import / Skills / Subagents / MCP
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Verify
                    </td>
                    <td className="p-3 text-muted-foreground">
                      hooks（lifecycle イベントの一覧は公式リファレンスの Hook
                      lifecycle 表を参照）/ Bash テスト実行 / Plan Mode
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-semibold text-foreground">
                      Correct
                    </td>
                    <td className="p-3 text-muted-foreground">
                      Checkpointing / /rewind / /clear / --resume
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-foreground leading-relaxed">
              「Claude Code を使う」は「特定のハーネスを採用する」と同義。
              プロジェクトに合わせて CLAUDE.md・hooks・skills
              を組み立てる作業は、
              そのハーネスをカスタマイズする作業に他ならない。
            </p>
          </section>

          {/* ── Managed Agents ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Managed Agents（メタハーネス）
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              Anthropic は 2026 年に Managed Agents という枠組みを公開した。
              これは「特定ハーネスの実装」ではなく、複数のハーネスを動かす土台
              （メタハーネス）に近い。
            </p>

            <p className="text-foreground mb-6 leading-relaxed">
              設計の核は <strong>brain / hands / session</strong> の分離。
              brain（モデル + ハーネス本体）、hands（サンドボックスとツール）、
              session（イベントログ）を独立コンポーネントとして交換可能にした。
              「障害が起きたコンテナを再起動 → 同じ session を再開」が成立する。
            </p>

            <InfoBox type="info" title="harness は陳腐化する">
              ハーネスの仮定（例: Claude が長文に弱いから context reset
              する等）は、 モデルが進化すると古くなる。Managed Agents
              は「将来のモデルが変わっても
              ハーネスを置き換えられる」構造を狙っている。Claude Code
              を使う側も、 CLAUDE.md や hooks を 1
              度書いて終わりにせず、定期的に見直すと良い。
            </InfoBox>
          </section>

          {/* ── 実践: 自分のプロジェクトを harness 観点で点検 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              自分のプロジェクトを点検する
            </h2>

            <p className="text-foreground mb-6 leading-relaxed">
              既存プロジェクトでハーネスが整っているかを、4 要素ごとに自問する。
            </p>

            <CodeBlock
              language="markdown"
              code={`# Constrain
- permissions / allowlist は最小権限になっているか
- 危険な操作（rm -rf, push --force）が無防備でないか
- auto mode を使う場合、信頼境界は明確か

# Inform
- CLAUDE.md は短く、保守されているか
- 「読まなくてもいい指示」が混じっていないか
- Skills / Subagents で「常に必要ではない知識」を分離しているか
- MCP サーバーで外部情報源に届いているか

# Verify
- テスト・型チェック・linter は Bash で 1 コマンドで動くか
- hooks で「絶対に守る」を機械化しているか
- UI 変更を screenshot か Chrome 拡張で確認できるか

# Correct
- /rewind で巻き戻せる感覚があるか
- /clear するタイミングを決めているか
- 失敗ログから次の指示を改善する習慣があるか`}
            />
          </section>

          {/* ── 注意点 ── */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">注意点</h2>

            <div className="space-y-4">
              <InfoBox type="info" title="プロンプトに逃げない">
                同じ失敗を 3 回プロンプトで直すぐらいなら、ハーネス（CLAUDE.md /
                hook / skill）を 直す。プロンプトは 1
                ターン分、ハーネスは恒常的。
              </InfoBox>

              <InfoBox type="info" title="作りすぎない">
                hooks や Skills
                を増やしすぎると、エージェントの動きが見えなくなる。
                「外したら何が壊れるか」を説明できないルールは消す。
              </InfoBox>

              <InfoBox type="info" title="モデル更新で見直す">
                Opus 4.6 → 4.7
                のような更新で、過去の制約が不要になることがある。
                ハーネスは「最新モデル前提」で定期的に簡素化する。
              </InfoBox>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
