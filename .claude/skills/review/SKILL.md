---
name: review
description: 現在のブランチの PR または未コミット変更をコードレビューする
---

## 手順

1. `gh pr list` でオープン PR を確認
2. PR がある場合: `gh pr view` + `gh pr diff` で差分を取得
3. PR がない場合: `git diff --stat` で未コミット変更をレビュー
4. 以下の観点で分析:
   - コードの正確性
   - プロジェクト規約（CLAUDE.md の禁止パターン）への準拠
   - パフォーマンス影響
   - テストカバレッジ
   - セキュリティ（iframe sandbox, CDN URL, XSS）
5. 結果をセクション分けで報告
