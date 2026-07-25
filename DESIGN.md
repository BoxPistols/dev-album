# DESIGN.md

アーキテクチャ・意思決定・制約の正本（SSOT）。**コードを読めば分かることは書かない**。
「なぜこう作ったか」「何が前提か」だけを残す。日々の操作規約は [AGENTS.md](./AGENTS.md)、
Claude Code 固有の指示は [CLAUDE.md](./CLAUDE.md)、機能仕様は [specs/](./specs/) にある。

このリポジトリは「Web 開発の実践リファレンス教材」であると同時に、**教材が説く実践（3 層ドキュメント・SSOT・スペック駆動・a11y ゲート）を自ら体現する**ことを設計方針とする。

## アーキテクチャ

- クライアントは React 19 + TypeScript + Vite の SPA。ルーティングは wouter。ホスティングは Vercel（SPA の静的配信 + `api/` の Vercel Functions）。
- サーバレス API: `api/chat.ts` が AI チャットの代理エンドポイント（OpenAI / Gemini、Redis によるクォータ制御）。`vercel.json` が `/api/:path*` を関数へ、残りを SPA へ rewrite する。`server/index.ts`（Express）はローカル/代替の静的配信サーバで、Vercel 本番の主経路ではない。
- 教材ページは `client/src/pages/<manual>/<section>/*.tsx`。ページ・セクション・ステップの一覧は `client/src/lib/navigation.ts` が単一の真実として持ち、`App.tsx` のルートと対応する。
- ライブプレビュー基盤: 学習者のコードを Sucrase でブラウザ内トランスパイルし、iframe 内で描画する（JSX / terminal / config / markdown / threejs を `resolvePreviewType()` で判定）。
- 3 テーマ（Light / Dark 高コントラスト / Dracula）は CSS 変数（`client/src/index.css` の `:root` / `.dark` / `.dark-soft`）＋ html クラス切替で実現。Dracula は `.dark` に `.dark-soft` を重ねて適用する（`.dark` の上に上書き）。

## 主要な制約

- **アクセシビリティは必須要件**。WCAG AA（コントラスト 4.5:1）を満たす。色トークンは実測値で決める（手計算しない）。`text-black`/`text-white`/`bg-white` 直接使用は禁止（テーマ非対応になるため）。
- プレビュー iframe は既定 `sandbox="allow-scripts allow-same-origin"`（CDN 読み込みのため両方必要）。
- 教材のトーンはフラットで実用的。エモーショナルなコピー・ネガティブ訴求・クリシェを禁止。

## 意思決定の記録

### 採用: wouter（React Router ではない）
- 理由: 教材 SPA にはフルルーターは過剰。軽量で `App.tsx` の宣言的ルートと相性が良い。

### 採用: Sucrase によるブラウザ内トランスパイル + UMD CDN でプレビュー描画
- 理由: ビルドを挟まず「書いて即結果」を実現するのが教材の核。
- 制約: プレビューの React は **18.3.1**、Three.js は **0.160.1** に固定する。React 19 / Three.js 0.161+ は UMD ビルドを廃止しており CDN 描画で壊れるため。
- プレビュー用外部ライブラリ（MUI/Tailwind/SC/Emotion 等）は CDN 依存をやめ**セルフホスト**（オフライン・社内網でも動くため）。

### 採用: 3 テーマ + CSS 変数トークン
- 理由: ダークモードと色覚多様性を教材自身が体現する。マニュアル別の色分けは廃止し、単一プライマリ（ブルー）で統一（番号・アイコン・テキストで区別）。

### 採用: Light の primary = `#1F5CDB`（旧 `#2563EB` から変更）
- 理由: `text-primary × bg-primary/10` が旧値で 4.48:1 と AA 未達だった。`#1F5CDB` で 5.04:1。Dark/Dracula は別 primary のため不変。
- 経緯: テスト戦略セクション追加時の 3 テーマ axe 検査で検出。局所修正はサイト全体で多用されるパターンのためモグラ叩きになるので、Light の primary トークン群を一括で調整した。

### 採用: E2E 全体を CI ゲート化（a11y を含む単一ジョブ）
- 理由: 「ビルドが通る ≠ 正しく描画される」。コントラスト退行・プレビュー描画の破綻を PR 段階で止める。
- 構成: `verify`（型/単体/ビルド）と `e2e`（Playwright 全スペック）の 2 ジョブ。a11y を別ジョブに分けないのは、依存と Chromium の再インストールで CI 時間がほぼ倍になり、得られる signal（どのスペックが落ちたか）はレポートで分かるため。
- 対象: a11y（代表ページ + コードブロックページ × 3 テーマ、critical/serious ゼロ）/ プレビュー基盤（実ライブラリ描画・エラー不変条件）/ Three.js / マニュアル導線。
- 安定性: 共有ランナーのタイミング揺れは `retries: 2`（CI のみ）で吸収し、毎回落ちる実バグと切り分ける。失敗時のみ HTML レポートをアーティファクト保存する。

### 採用: syntax ハイライトの一部トークン色を AA 準拠へ差し替え
- 理由: `CodeBlock` が使う prism `vsDark` の 3 トークン色（prolog/constant/punctuation）がコード背景 `#1e1e2e` で AA 未達だった。該当色のみ派生テーマで差し替え（色相は維持、他は不変）。

### ハーネスの範囲: リポジトリに載せるのは Inform / Verify / Correct、Constrain は載せない
- 本リポジトリの「ハーネス」（AI・人間が正しく作業するための足場）は 4 象限で整理する: **Inform**（何をどう作るかを伝える = 3 層ドキュメント・specs）/ **Verify**（正しさを機械で確かめる = CI の型・単体・a11y）/ **Correct**（逸脱を正す基準 = レビュー規約）/ **Constrain**（危険な操作を機械的に封じる）。
- このうち Constrain（Claude Code の permission 設定・hooks 等）は**意図的にリポジトリへコミットしない**。理由: 権限・hook はオペレータのローカル環境・信頼境界に強く依存し、リポジトリに固定すると環境差で壊れる／誤った安心を与える。運用者ごとにローカルで設定する範囲とし、非目標として明記する（欠落ではなく設計判断）。

## 既知の課題

- E2E は Chromium 単一ブラウザでの検証。WebKit/Firefox 固有の描画差は捕捉できない。
- a11y 検査は代表ページの抜き取りで、全 300 ページ超を網羅していない。新セクション追加時は `e2e/a11y.spec.ts` の `PAGES` に代表 1 ページを足す運用で補う。
- axe-core は自動検出できる違反のみを捕捉する（キーボード操作の妥当性・読み上げ順序の自然さ等は人手の確認が要る）。
- 依存の major 更新は ADR を切って計画的に取り込む（CI が緑でも互換モードで動いているだけのことがある）。

## 参考資料

- 変更履歴・お知らせ: `client/src/data/announcements.ts`
- 貢献ガイド: [CONTRIBUTING.md](./CONTRIBUTING.md)
