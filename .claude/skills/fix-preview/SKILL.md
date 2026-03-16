---
name: fix-preview
description: CodingChallenge や CodePreview のプレビューエラーを調査・修正する
---

## 手順

1. ユーザーが報告した URL のページファイルを特定
2. CodingChallenge の `initialCode` / `answer` を抽出
3. `resolvePreviewType()` で判定タイプを確認
4. JSX タイプの場合: Sucrase でトランスパイルを試行
5. エラーがあれば修正:
   - `/* */` コメント → `// ` に変更
   - `{// comment}` → `{/* comment */}` に修正
   - 不完全な式（`= // ...`）→ プレースホルダ値に修正
   - `function App()` がない → App コンポーネントを追加
6. `editor-validation.test.ts` に該当コードのテストを追加
7. ビルド + テスト通過を確認

## 参照

- `client/src/lib/preview.ts`: buildPreviewHtml, detectComponentName
- `client/src/components/CodingChallenge.tsx`: resolvePreviewType, detectLanguage
- `client/src/lib/editor-validation.test.ts`: 全チャレンジ検証テスト
