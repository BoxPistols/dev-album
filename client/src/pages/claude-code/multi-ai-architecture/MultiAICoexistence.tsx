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
  { tool: 'Cursor', config: '.cursor/rules/*.mdc\nAGENTS.md\n（.cursorrules はレガシー・非推奨）', strength: '日常的なコーディング、ルールベースの差分編集', env: 'Cursor エディタ' },
  { tool: 'Gemini CLI', config: 'GEMINI.md\n.gemini/settings.json', strength: 'ターミナルでの並行調査、大規模コンテキスト処理', env: 'CLI' },
  { tool: 'Gemini Code Assist (GitHub)', config: '.gemini/config.yaml\n.gemini/styleguide.md', strength: 'PR の自動レビュー・サマリー', env: 'GitHub アプリ（Gemini CLI とは別製品）' },
  { tool: 'GitHub Copilot', config: '.github/copilot-instructions.md', strength: 'インラインコード補完、Copilot Agent によるIssue対応', env: 'VS Code / JetBrains / CLI' },
  { tool: 'OpenAI Codex', config: 'AGENTS.md\nAGENTS.override.md\n~/.codex/config.toml', strength: 'クラウド環境での自律タスク、サンドボックス実行', env: 'CLI / VS Code Insiders' },
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

            <InfoBox type="info" title="AGENTS.md はツール横断の取り決め">
              AGENTS.md はプロジェクトルートに配置するマークダウンファイルで、公式サイトはこれを
              「エージェント向けの README」と説明しています。Codex・Cursor・Gemini CLI・GitHub Copilot・
              Zed・opencode など多数のツールが対応を表明しており、既存のツール固有ファイルと併用できます。
              モノレポではパッケージごとに置け、ディレクトリツリー上で最も近いものが優先されます。
            </InfoBox>

            <InfoBox type="warning" title="Claude Code は AGENTS.md を自動では読まない">
              Claude Code の公式ドキュメントは
              <span className="font-semibold">「Claude Code reads CLAUDE.md, not AGENTS.md.」</span>
              と明記しています。読ませたい場合は CLAUDE.md に <code>@AGENTS.md</code> と書いて
              import するか、<code>ln -s AGENTS.md CLAUDE.md</code> でシンボリックリンクを張ります
              （Windows はシンボリックリンクに管理者権限が要るため import が推奨）。
              「置けばどのツールも読んでくれる」と考えると、規約が効いていないことに気づけません。
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
                    { phase: '調査', tool: 'Claude Code', op: '/deep-research（バンドル済みワークフロー）で技術選定の根拠を出典付きで集める' },
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
                        ['調査', 'Claude Code', '/deep-research（バンドル済みワークフロー）で技術選定の根拠を出典付きで集める'],
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
                <h3 className="text-base md:text-lg font-bold mb-4">パターン B: Claude Code メイン + Gemini Code Assist の PR 自動レビュー</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Claude Code で設計からコーディングまでを一貫して行い、Gemini Code Assist on GitHub による自動 PR レビューを品質ゲートとして活用。PR レビューの設定先はリポジトリ直下の <code>.gemini/config.yaml</code> で、Gemini CLI の設定ファイル <code>.gemini/settings.json</code> とは製品も書式も別です。
                </p>
                <CodeBlock language="yaml" code={`# .gemini/config.yaml
code_review:
  disable: false
  comment_severity_threshold: MEDIUM
  max_review_comments: -1
  pull_request_opened:
    help: false
    summary: true
    code_review: true
    include_drafts: false`} />
                <CodeBlock language="bash" code={`# Claude Code での開発フロー
# ターミナルタブ 1: 実装
claude "認証機能を実装して"

# ターミナルタブ 2: テスト
claude "テストを書いて実行して"

# PR 作成 → Gemini が自動レビュー
gh pr create --title "feat: 認証機能"`} />
              </div>

              <div className="p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <h3 className="text-base md:text-lg font-bold mb-4">パターン C: マルチターミナルでの AI 協調</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  複数のターミナルタブ（または cmux のワークスペース）で複数の AI ツールを同時に起動し、それぞれに異なる役割を割り当てる高度な構成。
                </p>
                <CodeBlock language="bash" code={`# タブ 1: Claude Code — 設計・実装
cd ~/project && claude
> 認証機能を設計して実装して

# タブ 2: Gemini CLI — 並行調査（無料枠を活用）
cd ~/project && gemini
> このライブラリの最新の破壊的変更を調べて

# タブ 3: Claude Code — レビュー専任
cd ~/project && claude "/code-review"

# cmux を使う場合は 1 ワークスペース = 1 エージェントで割り当て、
# 通知リングで入力待ちのエージェントを見分ける`} />
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
                <h3 className="text-lg md:text-xl font-bold mb-3">Cursor 側のスキル</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Cursor のプロジェクトスキルは <code>.cursor/skills/</code>（または <code>.agents/skills/</code>）に置きます。Cursor は互換のため <code>.claude/skills/</code> も読み込むので、上の SKILL.md はそのまま Cursor でも使えます。Cursor だけに効かせたい調整があるときだけ、別名のスキルを <code>.cursor/skills/</code> に足します。
                </p>
                <CodeBlock language="markdown" code={`<!-- .cursor/skills/code-review-apply/SKILL.md -->
---
name: code-review-apply
description: code-review の指摘を Cursor で差分適用するときに使う
---

.claude/skills/code-review/SKILL.md のチェックリストで判定し、
修正案は Apply で差分として適用する。`} />
              </div>

              <InfoBox type="info" title="スキルの同期">
                チェックリスト本体は <code>.claude/skills/code-review/SKILL.md</code> の 1 箇所に置き、Cursor には互換読み込みで届けます。ツール横断の規約そのものは <code>AGENTS.md</code> に、Claude Code だけに効かせたい分割ルールは <code>.claude/rules/</code> に置くと、更新箇所が 1 つに定まります。次ページの「シングルソースオブトゥルース設計」で使う <code>.agents/rules/</code> はプロジェクト側で決める正本の置き場で、どのツールも自動では読みません。シンボリックリンクやスクリプトで各ツールの設定ファイルへ配信して初めて効きます。
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
                    'Gemini Code Assist (GitHub) の PR 自動レビューを .gemini/config.yaml で設定',
                    'Copilot の copilot-instructions.md を配置',
                  ],
                },
                {
                  phase: 'Phase 3: ルールの一元管理',
                  items: [
                    'AGENTS.md を共通ルールの正本にし、Claude Code 固有の分割ルールは .claude/rules/ へ',
                    'シンボリックリンクまたはビルドスクリプトで配信',
                    'CI でルールの整合性チェックを自動化',
                  ],
                },
                {
                  phase: 'Phase 4: チーム展開',
                  items: [
                    'チームメンバーのツール選択の自由を確保',
                    'マルチターミナル（タブ / cmux）による協調ワークフロー',
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
            description="Claude Code と他の AI ツールを共存させるディレクトリ構成と、共通コンテキストファイルの設定を書いてください。"
            initialCode={`# マルチ AI ツール共存の設定\n\n# 1. ディレクトリ構成を作成:\nmkdir -p .claude/commands\nmkdir -p .cursor/rules\nmkdir -p .github\nmkdir -p .claude/rules\n\n# 2. ___ を作成（全ツール共通）:  # ← ここを埋める\ncat > ___ << 'EOF'  # ← ここを埋める\n# プロジェクトルール\n## コーディング規約\n- TypeScript strict モード\nEOF\n\n# 3. ___ を作成（Claude Code 固有）:  # ← ここを埋める\ncat > ___ << 'EOF'  # ← ここを埋める\n@AGENTS.md\n\n## Claude Code 固有\n- Subagents で並列調査\nEOF`}
            answer={`# マルチ AI ツール共存の設定\n\n# 1. ディレクトリ構成を作成:\nmkdir -p .claude/commands\nmkdir -p .cursor/rules\nmkdir -p .github\nmkdir -p .claude/rules\n\n# 2. AGENTS.md を作成（全ツール共通）:\ncat > AGENTS.md << 'EOF'\n# プロジェクトルール\n## コーディング規約\n- TypeScript strict モード\n- any 型の使用禁止\n- 関数コンポーネント + hooks\nEOF\n\n# 3. CLAUDE.md を作成（Claude Code 固有）:\ncat > CLAUDE.md << 'EOF'\n@AGENTS.md\n\n## Claude Code 固有\n- Subagents で並列調査\n- 編集前に必ず Read で確認\nEOF\n\n# 4. マルチ AI チームの起動（ターミナルタブを分けて並行運用）:\n# タブ 1: claude   （設計・実装）\n# タブ 2: gemini   （並行調査）`}
            hints={[
              'AGENTS.md は対応を表明した各ツールが読むツール横断のファイルです',
              'Claude Code は AGENTS.md を自動では読まないので、CLAUDE.md から @AGENTS.md で import します',
            ]}
            keywords={['AGENTS.md', 'CLAUDE.md']}
          />

        <PageNavigation />
      </div>
    </div>
  );
}
