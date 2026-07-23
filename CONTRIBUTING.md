# Contributing — Dev Album

Dev Album への貢献ガイド。このリポジトリは Git フロー自動化を「教材として解説し、リポジトリ自身で実演する」ことを目指しています。教材で扱う labeler / stale / CODEOWNERS / CI / Dependabot は、この `.github/` 配下で実際に動いています。

## 開発の流れ

1. **ブランチを切る** — `main` へ直接 push しない。作業ごとにブランチを作る。
   - 命名例: `feature/react-suspense`、`fix/preview-badge`、`chore/ci-cache`
2. **変更する** — 下記のコマンドでローカル確認しながら進める。
3. **PR を出す** — テンプレートに沿って記入。`main` 相手にレビューを受けてマージ。

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## 確認コマンド（PR 前に通す）

| コマンド | 内容 |
|---------|------|
| `pnpm check` | 型チェック（`tsc --noEmit`） |
| `pnpm test` | Unit テスト（Vitest） |
| `pnpm build` | 本番ビルド |
| `pnpm format` | Prettier で整形 |

> 補足（仕様値 vs 実測値）: 教材ページの CI 例では `npm run typecheck` / `npm run lint` と書いていますが、このリポジトリの実スクリプトは `pnpm check`（型）で、専用の lint スクリプトは持ちません。**教材は「一般的な例」、この表は「実リポジトリの実測」**です。CI（`.github/workflows/ci.yml`）も実スクリプトに合わせています。

## コミットメッセージ

- 日本語・簡潔に（例: `React マニュアルに Suspense のページを追加`）。
- `Co-Authored-By` / 絵文字 / `Generated with Claude Code` を**含めない**。
- `git add .` より、対象ファイルを明示する。

## 教材ページを追加・更新したとき

`client/src/data/announcements.ts` の `ANNOUNCEMENTS` 配列の**先頭**にエントリを追加してください（TOP の「最新のお知らせ」に載ります）。

- `id`: `YYYY-MM-DD-kebab-case-slug`
- `category`: `feature`（新ページ）/ `update`（更新）/ `fix`（誤記）/ `release`（大型）
- `link`: 一覧ではなく、該当ページの最も具体的なパス

## ラベル

PR には `.github/labeler.yml` により変更パスからラベルが自動付与されます（`frontend` / `git-manual` / `ci` / `dependencies` など）。種類・優先度など自動で付かないものは手動で補ってください。

## レビューとマージ

- レビューを受けずに `main` へ入れない（自作自演マージをしない）。
- CI（型 / テスト / ビルド）が緑であることを、マージの前提にする。
- `.github/CODEOWNERS` で指名された担当のレビューを尊重する。

詳しい設計思想は、サイト内の **Git > フロー自動化** と **Git > GitHub Actions** を参照してください。
