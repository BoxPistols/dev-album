デプロイ前の最終チェックを実行してください。

1. `npm run build` でビルド成功を確認
2. `npx vitest run` で全 Unit テスト通過を確認
3. `npx playwright test` で全 E2E テスト通過を確認
4. `git status` で未コミットファイルがないか確認
5. `vercel.json` の buildCommand / outputDirectory が正しいか確認
6. 結果を報告
