import { Bell, Paintbrush, ShieldBan, RotateCcw, ClipboardList, MessageSquare, FlaskConical } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function HooksRecipes() {
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
            Hooks 実践レシピ
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            公式ドキュメントに基づく実用的な Hook レシピ集。通知、自動フォーマット、保護ルール、検証の自動化。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* デスクトップ通知 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Bell className="text-[var(--claude-primary)]" />
              デスクトップ通知
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code が応答を待っている時や、長時間のタスクが完了した時にデスクトップ通知を送信します。Notification イベントを使用します。
            </p>
            <CodeBlock
              code={`// ~/.claude/settings.json
// macOS の場合
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\\"Claude Code が応答を待っています\\\" with title \\\"Claude Code\\\"'"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <CodeBlock
              code={`// Linux の場合（notify-send を使用）
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Claude Code が応答を待っています'"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <InfoBox type="info" title="stdin からメッセージを取得">
              Notification Hook の stdin には通知メッセージが JSON で渡されます。<code>jq</code> を使って解析し、動的な通知メッセージを表示することもできます。
            </InfoBox>
            <CodeBlock
              code={`# stdin のメッセージを動的に使用する例（macOS）
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.message' | xargs -I {} osascript -e 'display notification \"{}\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
          </section>

          {/* 自動フォーマット */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Paintbrush className="text-[var(--claude-primary)]" />
              ファイル編集後の自動フォーマット
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Claude Code がファイルを書き込んだ後に、自動的に Prettier や ESLint --fix を実行してコードスタイルを統一します。PostToolUse イベントと Write マッチャーを使用します。
            </p>
            <CodeBlock
              code={`// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs prettier --write 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-xs mb-2 text-[var(--claude-primary)]">Write Matcher</h4>
                <p className="text-xs text-muted-foreground">Write ツール（ファイル作成・上書き）の実行後にのみ発火します。Read や Bash には反応しません。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-xs mb-2 text-[var(--claude-primary)]">エラーの無視</h4>
                <p className="text-xs text-muted-foreground"><code>|| true</code> でフォーマッタのエラーを無視し、Hook 失敗によるセッション中断を防ぎます。</p>
              </div>
            </div>
            <CodeBlock
              code={`# ESLint と Prettier を組み合わせる例
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE=$(jq -r '.tool_input.file_path'); case \\"$FILE\\" in *.ts|*.tsx|*.js|*.jsx) npx eslint --fix \\"$FILE\\" 2>/dev/null; npx prettier --write \\"$FILE\\" 2>/dev/null;; esac || true"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <InfoBox type="warning" title="パフォーマンスに注意">
              フォーマッタの実行は各ファイル書き込みごとに発生します。大量のファイルを一度に変更する場合はフォーマッタが頻繁に実行されるため、処理速度への影響を考慮してください。
            </InfoBox>
          </section>

          {/* 保護ファイル */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ShieldBan className="text-[var(--claude-primary)]" />
              保護ファイルへの編集ブロック
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              特定のファイルやディレクトリへの書き込みを Hook でブロックします。PreToolUse イベントで exit code 2 を返すことで操作を中止させます。
            </p>
            <CodeBlock
              code={`// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILEPATH=$(jq -r '.tool_input.file_path'); case \\"$FILEPATH\\" in */migrations/*|*.lock|*.env*) echo \\"保護対象ファイルです: $FILEPATH\\"; exit 2;; esac"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <div className="mt-6 space-y-3">
              {[
                { pattern: '*/migrations/*', desc: 'DBマイグレーションファイル。手動管理が必要。' },
                { pattern: '*.lock', desc: 'パッケージロックファイル。パッケージマネージャーが管理。' },
                { pattern: '*.env*', desc: '環境変数ファイル。機密情報を含む可能性がある。' },
              ].map(item => (
                <div key={item.pattern} className="flex items-start gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-xs min-w-[140px] shrink-0">{item.pattern}</code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
            <CodeBlock
              code={`# Bash コマンドの実行もブロックする例
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "CMD=$(jq -r '.tool_input.command'); case \\"$CMD\\" in *rm\\ -rf*|*DROP\\ TABLE*|*format*) echo \\"危険なコマンドをブロックしました: $CMD\\"; exit 2;; esac"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <InfoBox type="info" title="exit 2 の動作">
              PreToolUse で exit 2 を返すと、ツールの実行がブロックされ、stdout の内容がブロック理由として Claude に通知されます。Claude はブロック理由を踏まえて別のアプローチを試みます。
            </InfoBox>
          </section>

          {/* コンパクション後のコンテキスト再注入 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <RotateCcw className="text-[var(--claude-primary)]" />
              コンパクション後のコンテキスト再注入
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              <code>/compact</code> でセッションを圧縮した後やセッションを復帰した際に、重要なコンテキスト情報を自動的に再注入します。SessionStart イベントの compact マッチャーを使用します。
            </p>
            <CodeBlock
              code={`// .claude/settings.json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo '## 現在の作業コンテキスト'; echo ''; cat .claude/current-task.md 2>/dev/null || echo '(コンテキストファイルなし)'"
          }
        ]
      },
      {
        "matcher": "resume",
        "hooks": [
          {
            "type": "command",
            "command": "echo '## セッション復帰情報'; echo '最終コミット:'; git log --oneline -3 2>/dev/null; echo ''; echo '未コミットの変更:'; git diff --stat 2>/dev/null"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-xs mb-2 text-[var(--claude-primary)]">compact マッチャー</h4>
                <p className="text-xs text-muted-foreground"><code>/compact</code> によるセッション圧縮後のセッション再開時にマッチします。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-xs mb-2 text-[var(--claude-primary)]">resume マッチャー</h4>
                <p className="text-xs text-muted-foreground"><code>--resume</code> や <code>--continue</code> によるセッション復帰時にマッチします。</p>
              </div>
            </div>
            <InfoBox type="info" title="コンテキストファイルの活用">
              <code>.claude/current-task.md</code> のような作業コンテキストファイルを用意しておくと、コンパクション後も重要な情報が保持されます。タスクの進捗や決定事項を記録しておきましょう。
            </InfoBox>
          </section>

          {/* 監査ログ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ClipboardList className="text-[var(--claude-primary)]" />
              ツール使用の監査ログ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              全てのツール使用をログファイルに記録し、Claude Code の動作を監査できるようにします。PostToolUse イベントでマッチャーなし（全ツール対象）で設定します。
            </p>
            <CodeBlock
              code={`// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "jq -c '{timestamp: now | todate, tool: .tool_name, input_summary: (.tool_input | tostring | .[0:200])}' >> .claude/audit.jsonl 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <CodeBlock
              code={`# 監査ログの出力例（.claude/audit.jsonl）
{"timestamp":"2025-01-15T10:30:00Z","tool":"Write","input_summary":"{\"file_path\":\"/src/auth/login.ts\",..."}
{"timestamp":"2025-01-15T10:30:05Z","tool":"Bash","input_summary":"{\"command\":\"npm test\",..."}
{"timestamp":"2025-01-15T10:30:15Z","tool":"Read","input_summary":"{\"file_path\":\"/src/auth/types.ts\",..."}

# ログの確認
$ cat .claude/audit.jsonl | jq .
$ cat .claude/audit.jsonl | jq -r '.tool' | sort | uniq -c | sort -rn`}
              language="bash"
            />
            <InfoBox type="warning" title=".gitignore に追加">
              監査ログファイル（<code>.claude/audit.jsonl</code>）は <code>.gitignore</code> に追加して、Git管理対象から除外しましょう。
            </InfoBox>
          </section>

          {/* Prompt-based hook */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageSquare className="text-[var(--claude-primary)]" />
              Prompt Hook: タスク完了チェック
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Stop イベントで prompt タイプの Hook を使うと、Claude がターンを終了する前に追加の指示を注入できます。タスクの完了条件を確認させるガードレールとして機能します。
            </p>
            <CodeBlock
              code={`// .claude/settings.json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "タスクを完了する前に以下を確認してください:\\n1. 変更したファイルに対応するテストが存在し、パスするか\\n2. TypeScript の型エラーがないか（npx tsc --noEmit）\\n3. リンターの警告がないか\\nすべて問題なければ完了です。問題があれば修正してください。"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <div className="mt-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold text-sm mb-3">Prompt Hook の動作フロー</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>1. Claude がタスク完了と判断して Stop しようとする</p>
                <p>2. Stop Hook の prompt が Claude の次のターンに注入される</p>
                <p>3. Claude が注入されたプロンプトに従って検証を実行する</p>
                <p>4. 問題がなければ完了。問題があれば修正して再度 Stop を試みる</p>
              </div>
            </div>
            <InfoBox type="warning" title="無限ループに注意">
              Prompt Hook が毎回新しいタスクを生成すると無限ループになる可能性があります。条件付きで Hook を適用するか、明確な完了条件を含めてください。
            </InfoBox>
          </section>

          {/* Agent-based hook */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FlaskConical className="text-[var(--claude-primary)]" />
              Agent Hook: テスト実行による検証
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              agent タイプの Hook はサブエージェントを生成して複雑な検証を実行します。テストの実行、結果の分析、必要に応じた修正までを自動化できます。
            </p>
            <CodeBlock
              code={`// .claude/settings.json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "以下の手順で変更を検証してください:\\n1. git diff --name-only で変更されたファイルを特定\\n2. 変更されたファイルに関連するテストを実行\\n3. テストが失敗する場合は原因を報告（修正はしない）",
            "tools": ["Bash", "Read", "Glob", "Grep"]
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-xs mb-2 text-[var(--claude-primary)]">tools の制限</h4>
                <p className="text-xs text-muted-foreground">agent Hook に許可するツールを明示的に指定できます。検証用途では Read と Bash のみに制限するのが安全です。</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-xs mb-2 text-[var(--claude-primary)]">コンテキスト分離</h4>
                <p className="text-xs text-muted-foreground">agent Hook は独立したコンテキストで実行されるため、メインセッションのコンテキストを消費しません。</p>
              </div>
            </div>
            <CodeBlock
              code={`# より高度な agent Hook: コミット前の品質チェック
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "CMD=$(jq -r '.tool_input.command'); case \\"$CMD\\" in *git\\ commit*) echo 'commit-check'; exit 0;; *) exit 0;; esac"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "変更内容の最終チェック:\\n1. npm test を実行してテスト結果を確認\\n2. npx tsc --noEmit で型チェック\\n3. 結果をサマリーとして報告",
            "tools": ["Bash", "Read"]
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
          </section>

          {/* レシピの組み合わせ */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">レシピの組み合わせ例</h2>
            <p className="text-sm text-muted-foreground mb-6">
              複数のレシピを組み合わせることで、包括的な自動化パイプラインを構築できます。
            </p>
            <CodeBlock
              code={`// 実用的な Hook 設定の全体像
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          { "type": "command", "command": "cat .claude/current-task.md 2>/dev/null" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILEPATH=$(jq -r '.tool_input.file_path'); case \\"$FILEPATH\\" in *.lock|*.env*|*/migrations/*) echo \\"保護対象: $FILEPATH\\"; exit 2;; esac"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs prettier --write 2>/dev/null || true"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\\"応答待ち\\\" with title \\\"Claude Code\\\"'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "テストと型チェックを実行して問題がないことを確認してください。"
          }
        ]
      }
    ]
  }
}`}
              language="json"
            />
            <InfoBox type="info" title="段階的な導入を推奨">
              全てのレシピを一度に導入するのではなく、まずはデスクトップ通知や自動フォーマットなど影響の小さいものから始めて、徐々にガードレールを追加していくアプローチが効果的です。
            </InfoBox>
          </section>
          <CodingChallenge
            preview
            previewType="config"
            title="保護ファイルへの編集ブロック Hook を書こう"
            description="PreToolUse Hook で特定のファイル（.env、ロックファイル、マイグレーション）への書き込みをブロックする設定を書いてください。"
            initialCode={`{\n  "hooks": {\n    "___": [  // ← ここを埋める（イベント名）\n      {\n        "matcher": "___",  // ← ここを埋める（対象ツール）\n        "hooks": [\n          {\n            "type": "command",\n            "command": "FILEPATH=$(jq -r '.tool_input.file_path'); case \\"$FILEPATH\\" in */migrations/*|*.lock|*.env*) echo \\"保護対象ファイルです: $FILEPATH\\"; exit 2;; esac"\n          }\n        ]\n      }\n    ]\n  }\n}`}
            answer={`{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Write",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "FILEPATH=$(jq -r '.tool_input.file_path'); case \\"$FILEPATH\\" in */migrations/*|*.lock|*.env*) echo \\"保護対象ファイルです: $FILEPATH\\"; exit 2;; esac"\n          }\n        ]\n      }\n    ]\n  }\n}`}
            hints={[
              'matcher に "Write" を指定してファイル書き込み操作にのみ反応させます',
              'exit 2 を返すとツール実行がブロックされます',
              'case 文で複数のパターンをまとめてマッチングできます',
            ]}
            keywords={['PreToolUse', 'Write']}
          />
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
