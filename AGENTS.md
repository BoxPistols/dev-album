# AGENTS.md

AI コーディングツール（Claude Code / Cursor / Copilot 等）**共通**の規約の正本（SSOT）。
ツール固有の指示は [CLAUDE.md](./CLAUDE.md)、アーキテクチャと設計判断は [DESIGN.md](./DESIGN.md)、
機能仕様は [specs/](./specs/) を参照。ここに書いた規約は全ツール・人間の共通基準とする。

## プロジェクト概要

- Web 開発の実践リファレンス教材（React 19 + TypeScript + Vite + Tailwind CSS 4 + wouter）。
- パッケージマネージャは **pnpm 固定**（`packageManager` フィールド）。npm/yarn を混在させない。

## ビルド・テスト・開発

```bash
pnpm install --frozen-lockfile   # 依存インストール（lockfile 厳守）
pnpm dev                         # 開発サーバ（Vite）
pnpm check                       # 型チェック（tsc --noEmit）
pnpm test                        # 単体テスト（Vitest）
pnpm test:a11y                   # a11y 検査（Playwright + axe-core, 3テーマ）
pnpm build                       # 本番ビルド
```

- CI は `型チェック → 単体テスト → ビルド` と、別ジョブで `a11y 検査`。**push 前にビルド + テスト通過を確認**する。

## コーディング規約

- TypeScript の `any` / `@ts-ignore` を使わない。
- コンポーネントは PascalCase、hooks は `use` プレフィックス、定数は UPPER_SNAKE_CASE。
- 単一責任（1 コンポーネント 1 責務）。副作用は hooks に分離。Props は必ず型定義。
- 色は CSS 変数トークンのみ（`text-foreground` / `bg-muted` 等）。`text-black`/`text-white`/`bg-white`/`bg-gray-*` の直接使用は禁止。
- ハードコードされた文字列（i18n 対象）・API キー/シークレットをコードに書かない。`console.log` を commit しない。

## テスト方針

- 単体テストは **Vitest**、E2E / a11y は **Playwright**。
- ロジック（純関数）は単体テスト、アクセシビリティは axe-core で 3 テーマ検査。
- UI/レイアウト・色を伴う変更は「ビルド緑」だけで判断しない。実描画（スクリーンショット or a11y 検査）で確認する。
- コントラスト等の数値は手計算せず、検算ツールで実測して ground truth を確定してから採用する。

## PR / コミット規約

- コミットメッセージは日本語・簡潔。`Co-Authored-By` / 絵文字 / 自動生成署名を含めない。
- 1 PR = 1 関心事。`git add .` より対象ファイルの明示を優先。
- PR は CI（verify + a11y）緑を確認してからマージ。Vercel プレビュー配信の pending / CodeRabbit の rate-limit は非ブロッキング。
- main へは直接コミットせず、feature ブランチ → PR → マージコミット方式。

## レビュー基準

- **正確性**: 事実主張（実測値・仕様）をツール出力で裏取りする。
- **アクセシビリティ**: WCAG AA、キーボード操作、色だけで情報を伝えない（アイコン + テキスト併用）。
- **保守性**: 過剰な抽象化・未依頼のリファクタをしない。共通化は 3 例目で抽出する。
- **セキュリティ**: 秘匿値をコード/記憶に残さない。GitHub Actions で untrusted な context 式を run に直挿ししない。

## 教材コンテンツ規約

- トーンはフラットで実用的（Progate / オライリー）。エモーショナルなコピー・ネガティブ訴求・クリシェを禁止。
- 教材ページの追加/更新時は `client/src/data/announcements.ts` の先頭にエントリを追加する。
- 「仕様値 vs 実測値」がズレる箇所は先に明示する（学習者が折れないため）。

## スペック駆動（新機能の進め方）

複数ページにまたがる機能・セクション追加は、まず [specs/](./specs/README.md) に仕様を書いてから実装する。
適用/非適用の判断基準と 6 フェーズのワークフローは `specs/README.md` を参照。
