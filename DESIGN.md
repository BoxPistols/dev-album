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
- プレビュー iframe は既定 `sandbox="allow-scripts allow-same-origin"`。`allow-same-origin` はセルフホストした `/vendor/` の UMD を同一オリジンとして解決するために要る。緩めた分は iframe 内の CSP（`default-src 'none'` / `script-src 'self' 'unsafe-inline'` / `connect-src 'none'`）で多層防御する。`'unsafe-inline'` はトランスパイル済みの学習者コードをインラインで実行するために外せない。
- 教材のトーンはフラットで実用的。エモーショナルなコピー・ネガティブ訴求・クリシェを禁止。

## 意思決定の記録

### 採用: wouter（React Router ではない）
- 理由: 教材 SPA にはフルルーターは過剰。軽量で `App.tsx` の宣言的ルートと相性が良い。

### 採用: Sucrase によるブラウザ内トランスパイル + セルフホスト UMD でプレビュー描画
- 理由: ビルドを挟まず「書いて即結果」を実現するのが教材の核。
- 配信: プレビューが読む UMD は React / ReactDOM / Three / MUI / Tailwind / styled-components / Emotion の計 9 本を**すべて `client/public/vendor/` にセルフホスト**する（`client/src/lib/preview.ts`）。CDN を単一障害点にせず、オフライン・社内網でも動かすため。iframe の CSP は `script-src 'self' 'unsafe-inline'` のため、外部ホストのスクリプトは構造的に読み込めない（インライン許可は学習者コードの実行にのみ効く）。
- 制約: プレビューの React は **18.3.1**、Three.js は **0.160.1**、MUI は **v5.18** に固定する。React 19 / Three.js 0.161+ / MUI v6+ は UMD ビルドを配布しておらず、セルフホストする成果物が存在しないため。
- 版ずれ検知: `pnpm freshness` で npm レジストリの最新版との乖離を検出する。

### 採用: 3 テーマ + CSS 変数トークン
- 理由: ダークモードと色覚多様性を教材自身が体現する。
- 構成: 地の色（`--background` / `--card` / `--foreground` / `--muted*` / `--border`）はテーマごとに 1 組だけ持ち、全マニュアルで共通にする。

### 採用: マニュアル別ブランドカラーは primary 系トークンだけを差し替える
- 理由: 8 マニュアルを横断する SPA で「いま自分がどのマニュアルにいるか」を色で示したい。一方で色を情報伝達の唯一の手段にはできない（色覚多様性）。そこで色は現在地の手がかりに留め、識別は番号・アイコン・テキストで行う。
- 構成: `useManualTheme` が `<html data-manual="...">` を付け、`index.css` の `[data-manual="..."]` / `.dark[data-manual="..."]` / `.dark-soft[data-manual="..."]` が `--primary` / `--accent` / `--ring` / `--sidebar-*` のみを上書きする。地の色は触らないので、コンポーネント側は `bg-primary` / `text-primary` を書くだけでマニュアルを意識せずに済む。`infra` / `devflow` は上書きを持たず既定色にフォールバックする。
- 代償: primary が 8 マニュアル × 3 テーマ = 24 通りに分岐し、コントラスト検査の対象が 24 倍になる。axe（`e2e/a11y.spec.ts`）は実描画を見るぶん代表ページの抜き取りにならざるを得ず、これだけでは取りこぼす。
- 対策: `client/src/lib/theme-contrast.test.ts` を単体テストとして置き、ソースに実在する「文字色クラス × 背景色クラス」の組を全 24 通りのトークン値で評価する。仮想の組み合わせではなく実在する組だけを見るので、使っていない色の理論値で落ちない。axe は実描画の裏取り、こちらは全網羅という分担。

### 採用: `text-primary` に重ねる自己色ティントは `bg-primary/10` を上限とする
- 理由: `bg-primary/α` は下地を primary 自身へ寄せるため、同じ primary の文字を載せるとコントラストの余地が α に比例して減る。`bg-primary/5` のセクションヘッダ内に `bg-primary/10` のバッジを置く定型では実効 α が 1−(1−0.05)(1−0.10) = 0.145 まで上がる。
- 経緯: ブランドカラー導入後の全マニュアル検査で、`bg-primary/20 text-primary`（ステップ番号バッジ）が複数マニュアルで AA 未達だった。選択肢は「24 通りのトークンを組み直す」か「ティントの上限を決める」かの二択で、後者を採った。前者は色相を保てず、ブランド色である意味が薄れるため。
- 結果: ティント上限を `/10` に揃えたうえで、AA に届かなかった 7 トークンだけを色相を保ったまま微調整した（`threejs` `#0F766E`→`#0E6F68` / `ai-ml` `#B45309`→`#A14A08` / `api`・`vue` `#047857`→`#047253` / Dracula 既定 `#BD93F9`→`#CCABFA` / Dracula `git` `#FB7185`→`#FC9EAB` / Dracula `ai-ml` `#F59E0B`→`#F6A721`）。

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

### ハーネスの範囲: Inform / Verify / Correct を主軸に置き、Constrain はプロジェクト最小限にとどめる
- 本リポジトリの「ハーネス」（AI・人間が正しく作業するための足場）は 4 象限で整理する: **Inform**（何をどう作るかを伝える = 3 層ドキュメント・specs）/ **Verify**（正しさを機械で確かめる = CI の型・単体・a11y）/ **Correct**（逸脱を正す基準 = レビュー規約）/ **Constrain**（危険な操作を機械的に封じる）。
- 品質の主軸は Inform / Verify / Correct に置く。Constrain は Claude Code のプロジェクトスコープ設定（`.claude/settings.json` の permission 許可・拒否リストと整形 hook）に**最小限だけ**載せる。
- オペレータ個人スコープの設定（`~/.claude/settings.json`、承認モード、外部ツール接続）は**リポジトリに載せない**。権限は個々の環境・信頼境界に依存し、リポジトリに固定すると環境差で壊れるか、誤った安心を与えるため。非目標として明記する（欠落ではなく設計判断）。
- 重要な前提: リポジトリ内の Constrain は**セキュリティ境界ではない**。手元の設定で容易に上書きできるので、実効的な防御は Verify（CI ゲート）と Correct（レビュー）が担う。

## 既知の課題

- E2E は Chromium 単一ブラウザでの検証。WebKit/Firefox 固有の描画差は捕捉できない。
- a11y 検査は代表ページの抜き取りで、全 300 ページ超を網羅していない。新セクション追加時は `e2e/a11y.spec.ts` の `PAGES` に代表 1 ページを足す運用で補う。
- axe-core は自動検出できる違反のみを捕捉する（キーボード操作の妥当性・読み上げ順序の自然さ等は人手の確認が要る）。
- 依存の major 更新は ADR を切って計画的に取り込む（CI が緑でも互換モードで動いているだけのことがある）。

## 参考資料

- 変更履歴・お知らせ: `client/src/data/announcements.ts`
- 貢献ガイド: [CONTRIBUTING.md](./CONTRIBUTING.md)
