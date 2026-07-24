<!--
  PR テンプレート。不要なセクションは削除して構いません。
  タイトルは「何を変えたか」が一目で分かる日本語で（例: React マニュアルに Suspense のページを追加）。
-->

## 概要

<!-- この PR で何を・なぜ変えるかを 1〜2 文で。 -->

## 変更内容

<!-- 主な差分を箇条書きで。 -->
-

## 種別

<!-- 該当するものに x を入れてください（複数可）。 -->
- [ ] feature（新ページ・新機能）
- [ ] update（既存ページ・機能の更新）
- [ ] fix（誤記・バグ修正）
- [ ] chore（設定・依存・CI など、教材本文以外）

## 関連 Issue

<!-- 例: Closes #123 / Refs #123 -->

## チェックリスト

- [ ] `pnpm check`（型チェック）が通る
- [ ] `pnpm test`（Unit テスト）が通る
- [ ] `pnpm build`（ビルド）が通る
- [ ] 教材ページの追加・更新・修正を含む場合、`client/src/data/announcements.ts` の `ANNOUNCEMENTS` 先頭にエントリを追加した
- [ ] `text-black` / `bg-white` などのハードコード色を使わず、テーマトークン（`text-foreground` / `bg-card` 等）を使っている
- [ ] コミットメッセージは日本語・簡潔（`Co-Authored-By` / 絵文字 / `Generated with Claude Code` を含めない）

## スクリーンショット / 動作確認

<!-- 見た目の変更がある場合は before / after を添付してください。 -->
