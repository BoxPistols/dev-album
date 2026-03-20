import { Anchor, List, Boxes, Filter, ArrowRightLeft, FolderCog } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

export default function HooksGuide() {
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
            Hooks の設計と実装
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code のライフサイクルにカスタムロジックを挿入し、自動化・検証・通知を実現する Hook システム。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* Hooks とは */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Anchor className="text-[var(--claude-primary)]" />
              Hooks とは
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Hooks は Claude Code のライフサイクルにおける特定のポイントで自動実行されるユーザー定義のアクションです。セッション開始時のセットアップ、ツール実行前後の処理、通知など、さまざまな自動化を実現できます。LLM を介さずに直接実行されるため、高速かつ確実に動作します。
            </p>
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h4 className="font-bold mb-4">Hooks の特徴</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: '確定的な実行', desc: 'LLM の判断を介さずルールベースで実行される。毎回同じ条件で同じ処理が走る。' },
                  { label: '低遅延', desc: 'シェルコマンドとして直接実行されるため、LLM のターンを消費しない。' },
                  { label: '制御フロー', desc: 'exit code で処理の続行・ブロックを制御できる。安全ガードとして機能する。' },
                  { label: 'プロンプト注入', desc: 'Hook の出力を Claude の次のターンに注入できる。動的コンテキストの追加に使用。' },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold text-xs text-[var(--claude-primary)] mb-1">{item.label}</h5>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* イベント一覧 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <List className="text-[var(--claude-primary)]" />
              Hook イベント一覧
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              各イベントは Claude Code のライフサイクルにおける特定のタイミングで発火します。
            </p>
            <div className="space-y-3">
              {[
                { event: 'PreToolUse', timing: 'ツール実行の前', usecase: '操作のブロック、入力の検証、承認フローの挿入。' },
                { event: 'PostToolUse', timing: 'ツール実行の後', usecase: '自動フォーマット、ログ記録、通知の送信。' },
                { event: 'Notification', timing: 'Claude が通知を送信する時', usecase: 'デスクトップ通知、Slack通知、音声アラート。' },
                { event: 'Stop', timing: 'Claude がターンを終了する時', usecase: 'タスク完了チェック、自動テスト実行、コミット前検証。' },
                { event: 'SessionStart', timing: 'セッション開始時', usecase: '環境セットアップ、依存チェック、コンテキスト注入。' },
                { event: 'UserPromptSubmit', timing: 'ユーザーのプロンプト送信時', usecase: 'プロンプトの変換、コンテキストの自動追加。' },
              ].map(item => (
                <div key={item.event} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-baseline gap-3 mb-1">
                    <code className="text-[var(--claude-primary)] font-bold text-sm">{item.event}</code>
                    <span className="text-xs text-muted-foreground">{item.timing}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.usecase}</p>
                </div>
              ))}
            </div>
            <InfoBox type="info" title="イベントの発火条件">
              PreToolUse と PostToolUse は Matcher でフィルタリング可能です。特定のツール（Write, Bash 等）の実行時のみ発火するよう設定できます。
            </InfoBox>
          </section>

          {/* 3つのHookタイプ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Boxes className="text-[var(--claude-primary)]" />
              3つの Hook タイプ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Hook のアクションは3種類のタイプから選択します。用途に応じて使い分けます。
            </p>
            <div className="grid grid-cols-1 gap-6">
              <div className="p-5 rounded-r-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3">command タイプ</h4>
                <p className="text-xs text-muted-foreground mb-3">シェルコマンドを直接実行します。最も基本的なタイプで、フォーマッタの実行やファイル操作に使います。</p>
                <CodeBlock
                  code={`{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $CLAUDE_FILE_PATH"
          }
        ]
      }
    ]
  }
}`}
                  language="json"
                />
              </div>
              <div className="p-5 rounded-r-xl border-l-4 border-purple-500 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3">prompt タイプ</h4>
                <p className="text-xs text-muted-foreground mb-3">Claude に追加のプロンプトを注入します。Stop イベントでタスク完了チェックを行う場合などに使います。</p>
                <CodeBlock
                  code={`{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "タスクが完了したら TODO リストを更新してください。未完了のタスクがあれば作業を続けてください。"
          }
        ]
      }
    ]
  }
}`}
                  language="json"
                />
              </div>
              <div className="p-5 rounded-r-xl border-l-4 border-emerald-500 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3">agent タイプ</h4>
                <p className="text-xs text-muted-foreground mb-3">サブエージェントを生成して複雑な検証を実行します。テストの実行と結果分析など、判断が必要な場合に使います。</p>
                <CodeBlock
                  code={`{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "変更されたファイルに関連するテストを実行し、全てパスすることを確認してください。失敗がある場合は修正してください。",
            "tools": ["Bash", "Read", "Write"]
          }
        ]
      }
    ]
  }
}`}
                  language="json"
                />
              </div>
            </div>
          </section>

          {/* Matcher */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Filter className="text-[var(--claude-primary)]" />
              Matcher によるフィルタリング
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Matcher を使うことで、特定のツールや条件に対してのみ Hook を発火させることができます。文字列またはパターンで指定します。
            </p>
            <CodeBlock
              code={`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'ファイル書き込みが行われます'"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Bashコマンドが実行されます'"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "cat project-context.md"
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
                { matcher: '"Write"', desc: 'Write ツール（ファイル書き込み）の実行時にマッチ' },
                { matcher: '"Bash"', desc: 'Bash ツール（コマンド実行）の実行時にマッチ' },
                { matcher: '"Read"', desc: 'Read ツール（ファイル読み取り）の実行時にマッチ' },
                { matcher: '"compact"', desc: 'SessionStart で、コンパクション後のセッション復帰時にマッチ' },
                { matcher: '"resume"', desc: 'SessionStart で、--resume / --continue によるセッション復帰時にマッチ' },
              ].map(item => (
                <div key={item.matcher} className="flex items-start gap-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <code className="text-[var(--claude-primary)] font-bold text-xs min-w-[120px] shrink-0">{item.matcher}</code>
                  <span className="text-sm text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 入出力 */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ArrowRightLeft className="text-[var(--claude-primary)]" />
              入出力の仕様
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              command タイプの Hook は stdin で JSON データを受け取り、exit code と stdout で結果を返します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">stdin（入力）</h4>
                <p className="text-xs text-muted-foreground mb-3">イベントに関する JSON データが標準入力で渡されます。</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>- <code>tool_name</code>: 実行されるツール名</li>
                  <li>- <code>tool_input</code>: ツールへの入力パラメータ</li>
                  <li>- <code>session_id</code>: セッションID</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="font-bold text-sm mb-3 text-[var(--claude-primary)]">出力</h4>
                <p className="text-xs text-muted-foreground mb-3">exit code と stdout で動作を制御します。</p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>- <code>exit 0</code>: 許可（処理を続行）</li>
                  <li>- <code>exit 2</code>: ブロック（操作を中止）</li>
                  <li>- <code>stdout</code>: Claude への注入テキスト</li>
                </ul>
              </div>
            </div>
            <CodeBlock
              code={`# PreToolUse Hook の stdin 例（Write ツール）
{
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.ts",
    "content": "..."
  },
  "session_id": "abc-123"
}

# exit code による制御
# exit 0 → 操作を許可
# exit 2 → 操作をブロック（Claude にブロック理由を通知）
# その他 → エラーとして扱われる

# stdout の出力は Claude の次のターンに注入される
echo "注意: このファイルは保護対象です"
exit 2`}
              language="bash"
            />
            <InfoBox type="warning" title="exit code の注意点">
              exit code 2 は PreToolUse でのみ「ブロック」として機能します。PostToolUse や他のイベントでは exit code 2 はエラーとして扱われます。
            </InfoBox>
          </section>

          {/* 設定ファイルの配置スコープ */}
          <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FolderCog className="text-[var(--claude-primary)]" />
              設定ファイルの配置スコープ
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              Hooks は settings.json 内に定義します。配置場所によってスコープが変わります。
            </p>
            <div className="space-y-4">
              {[
                {
                  scope: 'ユーザー設定',
                  path: '~/.claude/settings.json',
                  desc: '全プロジェクト共通の個人用 Hook。デスクトップ通知やグローバルなフォーマッタ設定に適している。',
                },
                {
                  scope: 'プロジェクト共有設定',
                  path: '.claude/settings.json',
                  desc: 'チームで共有する Hook。Git管理対象。プロジェクト固有の自動フォーマットやルール適用に使用。',
                },
                {
                  scope: 'プロジェクトローカル設定',
                  path: '.claude/settings.local.json',
                  desc: '個人のプロジェクト固有 Hook。Git管理対象外。個人的な通知設定やデバッグ用 Hook に使用。',
                },
              ].map(item => (
                <div key={item.scope} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-bold text-sm">{item.scope}</span>
                    <code className="text-xs text-[var(--claude-primary)]">{item.path}</code>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <CodeBlock
              code={`# 設定ファイルの全体構造
# ~/.claude/settings.json または .claude/settings.json
{
  "permissions": {
    "allow": ["Read", "Glob", "Grep"],
    "deny": ["Bash(rm -rf *)"]
  },
  "hooks": {
    "PreToolUse": [...],
    "PostToolUse": [...],
    "Notification": [...],
    "Stop": [...],
    "SessionStart": [...],
    "UserPromptSubmit": [...]
  }
}`}
              language="json"
            />
          </section>

          <CodingChallenge
            preview
            previewType="terminal"
            title="Hook 設定を書いてみよう"
            description="settings.json の hooks セクションに、Write ツール実行後に prettier で自動フォーマットし、かつ .env ファイルへの書き込みをブロックする Hook を設定してください。"
            initialCode={`{\n  "hooks": {\n    "___": [  // ← ここを埋める（実行後フック）\n      {\n        "matcher": "Write",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "prettier --write $CLAUDE_FILE_PATH"\n          }\n        ]\n      }\n    ],\n    "___": [  // ← ここを埋める（実行前フック）\n      {\n        "matcher": "___",  // ← ここを埋める（対象ツール）\n        "hooks": [\n          {\n            "type": "command",\n            "command": "if echo $CLAUDE_FILE_PATH | grep -q '.env'; then echo '.env ファイルは保護されています'; exit 2; fi"\n          }\n        ]\n      }\n    ]\n  }\n}`}
            answer={`{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Write",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "prettier --write $CLAUDE_FILE_PATH"\n          }\n        ]\n      }\n    ],\n    "PreToolUse": [\n      {\n        "matcher": "Write",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "if echo $CLAUDE_FILE_PATH | grep -q '.env'; then echo '.env ファイルは保護されています'; exit 2; fi"\n          }\n        ]\n      }\n    ]\n  }\n}`}
            hints={[
              'PostToolUse の matcher に "Write" を指定して、ファイル書き込み後に発火させます',
              'prettier のパスは $CLAUDE_FILE_PATH 環境変数で取得できます',
              'PreToolUse で exit 2 を返すと操作をブロックできます',
            ]}
            keywords={['PostToolUse', 'PreToolUse', 'Write']}
          />

          {/* まとめ */}
          <section className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-2xl font-bold mb-4">Hook 設計のガイドライン</h2>
            <div className="space-y-3">
              {[
                '単一責任: 1つの Hook に1つの責務を持たせる',
                '冪等性: 同じ Hook が複数回実行されても安全であること',
                '高速性: Hook の実行時間は短く保つ（ワークフローをブロックしないため）',
                'エラーハンドリング: 予期しないエラーでもセッションが中断しないよう配慮する',
                'ログ出力: デバッグ用にログを stderr に出力する（stdout は Claude に注入される）',
                'スコープの適切な選択: チーム共有 vs 個人用を明確に区別する',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-sm font-bold text-[var(--claude-primary)] w-6 text-center">{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <PageNavigation />
      </div>
    </div>
  );
}
