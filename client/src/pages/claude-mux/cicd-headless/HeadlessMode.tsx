import { Terminal, Cpu, Shield, Box, Code, Workflow } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function HeadlessMode() {
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
            ヘッドレスモードと自動化
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            パイプモードとヘッドレス実行で Claude Code をスクリプト・CI/CD に組み込み、非対話的な自動処理を実現する。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* パイプモード */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-[var(--claude-primary)]" />
              パイプモード (-p)
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">claude -p</code> はスクリプトやパイプラインでの使用に最適化された非対話モードです。スピナーやプログレス表示を抑制し、結果のみを stdout に出力します。
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">基本的な使い方</h3>
                <CodeBlock language="bash" code={`# 直接プロンプトを渡す
claude -p "package.json の依存関係を分析して"

# stdin からプロンプトを渡す
echo "このコードを最適化して" | claude -p

# ファイル内容をパイプで渡す
cat src/index.ts | claude -p "このコードのバグを見つけて"

# 複数ファイルを渡す
cat src/*.ts | claude -p "全ファイルの型安全性をチェックして"`} />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">出力フォーマット</h3>
                <CodeBlock language="bash" code={`# テキスト出力（デフォルト）
claude -p "Hello" --output-format text

# JSON 出力（プログラムで解析しやすい）
claude -p "Hello" --output-format json
# => {"result": "...", "cost": {...}, ...}

# ストリーミング JSON（リアルタイム処理用）
claude -p "Hello" --output-format stream-json`} />
              </div>
            </div>

            <InfoBox type="info" title="パイプモードの特性">
              パイプモードでは会話履歴が保持されません。毎回新しいセッションとして実行されます。継続的な対話が必要な場合は REPL モード（<code>claude</code>）を使用してください。
            </InfoBox>
          </section>

          {/* 自動化スクリプト */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Workflow className="text-[var(--claude-primary)]" />
              自動化スクリプト
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">シェルスクリプトでの活用</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  パイプモードを使って定型タスクを自動化できます。
                </p>
                <CodeBlock language="bash" code={`#!/bin/bash
# コミットメッセージの自動生成
DIFF=$(git diff --staged)
MSG=$(echo "$DIFF" | claude -p "この差分に対する簡潔なコミットメッセージを日本語で生成して。メッセージのみ出力して。")
git commit -m "$MSG"

# コードレビューの自動実行
claude -p "$(git diff main...HEAD)" --output-format json \\
  | jq -r '.result' > review.md`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">バッチ処理パターン</h3>
                <CodeBlock language="bash" code={`#!/bin/bash
# 複数ファイルを順番に処理
for file in src/**/*.ts; do
  echo "処理中: $file"
  claude -p "$(cat "$file")" \\
    --output-format json \\
    > "reports/$(basename "$file" .ts).json"
done

# 結果を集約
claude -p "reports/ 内の全レポートを集約して要約して"`} />
              </div>
            </div>
          </section>

          {/* 権限の自動承認 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-[var(--claude-primary)]" />
              権限の自動承認
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              CI/CD 環境では対話的な権限確認ができないため、権限を自動承認する仕組みが用意されています。
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">方法</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">説明</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">用途</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['--dangerously-skip-permissions', '全権限チェックをスキップ', 'CI/CD 専用'],
                    ['--allowedTools "tool1,tool2"', '指定ツールのみ許可', '限定的な自動化'],
                    ['settings.json の allowedTools', '設定ファイルで許可を永続化', 'プロジェクト設定'],
                  ].map(([method, desc, usage]) => (
                    <tr key={method} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[var(--claude-primary)]">{method}</td>
                      <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                      <td className="px-4 py-3 text-muted-foreground">{usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="warning" title="--dangerously-skip-permissions は CI/CD 専用">
              このフラグはすべてのツール実行（ファイル書き込み、コマンド実行など）を確認なしで許可します。ローカル開発環境では使用せず、信頼できる CI/CD 環境でのみ使用してください。
            </InfoBox>
          </section>

          {/* サンドボックス環境 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Box className="text-[var(--claude-primary)]" />
              サンドボックス環境
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code を安全に実行するためのサンドボックス機構が複数用意されています。
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">Docker コンテナでの実行</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Docker コンテナ内で Claude Code を実行することで、ホストシステムへの影響を完全に分離できます。
                </p>
                <CodeBlock language="dockerfile" code={`FROM node:20-slim

# Claude Code をインストール
RUN npm install -g @anthropic-ai/claude-code

# 作業ディレクトリを設定
WORKDIR /workspace
COPY . .

# パイプモードで実行
CMD ["claude", "-p", "--dangerously-skip-permissions", "コードを分析して"]`} />
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold mb-3">ネットワーク制限</h3>
                <p className="text-sm text-muted-foreground">
                  CI/CD 環境では必要に応じてネットワークアクセスを制限できます。Claude Code の API 通信に必要なエンドポイント（<code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">api.anthropic.com</code>）のみを許可し、外部への意図しない通信を防止します。
                </p>
              </div>
            </div>
          </section>

          {/* Agent SDK */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="text-[var(--claude-primary)]" />
              SDK によるプログラム的な利用
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code SDK を使うと、TypeScript / Python からプログラム的に Claude Code を呼び出せます。カスタムツールの定義やワークフローの構築が可能です。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">TypeScript SDK</h3>
                <CodeBlock language="typescript" code={`import { claude } from "@anthropic-ai/claude-code";

// 基本的な呼び出し
const result = await claude({
  prompt: "src/index.ts のバグを修正して",
  options: {
    maxTurns: 5,
    allowedTools: ["Read", "Edit", "Write"],
  },
});

console.log(result.text);`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">ストリーミング処理</h3>
                <CodeBlock language="typescript" code={`import { claude } from "@anthropic-ai/claude-code";

// ストリーミングで結果を逐次受信
const stream = claude({
  prompt: "プロジェクト全体をリファクタリングして",
  options: { stream: true },
});

for await (const event of stream) {
  if (event.type === "assistant") {
    process.stdout.write(event.content);
  }
}`} />
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">MCP サーバーとしての起動</h3>
                <p className="leading-relaxed mb-4 text-muted-foreground">
                  Claude Code 自体を MCP サーバーとして起動し、他のツールから呼び出すことも可能です。
                </p>
                <CodeBlock language="bash" code={`# Claude Code を MCP サーバーとして起動
claude mcp serve

# 別のプロセスから MCP クライアントとして接続
# Claude Code の全ツール（Read, Edit, Bash 等）を利用可能`} />
              </div>
            </div>

            <InfoBox type="info" title="Agent SDK の位置づけ">
              SDK はパイプモード（<code>claude -p</code>）の上位互換です。単純な自動化にはパイプモード、カスタムツールや複雑なワークフローには SDK を使い分けてください。
            </InfoBox>
          </section>

          {/* コマンドライン引数一覧 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Code className="text-[var(--claude-primary)]" />
              ヘッドレス実行の主要オプション
            </h2>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">オプション</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">説明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    ['-p, --print', 'パイプモード（非対話、stdout出力のみ）'],
                    ['--output-format <fmt>', '出力形式: text / json / stream-json'],
                    ['--max-turns <n>', 'エージェントの最大ターン数'],
                    ['--model <name>', '使用モデルの指定'],
                    ['--allowedTools "t1,t2"', '許可するツールのリスト'],
                    ['--dangerously-skip-permissions', '全権限を自動承認（CI用）'],
                    ['--verbose', '詳細ログの出力'],
                  ].map(([opt, desc]) => (
                    <tr key={opt} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-[var(--claude-primary)] whitespace-nowrap">{opt}</td>
                      <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="terminal"
            title="ヘッドレスモードの自動化スクリプトを書こう"
            description="Claude Code のパイプモード (-p) を使って、コミットメッセージの自動生成やバッチ処理を行うシェルスクリプトを書いてください。"
            initialCode={`#!/bin/bash\n# Claude Code ヘッドレス自動化\n\n# 1. パイプモードで直接プロンプトを渡す:\n\n# 2. ファイル内容をパイプで渡す:\n\n# 3. JSON 出力フォーマットで実行:\n\n# 4. コミットメッセージの自動生成:\nDIFF=$(git diff --staged)\n\n# 5. CI/CD で全権限を自動承認:`}
            answer={`#!/bin/bash\n# Claude Code ヘッドレス自動化\n\n# 1. パイプモードで直接プロンプトを渡す:\nclaude -p "package.json の依存関係を分析して"\n\n# 2. ファイル内容をパイプで渡す:\ncat src/index.ts | claude -p "このコードのバグを見つけて"\n\n# 3. JSON 出力フォーマットで実行:\nclaude -p "Hello" --output-format json\n\n# 4. コミットメッセージの自動生成:\nDIFF=$(git diff --staged)\nMSG=$(echo "$DIFF" | claude -p "この差分に対する簡潔なコミットメッセージを日本語で生成して")\ngit commit -m "$MSG"\n\n# 5. CI/CD で全権限を自動承認:\nclaude -p "コードを分析して" --dangerously-skip-permissions`}
            hints={[
              'claude -p でパイプモード（非対話）を起動します',
              '--output-format json で構造化出力が得られます',
              '--dangerously-skip-permissions は CI/CD 専用フラグです',
            ]}
            keywords={['claude -p', '--output-format', '--dangerously-skip-permissions', 'git diff']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
