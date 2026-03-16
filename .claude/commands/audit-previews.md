全ページの CodingChallenge プレビューが正常に動作するか検証してください。

1. `npx vitest run src/lib/editor-validation.test.ts` でトランスパイル検証
2. 失敗があれば原因を特定して修正
3. `npx playwright test` で E2E プレビュー表示テスト
4. 結果を報告（通過数 / 失敗数 / 修正内容）
