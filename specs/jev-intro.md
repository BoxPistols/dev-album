# specs/jev-intro.md — Jev（System One モデル）入門セクション

## 概要

AI・ML マニュアルに「Jev / System One モデル」セクションを新設する。Jev は TypeSafe AI が 2026-09-15 に公開した、
文章を生成せず、状態（state）に対する型付きの質問（noul / choice / score）へ確率値で答えるモデル。
「ゼロからの解説 → 環境構築 → 基礎知識 → 設計 → サンプルアプリ → 応用」の流れを、他の講座と同じ構成で扱う。

## 入力

- マニュアル: `ai-ml`、sectionId: `jev`（LMOps の後ろ）
- 追加ページ（step は既存末尾の直後・連番）:
  1. `/ai-ml/jev/jev-overview` Jev とは（System One モデルの位置づけ、LLM との違い）
  2. `/ai-ml/jev/jev-setup` 開発環境の構築（API キー、Node / Python SDK、最初の呼び出し）
  3. `/ai-ml/jev/jev-primitives` 3 つの質問型と確率の読み方（noul / choice / score）
  4. `/ai-ml/jev/jev-state-design` state と質問の設計、複数質問の一括評価、エラーとリトライ
  5. `/ai-ml/jev/jev-app-ideas` サンプルアプリのアイデア 20（概要のみ。講座で作る 3 本を明示）
  6. `/ai-ml/jev/jev-triage-app` サンプルアプリ 1: サポートチケットのトリアージ（Next.js Route Handler + React UI）
  7. `/ai-ml/jev/jev-moderation-app` サンプルアプリ 2: 投稿のモデレーション（noul + score、レビュー待ちキュー、フェイルクローズ）
  8. `/ai-ml/jev/jev-alerts-app` サンプルアプリ 3: アラートの優先度付け（配列 state の一括評価、score で並べ替え）
  9. `/ai-ml/jev/jev-advanced` 応用: 信頼度ゲート、LLM との組み合わせ、評価、制約

## 処理フロー

1. `client/src/lib/navigation.ts` に SectionInfo 1 件 + PageInfo 9 件を追加
2. `client/src/lib/navigation.test.ts` の総ページ数・ai-ml のページ数を更新
3. `client/src/App.tsx` に lazy import + Route を 9 件追加
4. `client/src/pages/ai-ml/jev/*.tsx` を作成（既存 ai-ml ページの構造に準拠）
5. `client/src/pages/ai-ml/Home.tsx` のカリキュラムカードに 1 件追加
6. `client/src/lib/searchIndex.ts` に検索キーワードを追加
7. `client/src/data/sources.ts` に出典を登録（公式 SDK の型定義 / OpenAPI 由来スキーマは手元で展開して実測扱い、PyPI の README は逐語引用）
8. `client/src/data/announcements.ts` の先頭にお知らせを追加（1 ページ 1 件）

## エッジケース

- 公式サイト（typesafe.ai / docs.typesafe.ai）は執筆環境から取得できない → API の形は公式 SDK（npm `@typesafe-ai/sdk` 0.6.0、PyPI `typesafe-sdk` 0.7.0）に同梱された型定義と OpenAPI 生成スキーマを一次情報とし、再現コマンドを出典に残す
- 料金・応答時間は変動する → 数値を本文に固定せず、公式の料金ページで確認するよう書く。二次情報の数値は載せない
- API 呼び出しはブラウザから行えない（SDK が既定で拒否する）→ プレビュー付き CodingChallenge はモックの応答オブジェクトで UI 側の判定ロジックだけを扱う
- Python / シェルのコードは実行プレビューできない → 静的 `CodeBlock`、または `preview={false}` の CodingChallenge を使う

## 出力

- 正常系: 新セクションがサイドバーに表示され、9 ページが 3 テーマで描画・相互リンクする。TOP の「最新のお知らせ」に 9 件が出る
- アイデア一覧は「できること」を 1 行で示すだけに留め、コードは載せない。実装は 3 本のサンプルアプリのページに置く

## 完了条件（検証可能な形で）

- [ ] `pnpm check`（型）緑
- [ ] `pnpm test`（navigation カウント・link-integrity・sources・editor-validation・theme-contrast 含む）緑
- [ ] `pnpm build` 成功
- [ ] 本文の API 仕様の記述が、出典に登録した SDK の型定義 / スキーマと一致する
