# specs/jev-intro.md — Jev（System Oneモデル）入門セクション

## 概要

AI・MLマニュアルに「Jev / System Oneモデル」セクションを新設する。JevはTypeSafe AIが2026-09-15に公開した、
文章を生成せず、状態（state）に対する型付きの質問（noul / choice / score）へ確率値で答えるモデル。
「ゼロからの解説 → 環境構築 → 基礎知識 → 設計 → サンプルアプリ → 応用」の流れを、他の講座と同じ構成で扱う。

## 入力

- マニュアル: `ai-ml`、sectionId: `jev`（LMOpsの後ろ）
- 追加ページ（stepは既存末尾の直後・連番）:
  1. `/ai-ml/jev/jev-overview` Jevとは（System Oneモデルの位置づけ、LLMとの違い）
  2. `/ai-ml/jev/jev-account` アカウント登録とAPIキー・課金の準備（直接契約 / Vercel AI Gatewayの2ルート、疎通確認、予算上限）
  3. `/ai-ml/jev/jev-setup` 開発環境の構築（Node / Python SDK、最初の呼び出し）
  4. `/ai-ml/jev/jev-primitives` 3つの質問型と確率の読み方（noul / choice / score）
  5. `/ai-ml/jev/jev-state-design` stateと質問の設計、複数質問の一括評価、エラーとリトライ
  6. `/ai-ml/jev/jev-app-ideas` サンプルアプリのアイデア20（概要のみ。講座で作る3本を明示）
  7. `/ai-ml/jev/jev-triage-app` サンプルアプリ1: 問い合わせの選別（メールやチャットの典型例。Next.js Route Handler + React、choiceとnoulの基本形）
  8. `/ai-ml/jev/jev-chart-picker-app` サンプルアプリ2: UI文言チェッカー（デザイナー向け。指針をstateで渡す3分岐、フェイルクローズ）
  9. `/ai-ml/jev/jev-feedback-app` サンプルアプリ3: ユーザーの声の分類ボード（プロダクト作り向け。配列stateの一括評価、scoreで並べ替え）
  10. `/ai-ml/jev/jev-clinic-app` サンプルアプリ4: 診療所の受付振り分け（医療現場。診断はしない。緊急兆候は低しきい値で人へ、失敗もスタッフへ）
  11. `/ai-ml/jev/jev-leads-app` サンプルアプリ5: マーケティングの反応分析（一括評価 + キャンペーン別集計）
  12. `/ai-ml/jev/jev-advanced` 応用: 信頼度ゲート、LLMとの組み合わせ、評価、制約

## 処理フロー

1. `client/src/lib/navigation.ts` にSectionInfo 1件 + PageInfo 12件を追加
2. `client/src/lib/navigation.test.ts` の総ページ数・ai-mlのページ数を更新
3. `client/src/App.tsx` にlazy import + Routeを12件追加
4. `client/src/pages/ai-ml/jev/*.tsx` を作成（既存ai-mlページの構造に準拠）
5. `client/src/pages/ai-ml/Home.tsx` のカリキュラムカードに1件追加
6. `client/src/lib/searchIndex.ts` に検索キーワードを追加
7. `client/src/data/sources.ts` に出典を登録（公式SDKの型定義 / OpenAPI由来スキーマは手元で展開して実測扱い、PyPIのREADMEは逐語引用）
8. `client/src/data/announcements.ts` の先頭にお知らせを追加（1ページ1件）

## エッジケース

- 公式サイト（typesafe.ai / docs.typesafe.ai）は執筆環境から取得できない → APIの形は公式SDK（npm `@typesafe-ai/sdk` 0.6.0、PyPI `typesafe-sdk` 0.7.0）に同梱された型定義とOpenAPI生成スキーマを一次情報とし、再現コマンドを出典に残す
- 料金・応答時間は変動する → 数値を本文に固定せず、公式の料金ページで確認するよう書く。二次情報の数値は載せない
- サンプルアプリ3本は実際にJevを呼ぶ前提（プロジェクト作成・.env.local・curlでの疎通・実ページ）で書く。学習ステップのチャレンジはブラウザ内の練習でよい
- API呼び出しはブラウザから行えない（SDKが既定で拒否する）→ プレビュー付きCodingChallengeは「シミュレーション」と明記し、サーバー応答と同じ形の固定データでUI側の判定ロジックだけを扱う
- 公式サイト・コンソールの登録画面は執筆環境から確認できない → アカウントページでは根拠の強さ（公式SDK / 二次情報 / Vercel公式）を分けて書き、画面手順は公式quickstartを正とする
- 教材の題材に、執筆者の所属や業務領域を推測させる例を入れない
- サンプルアプリの題材は「一般の人が日常生活ですぐ使えるもの」「デザイナーに役立つもの」「プロダクト作りに関わる人に役立つもの」「医療現場の業務」「マーケティング分析」など、課題を速く解く実用のものから選ぶ
- 医療の題材では診断・医学的判断を質問の候補に入れない。緊急の兆候は低いしきい値で人へ回し、失敗は自動処理側に倒さない。要配慮個人情報の扱い（同意・委託・保存）を本文の先頭で扱う
- アイデア一覧のフライトシミュレーターのコラムは、Route Handlerとゲームループ側の本物の呼び出しコードを載せたうえで、ブラウザ内はシミュレーションと明記する
- Python / シェルのコードは実行プレビューできない → 静的 `CodeBlock`、または `preview={false}` のCodingChallengeを使う

## 出力

- 正常系: 新セクションがサイドバーに表示され、12ページが3テーマで描画・相互リンクする。TOPの「最新のお知らせ」に12件が出る
- アイデア一覧は「できること」を1行で示すだけに留め、コードは載せない。実装は3本のサンプルアプリのページに置く

## 完了条件（検証可能な形で）

- [ ] `pnpm check`（型）緑
- [ ] `pnpm test`（navigationカウント・link-integrity・sources・editor-validation・theme-contrast含む）緑
- [ ] `pnpm build` 成功
- [ ] 本文のAPI仕様の記述が、出典に登録したSDKの型定義 / スキーマと一致する
