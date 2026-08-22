import {
  Shield,
  RefreshCw,
  ClipboardList,
  Zap,
  Lock,
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

export default function PermissionModes() {
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
            パーミッションモード
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude が行動の前に確認を求めるかどうかを制御する 6
            つのモード。タスクの性質に合わせて切り替えながら使う。
          </p>
          <VerifiedBox
            verifiedAt="2026-08-22"
            cmuxVersion="Claude Code 2.1.239"
            platform="macOS (Apple Silicon)"
            officialDocs="https://code.claude.com/docs/en/permission-modes"
            officialDocsLabel="公式: Choose a permission mode"
          />
        </div>

        <div className="space-y-12 mt-8">
          {/* モード一覧 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-[var(--claude-primary)]" />6 つのモード
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              モードが決めるのは「<strong>何が確認なしで実行されるか</strong>
              」です。読み取りだけを許すものから、すべてを通すものまで段階があります。
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      モード
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      確認なしで実行されるもの
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">
                      向いている場面
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    [
                      "default",
                      "読み取りのみ",
                      "すべての操作を自分でレビューしたい、機微な作業（表示名は Manual）",
                    ],
                    [
                      "acceptEdits",
                      "読み取り + ファイル編集 + 一般的な FS コマンド（mkdir / touch / mv / cp 等）",
                      "レビューしながらの反復開発",
                    ],
                    [
                      "plan",
                      "読み取り + （auto モードが使える環境では）分類器が承認したコマンド",
                      "変更前のコードベース探索",
                    ],
                    [
                      "auto",
                      "すべて（バックグラウンドの安全チェック付き）",
                      "長時間タスク、確認疲れの軽減",
                    ],
                    [
                      "dontAsk",
                      "事前承認済みツールのみ",
                      "ロックダウンした CI・スクリプト",
                    ],
                    [
                      "bypassPermissions",
                      "すべて（チェックなし）",
                      "隔離済みコンテナ・VM 限定",
                    ],
                  ].map(([mode, what, when]) => (
                    <tr key={mode} className="bg-white dark:bg-slate-900">
                      <td className="px-4 py-3 font-mono font-bold text-[var(--claude-primary)] whitespace-nowrap">
                        {mode}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {what}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {when}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="既定の開始モード">
              Pro / Max / Team プランでは{" "}
              <strong>auto モードが組み込みの開始モード</strong>
              です。組織の管理設定や <code>permissions.defaultMode</code>{" "}
              で変更できます。auto を user settings で既定にする場合は{" "}
              <code>~/.claude/settings.json</code> に書きます（プロジェクトの{" "}
              <code>.claude/settings.json</code> からは auto は効きません）。
            </InfoBox>
          </section>

          {/* 切り替え */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <RefreshCw className="text-[var(--claude-primary)]" />
              モードの切り替え
            </h2>
            <CodeBlock
              code={`# セッション中: Shift+Tab でモードを循環
#   default → acceptEdits → plan →（使える環境では）bypassPermissions → auto
#   auto からは 1 回押すと default に戻る

# 起動時に指定
$ claude --permission-mode plan
$ claude --permission-mode acceptEdits

# プロジェクトの既定を settings で固定
# .claude/settings.json
{
  "permissions": {
    "defaultMode": "plan"
  }
}`}
              language="bash"
            />
          </section>

          {/* plan モード */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ClipboardList className="text-[var(--claude-primary)]" />
              plan: 編集の前に分析する
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              プランモードの Claude
              はファイルを読み、調査のためのシェルコマンドを実行し、計画を書きますが、
              <strong>ソースの編集は計画を承認するまでブロック</strong>
              されます。承認時の選択肢（auto モードで進む / 編集を 1 件ずつ確認
              / 計画を続ける）と使い方の詳細は「探索 → 計画 → コード →
              コミット」のページで扱っています。
            </p>
            <InfoBox type="info" title="プランモード中のコマンド実行">
              auto
              モードが使える環境では、計画中のシェルコマンドは確認プロンプトの代わりに分類器（classifier）がレビューします（
              <code>useAutoModeDuringPlan</code>{" "}
              設定、既定で有効）。承認されたコマンドは実行され、拒否されたものはブロックされます。
            </InfoBox>
          </section>

          {/* auto モード */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-[var(--claude-primary)]" />
              auto: 分類器付きの自律実行
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              auto モードでは、通常の確認プロンプトなしで Claude
              が実行を進めます。代わりに<strong>独立した分類器モデル</strong>
              が各アクションを実行前にレビューし、依頼を超えたエスカレーション、未知のインフラへのアクセス、読み込んだ敵対的コンテンツに操られた形跡のある操作をブロックします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">
                  明示ルールは生きている
                </h4>
                <p className="text-xs text-muted-foreground">
                  settings.json の <code>ask</code> ルールに該当する操作は auto
                  モードでも確認を求めます。<code>rm -rf /</code> や{" "}
                  <code>rm -rf ~</code>{" "}
                  のようなクリティカルパスへの削除は分類器が個別にレビューします。
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-2">安全の保証ではない</h4>
                <p className="text-xs text-muted-foreground">
                  公式は「auto
                  モードは確認を減らすが安全を保証しない」と明記しています。方向性を信頼できるタスクに使い、機微な操作のレビューの代替にはしないこと。
                </p>
              </div>
            </div>
            <InfoBox type="warning" title="利用条件がある">
              auto
              モードにはプラン・組織設定・モデル・プロバイダの条件があります（Anthropic
              API では Opus 4.6 以降 / Sonnet 4.6 以降 / Fable 5）。「auto mode
              unavailable」と表示される場合は条件が満たされていないことを意味し、一時的な障害ではありません。
            </InfoBox>
          </section>

          {/* permissions ルールとの関係 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Lock className="text-[var(--claude-primary)]" />
              permissions ルールとの関係
            </h2>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              モードは「確認の既定値」を決めるもので、settings.json の{" "}
              <code>permissions</code>（<code>allow</code> / <code>ask</code> /{" "}
              <code>deny</code>）は
              <strong>個別ルールとしてモードに重なります</strong>。deny
              ルールはどのモードでも常に効きます。
            </p>
            <CodeBlock
              code={`// .claude/settings.json
{
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": ["Bash(npm test *)", "Bash(npm run lint *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Bash(rm -rf *)"]
  }
}`}
              language="json"
            />
            <p className="text-sm text-muted-foreground mt-4">
              ルールの書式・スコープの詳細と、機密ファイルの読み取り遮断は「セキュリティと権限設定」のページで扱います。
            </p>
          </section>

          <CodingChallenge
            preview
            previewType="config"
            title="タスクに合わせた permissions 設定を書こう"
            description="「探索はプランモードから始め、テストと lint は確認なしで実行、git push は必ず確認、.env は読ませない」チームの settings.json を書いてください。"
            initialCode={`{\n  "permissions": {\n    "defaultMode": "___",  // ← ここを埋める（探索から始めるモード）\n    "allow": ["Bash(npm test *)", "Bash(npm run lint *)"],\n    "___": ["Bash(git push *)"],  // ← ここを埋める（必ず確認させるルール）\n    "___": ["Read(./.env)"]  // ← ここを埋める（常に禁止するルール)\n  }\n}`}
            answer={`{\n  "permissions": {\n    "defaultMode": "plan",\n    "allow": ["Bash(npm test *)", "Bash(npm run lint *)"],\n    "ask": ["Bash(git push *)"],\n    "deny": ["Read(./.env)"]\n  }\n}`}
            hints={[
              "defaultMode に plan を指定するとセッションがプランモードで始まります",
              "ask ルールに該当する操作は auto モードでも確認を求めます",
              "deny ルールはどのモードでも常に効きます",
            ]}
            keywords={["plan", "ask", "deny"]}
          />

          {/* 参考リンク */}
          <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-xl font-bold mb-4">参考リンク</h2>
            <ul className="space-y-2 text-sm">
              {[
                {
                  label: "Choose a permission mode（公式）",
                  url: "https://code.claude.com/docs/en/permission-modes",
                },
                {
                  label: "Configure permissions（公式）",
                  url: "https://code.claude.com/docs/en/permissions",
                },
                {
                  label:
                    "実践Claude Code: Permission modes（公式ラーニングパス）",
                  url: "https://academy.claude.com/courses/claude-code-in-action/permission-modes",
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
