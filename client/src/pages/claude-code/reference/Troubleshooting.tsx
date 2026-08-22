import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/CodeBlock";
import PageNavigation from "@/components/PageNavigation";
import BookmarkButton from "@/components/BookmarkButton";
import StepIndicator from "@/components/StepIndicator";
import SectionBadge from "@/components/SectionBadge";
import CodingChallenge from "@/components/CodingChallenge";

export default function Troubleshooting() {
  const [, navigate] = useLocation();
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
            トラブルシューティング
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Claude Code
            でよくある問題とその解決策、そしてこれからの学習リソース。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              よくある問題 (FAQ)
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Q. 動作がおかしい・環境に問題がありそう
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong> まず <code>/doctor</code>{" "}
                  で環境と設定の健全性を診断してください。インストールや設定の問題を検出し、そのまま修正まで任せることもできます。
                </p>
                <CodeBlock
                  code={`# セッション内で環境診断
/doctor

# バージョン・モデル・接続状態の確認
/status`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Q. コンテキストが一杯になり応答の質が落ちた
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong>{" "}
                  会話が長くなるとコンテキストウィンドウが圧迫されます。
                  <code>/compact</code>{" "}
                  で要約して続行するか、区切りの良いところで <code>/clear</code>{" "}
                  して新しい会話を始めてください。
                </p>
                <CodeBlock
                  code={`# 会話を要約してコンテキストを開放（フォーカス指定つき）
/compact auth 関連の変更に集中

# 空のコンテキストで新しい会話を開始
/clear`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Q. セッションを誤って閉じてしまった
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong>{" "}
                  セッション履歴は保存されています。直前のセッションは{" "}
                  <code>claude --continue</code>、過去のセッションは{" "}
                  <code>claude --resume</code> で復帰できます。
                </p>
                <CodeBlock
                  code={`# 直前のセッションを継続して起動
claude --continue

# セッションを選択して再開
claude --resume`}
                  language="bash"
                />
              </div>

              <div className="p-6 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Q. MCP サーバーのツールが使えない
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>A.</strong> まず <code>claude mcp list</code>{" "}
                  で登録状態と接続状態を確認してください。接続に失敗している場合は、サーバーの起動コマンドや認証情報（環境変数）を見直します。認証まわりの問題は{" "}
                  <code>/login</code> でのサインインし直しも有効です。
                </p>
                <CodeBlock
                  code={`# 登録済み MCP サーバの一覧と接続状態
claude mcp list`}
                  language="bash"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                基礎パートの完走、おめでとうございます！
              </h2>
              <p className="text-lg text-emerald-800 dark:text-emerald-300 mb-8 max-w-2xl mx-auto">
                これであなたは Claude Code の基本から AI
                コーディングエージェントの使い分け、環境管理までを習得しました。ここから先は、実際に日々の開発で使い倒し、自分だけの開発基盤を作り上げていってください。応用パートではベストプラクティスと自動化をさらに深めます。
              </p>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate("/claude-code")}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-6 text-lg"
                >
                  トップページに戻る
                </Button>
              </div>
            </div>
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="Claude Code のトラブルシューティングを練習しよう"
            description="よくある Claude Code の問題に対する対処コマンドを書いてください。環境診断、コンテキストの圧縮、セッション復帰、MCP の状態確認を含めましょう。"
            initialCode={`# Claude Code トラブルシューティング\n\n# 1. 環境と設定の健全性を診断（セッション内）\n/___  # ← ここを埋める\n\n# 2. 会話を要約してコンテキストを開放（セッション内）\n/___  # ← ここを埋める\n\n# 3. 直前のセッションを継続して起動\nclaude ___  # ← ここを埋める\n\n# 4. MCP サーバの一覧と接続状態を確認\nclaude ___  # ← ここを埋める`}
            answer={`# Claude Code トラブルシューティング\n\n# 1. 環境と設定の健全性を診断（セッション内）\n/doctor\n\n# 2. 会話を要約してコンテキストを開放（セッション内）\n/compact\n\n# 3. 直前のセッションを継続して起動\nclaude --continue\n\n# 4. MCP サーバの一覧と接続状態を確認\nclaude mcp list`}
            hints={[
              "環境診断は /doctor。f キーで Claude に修正させることもできます",
              "コンテキスト圧迫には /compact。フォーカス指示を添えると重要な文脈を保持できます",
              "--continue は直前のセッション、--resume は選択して再開です",
              "MCP の状態確認は claude mcp list です",
            ]}
            keywords={["doctor", "compact", "--continue", "mcp list"]}
          />
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
