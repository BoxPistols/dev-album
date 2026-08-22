---
name: test
description: Unit テスト（vitest）と E2E テスト（Playwright）を実行し、失敗があれば修正を試みる
---

## 手順

1. `pnpm test` で Unit テストを実行
2. `pnpm test:e2e` で E2E テストを実行（dev サーバーが必要）
3. 失敗したテストがあれば:
   - エラーメッセージを分析
   - 原因を特定（コード変更 / テスト期待値の不整合 / 環境問題）
   - 修正案を提示し、確認後に修正
4. 再度テストを実行して全通過を確認

## テスト構成

- Unit: `client/src/lib/*.test.ts`
- E2E: `e2e/*.spec.ts`（a11y 含む）
- dev サーバーは `playwright.config.ts` が自動起動する。既定ポートは 3400 で、その値を `webServer.env` 経由で dev サーバへ渡している（`pnpm dev` 単体の既定は乱数なので、渡さないと待ち受け側とずれてハングする）。3400 が他プロジェクトに使われていると誤ったサーバを再利用するので、その場合は `PORT=3401 pnpm test:e2e` のように空きポートを明示する。
