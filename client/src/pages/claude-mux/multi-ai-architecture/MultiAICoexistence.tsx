import { Layers, GitCompare, Workflow, Target, Boxes, Repeat } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import PageNavigation from '@/components/PageNavigation';
import BookmarkButton from '@/components/BookmarkButton';
import StepIndicator from '@/components/StepIndicator';
import SectionBadge from '@/components/SectionBadge';
import CodingChallenge from '@/components/CodingChallenge';

const toolData = [
  { tool: 'Claude Code', config: 'CLAUDE.md\n.claude/settings.json', strength: 'ゼロからの実装・レビュー・調査、Subagents による並列処理', env: 'CLI / VS Code / JetBrains' },
  { tool: 'Cursor', config: '.cursor/rules/*.mdc\n.cursorrules', strength: '日常的なコーディング、ルールベースの差分編集', env: 'Cursor エディタ' },
  { tool: 'Gemini CLI', config: 'GEMINI.md\n.gemini/settings.json', strength: 'PR レビュー自動化、大規模コンテキスト処理', env: 'CLI / GitHub 連携' },
  { tool: 'GitHub Copilot', config: '.github/copilot-instructions.md', strength: 'インラインコード補完、Copilot Agent によるIssue対応', env: 'VS Code / JetBrains / CLI' },
  { tool: 'OpenAI Codex', config: 'AGENTS.md\ncodex.md', strength: 'クラウド環境での自律タスク、サンドボックス実行', env: 'CLI / VS Code Insiders' },
];

export default function MultiAICoexistence() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex justify-between items-center mb-4">
          <StepIndicator />
          <BookmarkButton />
        </div>

        <div className="mt-8 mb-12">
          <SectionBadge />
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            マルチ AI ツールの共存戦略
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
            Claude Code・Cursor・Gemini CLI・GitHub Copilot・Codex など、複数の AI コーディングツールを戦略的に使い分け、チーム全体の開発生産性を最大化するアーキテクチャ。
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {/* なぜマルチAI戦略か */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-[var(--claude-primary)] shrink-0" />
              なぜマルチ AI 戦略が必要か
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              2025-2026 年現在、AI コーディングツールは急速に進化しています。単一のツールに依存するのではなく、各ツールの強みを活かすハイブリッド戦略を採ることで、ベンダーロックインの回避、チーム内の柔軟な選択肢の確保、そして段階的な導入が可能になります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'ベンダーロックインの回避', desc: '特定ツールの料金改定・機能変更・サービス停止に左右されない体制を構築' },
                { label: '各ツールの強みを活用', desc: 'レビュー、日常コーディング、PR自動化など用途に応じて最適なツールを選択' },
                { label: 'チーム内の柔軟性', desc: 'メンバーの好みやプラン契約状況に応じて複数ツールを許容' },
                { label: '段階的な評価・導入', desc: '新ツールを既存環境に影響を与えず試験導入し、効果を検証' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-2">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 主要プレイヤーの比較 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <GitCompare className="text-[var(--claude-primary)] shrink-0" />
              主要 AI コーディングツールの比較
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              各ツールには固有の設定体系と得意領域があります。それぞれの特性を理解することが、効果的な使い分けの第一歩です。
            </p>

            {/* モバイル: カード表示 */}
            <div className="md:hidden space-y-4 mb-6">
              {toolData.map(item => (
                <div key={item.tool} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-[var(--claude-primary)] mb-3">{item.tool}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-foreground">設定ファイル:</span>
                      <p className="font-mono text-xs text-muted-foreground whitespace-pre-line mt-0.5">{item.config}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">得意領域:</span>
                      <p className="text-muted-foreground mt-0.5">{item.strength}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">実行環境:</span>
                      <p className="text-muted-foreground mt-0.5">{item.env}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* デスクトップ: テーブル表示 */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">ツール</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">設定ファイル</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">得意領域</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">実行環境</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {toolData.map(item => (
                    <tr key={item.tool} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 font-bold text-[var(--claude-primary)] whitespace-nowrap">{item.tool}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-pre-line">{item.config}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.strength}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{item.env}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InfoBox type="info" title="AGENTS.md の台頭">
              AGENTS.md はプロジェクトルートに配置するマークダウンファイルで、OpenAI Codex・GitHub Copilot・Cursor・Claude Code など複数ツールが自動的に読み取る「ツール横断型コンテキストファイル」として標準化が進んでいます。既存の各ツール固有ファイルと併用できます。
            </InfoBox>
          </section>

          {/* ハイブリッドアーキテクチャ */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="text-[var(--claude-primary)] shrink-0" />
              ハイブリッドアーキテクチャの設計
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              各ツールの設定ディレクトリを共存させつつ、共通ルールは一元管理するディレクトリ構成の実例です。
            </p>

            <CodeBlock language="text" code={`my-project/
├── AGENTS.md              # 全AIツールが参照
├── CLAUDE.md              # Claude Code 専用
├── .cursor/
│   ├── rules/             # Cursor ルール
│   └── skills/
├── .claude/
│   ├── settings.local.json
│   ├── commands/
│   └── skills/
├── .gemini/
│   └── config.yaml        # PR レビュー設定
├── .github/
│   └── copilot-instructions.md
└── .agents/               # 共通ルール（SSOT）
    └── rules/
        ├── base.md
        ├── coding-standards.md
        └── review-checklist.md`} />
          </section>

          {/* 機能分担パターン */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Workflow className="text-[var(--claude-primary)] shrink-0" />
              機能分担パターン
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              チーム内での典型的な役割分担パターンを紹介します。プロジェクトの特性やチーム構成に応じて組み合わせてください。
            </p>

            <div className="space-y-6">
              <div className="p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-base md:text-lg font-bold mb-4">パターン A: Cursor メイン + Claude Code レビュー</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Cursor で日常的なコーディングを行い、Claude Code で深いレビューや調査を実施する最も一般的な構成。
                </p>

                {/* モバイル: カード表示 */}
                <div className="md:hidden space-y-3">
                  {[
                    { phase: '実装', tool: 'Cursor', op: 'rules/ に基づく差分編集で高速コーディング' },
                    { phase: 'レビュー', tool: 'Claude Code', op: '/code-review スキルで品質チェック' },
                    { phase: '調査', tool: 'Claude Code', op: '/deep-research で技術選定・設計検討' },
                    { phase: '補完', tool: 'GitHub Copilot', op: 'インラインコード補完（常時有効）' },
                  ].map(item => (
                    <div key={item.phase} className="flex gap-3 text-sm">
                      <span className="font-bold text-foreground shrink-0 w-14">{item.phase}</span>
                      <div>
                        <span className="font-bold text-[var(--claude-primary)]">{item.tool}</span>
                        <p className="text-muted-foreground text-xs mt-0.5">{item.op}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* デスクトップ: テーブル表示 */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-sm">
                    <thead className="bg-white dark:bg-slate-900">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">フェーズ</th>
                        <th className="px-3 py-2 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">ツール</th>
                        <th className="px-3 py-2 text-left font-medium text-foreground border-b border-slate-200 dark:border-slate-800">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {[
                        ['実装', 'Cursor', 'rules/ に基づく差分編集で高速コーディング'],
                        ['レビュー', 'Claude Code', '/code-review スキルで品質チェック'],
                        ['調査', 'Claude Code', '/deep-research で技術選定・設計検討'],
                        ['補完', 'GitHub Copilot', 'インラインコード補完（常時有効）'],
                      ].map(([phase, tool, op]) => (
                        <tr key={phase} className="bg-white dark:bg-slate-900">
                          <td className="px-3 py-2 font-bold text-foreground whitespace-nowrap">{phase}</td>
                          <td className="px-3 py-2 font-bold text-[var(--claude-primary)] whitespace-nowrap">{tool}</td>
                          <td className="px-3 py-2 text-muted-foreground">{op}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-base md:text-lg font-bold mb-4">パターン B: Claude Code メイン + Gemini PR 自動レビュー</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Claude Code で設計からコーディングまでを一貫して行い、Gemini による自動 PR レビューを品質ゲートとして活用。
                </p>
                <CodeBlock language="yaml" code={`# .gemini/config.yaml
pull_request_opened:
  code_review:
    enabled: true
    language: ja
    focus:
      - security
      - performance
      - coding_standards`} />
                <CodeBlock language="bash" code={`# Claude Code での開発フロー
# tmux ペイン 1: 実装
claude "認証機能を実装して"

# tmux ペイン 2: テスト
claude "テストを書いて実行して"

# PR 作成 → Gemini が自動レビュー
gh pr create --title "feat: 認証機能"`} />
              </div>

              <div className="p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-base md:text-lg font-bold mb-4">パターン C: tmux マルチペインでの AI 協調</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  tmux のペインを活用して複数の AI ツールを同時に起動し、それぞれに異なる役割を割り当てる高度な構成。
                </p>
                <CodeBlock language="yaml" code={`# ~/.tmuxp/multi-ai-team.yaml
session_name: multi-ai
windows:
  - window_name: development
    layout: main-vertical
    panes:
      # Claude Code: 設計・実装
      - shell_command:
          - cd ~/project
          - claude
      # Gemini CLI: 並行調査
      - shell_command:
          - cd ~/project
          - gemini
  - window_name: review
    layout: even-horizontal
    panes:
      - shell_command:
          - cd ~/project
          - claude "/code-review"
      - shell_command:
          - cd ~/project`} />
              </div>
            </div>
          </section>

          {/* スキルの共通化 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Boxes className="text-[var(--claude-primary)] shrink-0" />
              スキルの共通化
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              レビューチェックリストやコーディング規約を Claude Code と Cursor で共有するスキル共通化の手法です。同じ品質基準でレビューを行いつつ、ツール固有の微調整のみ分離します。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-3">共通スキルの定義例: code-review</h3>
                <CodeBlock language="markdown" code={`<!-- .claude/skills/code-review/SKILL.md -->
# コードレビュースキル

## チェックリスト
- [ ] 型安全性: any の使用がないか
- [ ] エラーハンドリング: 適切な例外処理
- [ ] セキュリティ: XSS・SQLi・CSRF
- [ ] パフォーマンス: N+1・再レンダリング
- [ ] テスト: カバレッジと境界値
- [ ] 命名規約: プロジェクト規約準拠

## 出力形式
1. 重要度（Critical / Warning / Info）
2. 該当箇所（ファイル:行番号）
3. 問題の説明
4. 修正案`} />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold mb-3">Cursor 版のスキル（同一チェックリスト）</h3>
                <CodeBlock language="markdown" code={`<!-- .cursor/skills/code-review/SKILL.md -->
# コードレビュースキル

（チェックリストは .claude/skills/ と同一内容）

## Cursor 固有の設定
- Apply 機能で差分を直接適用
- rules/ の規約ファイルを参照して判定`} />
              </div>

              <InfoBox type="info" title="スキルの同期">
                チェックリスト本体を <code>.agents/rules/review-checklist.md</code> に一元配置し、各ツールの SKILL.md から参照する構成にすると、更新漏れを防げます。詳細は次ページの「シングルソースオブトゥルース設計」を参照してください。
              </InfoBox>
            </div>
          </section>

          {/* 段階的導入ガイド */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Repeat className="text-[var(--claude-primary)] shrink-0" />
              段階的導入ガイド
            </h2>
            <p className="leading-relaxed mb-6 text-muted-foreground">
              いきなり全ツールを導入するのではなく、段階的に拡張していくアプローチを推奨します。
            </p>

            <div className="space-y-4">
              {[
                {
                  phase: 'Phase 1: 基盤構築',
                  items: [
                    'メインツール（例: Cursor）の rules/ を整備',
                    'AGENTS.md をプロジェクトルートに配置',
                    'CLAUDE.md に Claude Code 固有の指示を記述',
                  ],
                },
                {
                  phase: 'Phase 2: レビュー層の追加',
                  items: [
                    'Claude Code の /code-review スキルを導入',
                    'Gemini の PR 自動レビューを設定',
                    'Copilot の copilot-instructions.md を配置',
                  ],
                },
                {
                  phase: 'Phase 3: ルールの一元管理',
                  items: [
                    '.agents/rules/ に共通ルールソースを集約',
                    'シンボリックリンクまたはビルドスクリプトで配信',
                    'CI でルールの整合性チェックを自動化',
                  ],
                },
                {
                  phase: 'Phase 4: チーム展開',
                  items: [
                    'チームメンバーのツール選択の自由を確保',
                    'tmux マルチペインによる協調ワークフロー',
                    'スキルの改善サイクルを確立（rules-to-skills）',
                  ],
                },
              ].map(({ phase, items }) => (
                <div key={phase} className="p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <h4 className="font-bold text-sm text-[var(--claude-primary)] mb-3">{phase}</h4>
                  <ul className="space-y-1">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-[var(--claude-primary)] mt-0.5 shrink-0">-</span>
                        <span className="break-words min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <InfoBox type="warning" title="注意事項">
              各ツールの設定ファイルには API キーやトークンが含まれる場合があります。<code>.gitignore</code> で <code>settings.local.json</code> や環境変数ファイルを除外し、機密情報がリポジトリにコミットされないよう注意してください。
            </InfoBox>
          </section>
        </div>

        <CodingChallenge
            preview
            previewType="terminal"
            title="マルチ AI ハイブリッド環境を構築しよう"
            description="Claude Code と他の AI ツールを共存させるディレクトリ構成と、tmuxp によるマルチ AI チーム構成を書いてください。"
            initialCode={`# マルチ AI ツール共存の設定\n\n# 1. ディレクトリ構成を作成:\nmkdir -p .claude/commands\nmkdir -p .cursor/rules\nmkdir -p .github\n\n# 2. AGENTS.md を作成（全ツール共通）:\n# （プロジェクト概要とコーディング規約を書く）\n\n# 3. CLAUDE.md を作成（Claude Code 固有）:\n# （AGENTS.md 参照の指示を書く）\n\n# 4. tmuxp 設定（マルチAIチーム）:\n# ~/.tmuxp/multi-ai-team.yaml\n# （Claude Code と他ツールのペイン構成を書く）`}
            answer={`# マルチ AI ツール共存の設定\n\n# 1. ディレクトリ構成を作成:\nmkdir -p .claude/commands\nmkdir -p .cursor/rules\nmkdir -p .github\nmkdir -p .agents/rules\n\n# 2. AGENTS.md を作成（全ツール共通）:\ncat > AGENTS.md << 'EOF'\n# プロジェクトルール\n## コーディング規約\n- TypeScript strict モード\n- any 型の使用禁止\n- 関数コンポーネント + hooks\nEOF\n\n# 3. CLAUDE.md を作成（Claude Code 固有）:\ncat > CLAUDE.md << 'EOF'\nAGENTS.md の規約に従ってください。\n## 追加コンテキスト\n- Subagents で並列調査\n- 編集前に必ず Read で確認\nEOF\n\n# 4. tmuxp 設定（マルチAIチーム）:\n# session_name: multi-ai\n# windows:\n#   - window_name: development\n#     panes:\n#       - claude\n#       - gemini`}
            hints={[
              'AGENTS.md は全 AI ツールが自動認識する共通コンテキストファイルです',
              'CLAUDE.md には Claude Code 固有の指示のみ記述します',
              '.agents/rules/ に共通ルールソースを集約する構成が推奨されます',
            ]}
            keywords={['AGENTS.md', 'CLAUDE.md', '.agents/rules', 'mkdir', 'tmuxp']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
