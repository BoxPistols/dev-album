import {
  Compass,
  ClipboardList,
  Code2,
  GitCommit,
  SkipForward,
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

export default function ExplorePlanCodeCommit() {
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
            探索 → 計画 → コード → コミット
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            調査と計画を実装から分離する、Claude Code
            の日常ワークフローの基本形。公式が推奨する 4
            フェーズを一通り体験する。
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
          {/* なぜ分離するのか */}
          <section>
            <h2 className="text-3xl font-bold mb-6">
              なぜ調査と実装を分離するのか
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              指示を受けた Claude がいきなりコードを書き始めると、
              <strong>間違った問題を解いたコード</strong>
              ができあがることがあります。公式ドキュメントはこれを避けるために、プランモードで調査・計画を先に行い、承認してから実装に移る
              4 フェーズのワークフローを推奨しています。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  icon: <Compass className="w-5 h-5" />,
                  label: "1. 探索",
                  desc: "関連コードを読み理解する",
                },
                {
                  icon: <ClipboardList className="w-5 h-5" />,
                  label: "2. 計画",
                  desc: "実装計画を作り承認を得る",
                },
                {
                  icon: <Code2 className="w-5 h-5" />,
                  label: "3. コード",
                  desc: "計画に沿って実装・検証",
                },
                {
                  icon: <GitCommit className="w-5 h-5" />,
                  label: "4. コミット",
                  desc: "コミットと PR 作成",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center"
                >
                  <div className="flex justify-center text-[var(--claude-primary)] mb-2">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-sm mb-1">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* フェーズ1: 探索 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Compass className="text-[var(--claude-primary)]" />
              フェーズ 1: 探索（プランモードで読む）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              まずプランモードに入ります。<code>Shift+Tab</code>{" "}
              をステータスバーに <code>⏸ plan mode on</code>{" "}
              と表示されるまで押すか、起動時にフラグで指定します。プランモード中の
              Claude はファイルを読んで調査しますが、
              <strong>ソースコードの編集は計画を承認するまでブロック</strong>
              されます。
            </p>
            <CodeBlock
              code={`# 起動時からプランモードに入る
$ claude --permission-mode plan

# セッション中に切り替える場合
#   Shift+Tab を「⏸ plan mode on」表示まで押す
#   1 プロンプトだけなら先頭に /plan を付ける

# 探索の指示例
> src/auth を読んで、セッションとログインの扱いを理解して。
> 秘密情報の環境変数をどう管理しているかも見て。`}
              language="bash"
            />
            <InfoBox type="info" title="調査はサブエージェントに委譲できる">
              大きなコードベースの探索はメインの会話コンテキストを圧迫します。「サブエージェントを使って認証システムのトークンリフレッシュを調査して」のように頼むと、ファイル読み込みはサブエージェント側のコンテキストで行われ、要約だけが返ってきます。
            </InfoBox>
          </section>

          {/* フェーズ2: 計画 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ClipboardList className="text-[var(--claude-primary)]" />
              フェーズ 2: 計画（承認までがゲート）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              探索の結果を踏まえ、実装計画を作らせます。計画がまとまると Claude
              が承認を求めてきます。
            </p>
            <CodeBlock
              code={`# 計画の指示例
> Google OAuth を追加したい。変更が必要なファイルは？
> セッションフローはどうなる？計画を作って。`}
              language="bash"
            />
            <div className="mt-4 space-y-3">
              {[
                {
                  choice: "Yes, and use auto mode",
                  desc: "承認して auto モードで実装開始（auto モードが使えない環境では「Yes, auto-accept edits」表示）",
                },
                {
                  choice: "Yes, manually approve edits",
                  desc: "承認して、編集は 1 件ずつ自分で確認しながら進める",
                },
                {
                  choice: "No, keep planning",
                  desc: "プランモードに留まり、計画の修正点を伝える",
                },
              ].map((item) => (
                <div
                  key={item.choice}
                  className="flex items-start gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
                >
                  <code className="text-[var(--claude-primary)] font-bold text-xs min-w-[220px] shrink-0">
                    {item.choice}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
            <InfoBox type="info" title="計画は自分のエディタで直接編集できる">
              計画の提示中に <code>Ctrl+G</code>{" "}
              を押すと、提案された計画がデフォルトのテキストエディタで開き、Claude
              が進む前に直接手を入れられます。承認するとプランモードを抜け、選んだ承認オプションのパーミッションモードに切り替わります。
            </InfoBox>
          </section>

          {/* フェーズ3: コード */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code2 className="text-[var(--claude-primary)]" />
              フェーズ 3: コード（検証手段をセットで渡す）
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              実装の指示には、<strong>Claude が自分で回せる検証手段</strong>
              （テスト・ビルド・型チェック）を必ず含めます。チェックがあると
              Claude は「実装 → 実行 → 結果を読む →
              直す」のループを自走でき、あなたが検証係になる必要がなくなります。
            </p>
            <CodeBlock
              code={`# 実装の指示例（検証込み）
> 計画どおり OAuth フローを実装して。
> コールバックハンドラのテストを書いて、
> テストスイートを実行して失敗があれば直して。`}
              language="bash"
            />
            <InfoBox type="warning" title="「動いたように見える」で止めない">
              チェックが無いと Claude
              は「見た目上できた」ところで止まります。検証基準の渡し方と、無監督実行を信頼するための考え方は「検証スキル」のページで詳しく扱います。
            </InfoBox>
          </section>

          {/* フェーズ4: コミット */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <GitCommit className="text-[var(--claude-primary)]" />
              フェーズ 4: コミットと PR
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              仕上げもそのまま Claude
              に頼めます。変更内容を踏まえたコミットメッセージの作成、コミット、PR
              の作成（<code>gh</code> CLI 経由）まで一続きで実行されます。
            </p>
            <CodeBlock
              code={`# コミットと PR の指示例
> 変更内容が分かるメッセージでコミットして、PR を開いて。

# 途中の差分を自分の目で確認したいとき
> /diff   # 未コミット差分とターン毎の差分をインタラクティブ表示`}
              language="bash"
            />
          </section>

          {/* スキップの判断 */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <SkipForward className="text-[var(--claude-primary)]" />
              計画フェーズを飛ばしてよいとき
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              プランモードは有用ですが、オーバーヘッドも増えます。公式ドキュメントは次の判断基準を示しています。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2">直接やらせてよい</h4>
                <p className="text-xs text-muted-foreground">
                  typo 修正・ログ 1
                  行の追加・変数のリネームなど、スコープが明確で修正が小さいタスク。
                  <strong>差分を一文で説明できるなら計画は不要</strong>。
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm mb-2">計画が効く</h4>
                <p className="text-xs text-muted-foreground">
                  アプローチに確信が持てない、変更が複数ファイルにまたがる、触るコードに馴染みがない、のいずれかに当てはまるタスク。
                </p>
              </div>
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="4 フェーズのワークフローを組み立てよう"
            description="バグ修正タスクを「探索 → 計画 → コード → コミット」の流れで進めるコマンドと指示を書いてください。"
            initialCode={`# 1. プランモードで起動（調査から始める）\nclaude ___ plan  # ← ここを埋める\n\n# 2. 探索の指示\n# > src/cart の割引計算を読んで、二重適用が起きる経路を調べて。\n\n# 3. 計画の指示\n# > 修正計画を作って。変更するファイルと影響範囲を挙げて。\n#   （計画を直接編集するショートカット: ___ ）  # ← ここを埋める\n\n# 4. 実装の指示（検証手段をセットで渡す）\n# > 計画どおり修正して、割引計算のテストを追加して、\n#   ___ を実行して失敗があれば直して。  # ← ここを埋める（検証コマンドの例）\n\n# 5. 仕上げ\n# > 変更内容が分かるメッセージでコミットして、PR を開いて。`}
            answer={`# 1. プランモードで起動（調査から始める）\nclaude --permission-mode plan\n\n# 2. 探索の指示\n# > src/cart の割引計算を読んで、二重適用が起きる経路を調べて。\n\n# 3. 計画の指示\n# > 修正計画を作って。変更するファイルと影響範囲を挙げて。\n#   （計画を直接編集するショートカット: Ctrl+G ）\n\n# 4. 実装の指示（検証手段をセットで渡す）\n# > 計画どおり修正して、割引計算のテストを追加して、\n#   npm test を実行して失敗があれば直して。\n\n# 5. 仕上げ\n# > 変更内容が分かるメッセージでコミットして、PR を開いて。`}
            hints={[
              "--permission-mode plan で最初からプランモードに入れます（セッション中は Shift+Tab）",
              "Ctrl+G で提案された計画をテキストエディタで直接編集できます",
              "実装の指示には npm test のような Claude が自分で回せる検証コマンドを含めます",
            ]}
            keywords={["--permission-mode", "Ctrl+G", "npm test"]}
          />

          {/* 参考リンク */}
          <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label: "Best practices for Claude Code（公式）",
                  url: "https://code.claude.com/docs/en/best-practices",
                },
                {
                  label: "Choose a permission mode（公式）",
                  url: "https://code.claude.com/docs/en/permission-modes",
                },
                {
                  label: "Common workflows（公式）",
                  url: "https://code.claude.com/docs/en/common-workflows",
                },
                {
                  label: "Claude Code 101（公式ラーニングパス）",
                  url: "https://academy.claude.com/ja/courses/claude-code-101",
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
