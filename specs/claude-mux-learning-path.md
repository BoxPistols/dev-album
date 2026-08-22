# specs/claude-mux-learning-path.md — Claude Code マニュアルの学習パス再編

## 概要

Claude Code マニュアル（claude-mux、現行 41 ページ）を「基礎 → 日常ワークフロー → カスタマイズ → 自動化 → 検証」の段階的な学習パスに再編する。構成の設計判断は公式ラーニングパス（Claude Academy: https://academy.claude.com/ja/courses/claude-code-101 ほか）のカリキュラムを参考にし、**本文の根拠はすべて公式ドキュメント（https://code.claude.com/docs/）と実機検証で取る**。Academy の本文は転載しない（ライセンス上、再利用には個別交渉が必要。参照は各ページ末尾のフルパス URL リンクのみ）。

3 段階すべて 2026-08-22 に完了。

| 段階 | 内容 | 状態 |
|---|---|---|
| 1 | 12 ページを公式 docs + 実機 v2.1.239 で照合し、古い記述を修正 | 完了（誤り 6 件を修正） |
| 2 | 欠落していた 4 ページを追加 | 完了（41 → 45 ページ） |
| 3 | 公式カリキュラム順への再編 | 完了（MCP を agent-extensions の後ろへ） |
| 4 | 公式機能の網羅チェックと穴埋め | 完了（45 → 47 ページ） |

### 段階 4: 網羅チェック（実施済み）

公式ドキュメントの主要機能 38 項目を機械的に走査し（`grep -ril` でページ本文を照合）、教材で扱っていないものを洗い出した。結果、4 件の欠落を確認:

| 機能 | 判断 | 対応 |
|---|---|---|
| `.claude/rules/`（パス固有ルール） | 学習パスの中核。CLAUDE.md と並ぶ指示の置き場所 | 新ページ `claude-core/project-rules` |
| Claude in Chrome / computer use | 「検証」の実行手段そのもの。前ページから直結 | 新ページ `best-practices/browser-verification` |
| Cross-session messaging | Agent Teams の隣接機能。単独ページにすると分断される | 既存 `agent-orchestration` に節を追記 |
| Status line / OpenTelemetry | 前者は表示のカスタマイズ、後者は管理者向け。学習パスの本筋ではない | 対象外（本仕様の範囲に含めない） |

**走査の限界**: この照合は grep ベースなので、「言及はあるが実質的に扱っていない」ページを ok と誤判定しうる。実際 Chrome は既存ページのチェックリスト 1 行にだけ現れており、件数だけ見れば ok に近かった。件数ではなく**出現箇所を目視**して判断した。

## 入力

- 既存ページ: `client/src/pages/claude-mux/`（13 ディレクトリ・41 ページ）
- ナビゲーション正本: `client/src/lib/navigation.ts`（claude-mux セクション）
- 参考カリキュラム: Claude Academy「Claude Code 101」「実践Claude Code」「エージェントスキル入門」「サブエージェントの概要」（構成のみ参照）
- 事実の一次情報: https://code.claude.com/docs/ の各リファレンス + 実機 `claude` CLI

## 処理フロー

### 段階 2: 欠落ページの追加（新規 4 ページ）

公式カリキュラムにあって現行マニュアルに無いもの。優先度順。

1. **探索 → 計画 → コード → コミットのワークフロー**（`claude-core/explore-plan-code-commit`）
   - 公式が「最初のプロンプト」直後に教える日常の型。plan mode（Shift+Tab）、Explore/Plan サブエージェント、コミットまでの一連の流れ
   - 一次情報: https://code.claude.com/docs/en/common-workflows / permission-modes / how-claude-code-works
   - 配置: claude-core セクションの先頭（コンテキスト管理の前）
2. **検証スキル — 無監督実行を信頼する**（`best-practices/verification-and-trust`）
   - 長時間の自律実行の結果をどう検証するか。テスト・型・実描画での裏取り、`/diff` レビュー、チェックポイント
   - 一次情報: https://code.claude.com/docs/en/best-practices / checkpointing / ultrareview
   - dev-album 全体の「実測主義」と接続する（ビルドグリーン ≠ 正しい描画）
3. **Permission modes**（`claude-core/permission-modes`）
   - default / acceptEdits / plan / bypassPermissions / auto の使い分け。Shift+Tab 切替、settings.json の permissions（allow / ask / deny）との関係
   - 一次情報: https://code.claude.com/docs/en/permission-modes / permissions
   - 既存 security-permissions から permission mode 部分を移して拡充（重複させない）
4. **Skills 深掘り**（`agent-extensions/skills-deep-dive`）
   - 現行は「Skills・コマンド・Hooks」1 ページに圧縮。公式は 6 レッスンの独立コース
   - 作成 → 設定と複数ファイル（scripts/ 併置）→ 他機能（subagent / hook / MCP）との使い分け → 共有（プラグイン化）→ トラブルシューティング
   - 一次情報: https://code.claude.com/docs/en/skills
   - 既存 CustomSkills はコマンド・Hooks の入口として残し、相互リンク

各ページ共通:
- `specs/README.md` の 6 フェーズに従う。実装前に本仕様を更新してページ単位の詳細を書く
- VerifiedBox（verifiedAt / platform / officialDocs）をページ先頭に置く
- 末尾に「参考リンク」節: 公式 docs のフルパス URL + Academy 該当コースのフルパス URL（リンクのみ）
- CodingChallenge は keyword 対応ヒント（1 keyword = 1 hint）
- `navigation.ts` / `App.tsx` ルート / `navigation.test.ts` 期待値 / `announcements.ts` を同 PR で更新

### 段階 3: 順序再編（実施済み）

公式の進行に合わせ、claude-mux の basic パートを並び替えた。**判断の根拠**: 公式の 2 情報源（`features-overview` の並び「CLAUDE.md → Skills → MCP → Subagents → Hooks」と、Claude Code 101 のカスタマイズ章「CLAUDE.md → サブエージェント → Skills → MCP → Hooks」）は Subagents の位置で食い違うが、**Skills が MCP より前**・**Hooks が最後**の 2 点では一致する。旧構成は MCP が Skills / Subagents より前にあり両方に反していたため、`mcp` セクションを `agent-extensions` の後ろへ移した。

再編後の basic パート:

1. getting-started（現状維持）
2. claude-intro: 概要 → インストール → スラッシュコマンド（現状維持）
3. claude-core: **explore-plan-code-commit（新）** → context-management → context-engineering → **permission-modes（新）** → security-permissions → token-optimization → extended-thinking
4. agent-extensions: subagents → custom-skills → **skills-deep-dive（新）**
5. mcp（CLAUDE.md → subagents → skills → MCP → hooks の公式順に合わせ、agent-extensions の後ろへ移動）
6. 以降（ai-coding-agents / cmux / reference / advanced パート）は現状維持。best-practices に **verification-and-trust（新）** を追加

制約（すべて遵守済み）:
- 既存 URL は変えない（step 番号と表示順のみ変更）。ページの物理移動はしない
- `navigation.test.ts` の期待値（総ページ数 337 / claude-mux 45）を同 PR で更新
- 並び替えと新規追加はコミットを分ける（レビュー可能な粒度）

## エッジケース

- Academy のコース構成が変わる → 本仕様の参照は「参考」であり追随義務はない。事実の正本は公式 docs
- 公式 docs の記述と実機の挙動が食い違う → 実機を優先し、バージョン付きで「実測では」と書く（仕様値 vs 実測値ギャップの明示ルール）
- 新ページが既存ページと内容重複する → 正本を 1 箇所に決め、他方は要約 + リンクに落とす（SSOT）
- experimental 機能（Agent Teams / agent hooks / --teammate-mode 等）→ experimental であることと確認バージョンを本文に明記

## 出力

- 正常系: 45 ページ（41 + 新規 4）の claude-mux マニュアル。basic パートが公式ラーニングパス準拠の順序になり、各ページが VerifiedBox と公式リンクを持つ
- テスト: `navigation.test.ts`（ページ数・step 連番）、`link-integrity.test.ts`（announcements リンク）、`editor-validation.test.ts`（チャレンジのトランスパイル）がすべて緑
