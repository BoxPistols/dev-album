# specs/examples/manual-section.md（実例: 教材セクション追加）

これは実際に実装済みの「React マニュアル / テスト戦略セクション」を、スペック駆動の書式で
振り返って記した**参考例**。新しい教材セクションを追加するときの雛形として使う。

## 概要
React マニュアルにフロントエンドの「テスト戦略」セクション（5 ページ）を新設する。
テストを特定フレームワークに依存しない実践として教え、RTL のみを唯一の React 結合点として扱う。

## 入力
- マニュアル: `react`、part: `quality`、sectionId: `testing`
- 追加ページ（step は既存末尾の直後・連番）:
  概要 / Vitest 単体 / RTL コンポーネント / Playwright E2E / スナップショット

## 処理フロー
1. `client/src/lib/navigation.ts` に SectionInfo 1 件 + PageInfo 5 件を追加
2. `client/src/lib/navigation.test.ts` の総ページ数・マニュアル別ページ数を更新
3. `client/src/App.tsx` に lazy import + Route を 5 件追加
4. `client/src/pages/react/testing/*.tsx` を作成（既存ページの構造・コンポーネント API に準拠）
5. `client/src/lib/searchIndex.ts` に検索キーワードを追加
6. `client/src/data/announcements.ts` の先頭にお知らせを追加（1 ページ 1 件）

## エッジケース
- テストコードは実行プレビューできない → `CodingChallenge` ではなく静的 `CodeBlock` を使う
- repo が実施していない手法（RTL/スナップショット）→ 「このアプリは持たない」と正直に明示し外部例示にする（証拠規律）
- 共有ファイル（navigation/announcements 等）は競合点 → 並列実装時は 1 人が独占し、事後に重複を点検する

## 出力
- 正常系: 新セクションがナビに表示され、5 ページが 3 テーマで描画・相互リンクする

## 完了条件（検証可能な形で）
- [x] `pnpm check`（型）緑
- [x] `pnpm test`（navigation カウント・link-integrity 含む）緑
- [x] `pnpm build` 成功
- [x] `pnpm test:a11y` が新ページを含めて critical/serious 0（3 テーマ）
- [x] 各ページの証拠規律（実施していない手法を repo の実例と偽らない）を独立レビューで確認
