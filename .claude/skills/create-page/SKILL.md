---
name: create-page
description: 新しい教材ページを作成する（ルーティング・ナビゲーション・テスト込み）
---

## 手順

1. `client/src/lib/navigation.ts` にセクション（必要なら）とページ定義を追加
2. `client/src/App.tsx` に lazy import + Route を追加
3. ページファイルを作成:
   - `client/src/pages/{manual}/{section}/{PageName}.tsx`
   - 既存ページのパターンに準拠（step-badge, PageNavigation 等）
4. ページに含めるべき要素:
   - CodeBlock / CodePreview（視覚プレビュー付き）
   - CodingChallenge（`preview={true}` で initialCode は有効な JSX）
   - Quiz（選択式クイズ）
   - InfoBox（補足情報）
   - PageNavigation（ページ下部）
5. `navigation.test.ts` のページ数期待値を更新
6. ビルド + テスト通過を確認

## 禁止パターン（CLAUDE.md 参照）

- `/* */` コメントを CodingChallenge の initialCode 内で使わない
- `text-black` / `bg-white` を直接使わない（CSS 変数を使用）
- ポエム調のコピーを避ける
