---
name: test
description: Unit テスト（vitest）と E2E テスト（Playwright）を実行し、失敗があれば修正を試みる
---

## 手順

1. `npx vitest run` で Unit テストを実行
2. `npx playwright test` で E2E テストを実行（dev サーバーが必要）
3. 失敗したテストがあれば:
   - エラーメッセージを分析
   - 原因を特定（コード変更 / テスト期待値の不整合 / 環境問題）
   - 修正案を提示し、確認後に修正
4. 再度テストを実行して全通過を確認

## テスト構成

- Unit: `client/src/lib/*.test.ts`（176 テスト）
- E2E: `e2e/*.spec.ts`（14 テスト）
- E2E は dev サーバー（port 3000）が必要。`playwright.config.ts` で自動起動設定あり。
