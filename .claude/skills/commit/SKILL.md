---
name: commit
description: 変更内容を分析し、日本語で適切なコミットメッセージを生成して commit する
---

## 手順

1. `git status` で変更ファイルを確認
2. `git diff --staged` と `git diff` で変更内容を分析
3. 変更の種類を判定（feature / fix / refactor / docs / test）
4. 日本語で簡潔なコミットメッセージを生成
5. 対象ファイルを `git add` でステージング（`git add .` は使わない）
6. `git commit` を実行

## ルール

- コミットメッセージは日本語
- 絵文字、`Co-Authored-By`、`Generated with Claude Code` を含めない
- push はしない（ユーザーが明示的に指示した場合のみ）
