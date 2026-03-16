---
name: build-check
description: ビルド + 型チェック + テストを一括実行し、デプロイ可能か確認する
---

## 手順

1. `npm run build` でプロダクションビルド
2. `npx vitest run` で Unit テスト
3. 結果を報告:
   - ビルド成功/失敗
   - テスト通過数/失敗数
   - 失敗がある場合はエラー内容を提示
