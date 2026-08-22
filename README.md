# Dev Album

Web 開発の実践リファレンス。

Git・React・Claude Code・Three.js・AI/ML・UX デザイン・API 設計・Vue/Nuxt・インフラ/DevOps・開発フローの 10 マニュアルを、Web 標準とアクセシビリティの観点を含めて解説する技術マニュアル。セマンティック HTML、ARIA、Table/Dialog/Form の設計、ダークパターン回避なども扱う。

https://dev-album.vercel.app

## ドキュメント

ルールと知識は 3 層 + 仕様で一元管理する（正本は各 1 箇所）。

| ファイル | 役割 |
|---|---|
| [AGENTS.md](./AGENTS.md) | ツール非依存の共通規約（コーディング / テスト / PR / レビュー）の正本 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | アーキテクチャ・意思決定・制約の正本 |
| [CLAUDE.md](./CLAUDE.md) | Claude Code 固有の指示、プレビュー / 教材固有の詳細 |
| [specs/](./specs/README.md) | 機能・教材セクションの自然言語仕様（スペック駆動） |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | 貢献ガイド |

## 技術スタック

| 技術 | 用途 |
|------|------|
| React 19 + TypeScript | UI |
| Vite | ビルド + HMR |
| Tailwind CSS 4 | スタイリング |
| wouter | ルーティング |
| Sucrase | ブラウザ内 JSX トランスパイル（プレビュー） |
| React Three Fiber | 3D プレビュー |
| prism-react-renderer | シンタックスハイライト |
| Vercel | ホスティング（静的配信 + `api/` の Functions） |

## セットアップ

パッケージマネージャは **pnpm 固定**（`packageManager` フィールド）。npm / yarn を混在させない。

```bash
pnpm install
pnpm dev
# → 起動ごとにポートを乱数で選ぶ（30000-39999）。実際の URL は起動時の出力を見る
# ポートを固定したいときは PORT を渡す: PORT=3456 pnpm dev
```

## コンテンツ構成

10 マニュアル・300 ページ超。ページ・セクション・ステップの単一の真実は `client/src/lib/navigation.ts` が持つ（件数は `navigation.test.ts` が固定している）。

| マニュアル | 内容 |
|-----------|------|
| Git / GitHub 入門 | 基本操作、ブランチ、PR、AI エージェント連携 |
| React / TypeScript / Next.js 入門 | React 19、Next.js 15、CSS、Storybook、a11y、アーキテクチャ |
| Claude Code & 開発環境 | CLI、MCP、AI コーディングエージェント、Hooks、CI/CD |
| Three.js / React Three Fiber 入門 | シーン構築、R3F、飛行シミュレーション |
| AI / Python / 機械学習 | Python・機械学習・LLM・LMOps の基礎 |
| UX デザイン入門 | ユーザーリサーチからプロトタイピング・評価まで |
| API 設計 / OpenAPI 入門 | REST API 設計、OpenAPI/Swagger、API 検証 |
| Vue 3 / Nuxt 入門 | Composition API、Pinia、Nuxt |
| バックエンド / インフラ / DevOps 入門 | ホスティング、エッジ、BaaS、DB、BFF、CI/CD |
| 開発フロー / チーム / DesignOps 入門 | アジャイル、スクラム、コードレビュー、DesignOps |

別途、UI トレーニング（HTML/CSS/JS の実践チャレンジ）を持つ。

## アーキテクチャ

```
client/src/
├── components/          共有コンポーネント
│   ├── CodeBlock.tsx      静的コード表示（シンタックスハイライト）
│   ├── CodePreview.tsx    コード + ライブプレビュー（左右分割）
│   ├── CodingChallenge.tsx  チャレンジエディタ（ハイライト + プレビュー + 判定）
│   ├── Navigation.tsx     サイドバーナビゲーション
│   └── ...
├── contexts/            ThemeContext, LayoutContext
├── data/                トレーニングチャレンジ、お知らせ
├── features/threejs/    Three.js 専用（CodeWithPreview, ThreePreview）
├── hooks/               useBookmarks, useProgress
├── lib/
│   ├── navigation.ts      マニュアル・セクション・ページ定義（SSOT）
│   ├── preview.ts         プレビュー HTML 生成（JSX / Three.js / Terminal / Config / Markdown）
│   └── searchIndex.ts     全文検索インデックス
└── pages/
    ├── git/ react/ claude-code/ threejs/     マニュアル別ページ
    ├── ai-ml/ ux-design/ api/ vue/          〃
    ├── infra/ devflow/                      〃
    ├── Training.tsx     UI トレーニング
    ├── Landing.tsx      LP
    └── BugReport.tsx    バグ報告ページ
```

## プレビューシステム

CodingChallenge / CodePreview のライブプレビューは以下の仕組みで動作する。

```
ユーザーのコード入力
  ↓
resolvePreviewType() で自動判定
  ├── jsx      → Sucrase トランスパイル → React 18.3.1 UMD（セルフホスト）で描画
  ├── threejs  → Three.js 0.160.1 UMD（セルフホスト）で描画
  ├── terminal → シンタックスハイライト付きターミナル表示
  ├── config   → JSON バリデーション + ハイライト
  └── markdown → Markdown パーサーで HTML 変換
  ↓
srcDoc iframe（sandbox="allow-scripts allow-same-origin" + CSP）で表示
```

- プレビューが読む UMD（React / ReactDOM / Three / MUI / Tailwind / styled-components / Emotion の計 9 本）は `client/public/vendor/` に**セルフホスト**する。CDN を単一障害点にせず、オフライン・社内網でも動かすため。
- iframe 内の CSP は `default-src 'none'; script-src 'self' 'unsafe-inline'; connect-src 'none'` を軸に組む（正本は `client/src/lib/preview.ts` の `PREVIEW_CSP`）。`'unsafe-inline'` はトランスパイル済みの学習者コードをインラインで実行するために要り、外部ホストのスクリプト読み込みと fetch / XHR / WebSocket による外部送信は `'self'` / `'none'` で構造的に封じる（`img-src https:` を許しているため画像リクエスト経由の外部 GET は残る）。
- `allow-same-origin` は同一オリジンの `/vendor/` を解決するために必要。緩めた分を CSP で多層防御する。
- `detectComponentName()`: `App` が定義されていれば優先的にレンダリング
- `detectLanguage()`: tsx / css / bash / markup を自動判定（ハイライト用）
- Tab / Shift+Tab でインデント操作対応

## Claude Code 統合

### Skills（`/スキル名` で呼び出し）

| スキル | 内容 |
|--------|------|
| `/review` | PR / 変更のコードレビュー |
| `/commit` | 日本語コミットメッセージ生成 + commit |
| `/test` | vitest + Playwright 一括実行 + 失敗修正 |
| `/build-check` | ビルド + テスト + デプロイ確認 |
| `/fix-preview` | プレビューエラー調査・修正 |
| `/create-page` | 新規教材ページ作成（ルーティング込み） |

### Commands（`/project:コマンド名` で呼び出し）

| コマンド | 内容 |
|---------|------|
| `/project:deploy-check` | デプロイ前最終チェック |
| `/project:audit-previews` | 全プレビュー検証 |
| `/project:fact-check` | Claude Code 教材を公式ドキュメントと照合 |
| `/project:fact-check-cmux` | cmux 教材を公式 README + 実機出力と照合 |

### Hooks

| イベント | 処理 |
|---------|------|
| PostToolUse / Write | `.tsx` `.ts` `.css` ファイル書き込み後に prettier 自動フォーマット |

### Permissions

- 許可: ビルド、テスト、Git 操作、ファイル読み書き
- 拒否: `rm -rf /`、`git push --force`
- リポジトリに載せるのはプロジェクトスコープの最小限のみ。これは**セキュリティ境界ではなく**、実効的な防御は CI ゲートとレビューが担う（[ARCHITECTURE.md](./ARCHITECTURE.md) 参照）。

## デザインシステム

### カラートークン

CSS 変数ベース。Light / Dark（高コントラスト）/ Dracula（ソフトダーク）の 3 テーマ。正本は `client/src/index.css`。

| トークン | Light | Dark | Dracula | 用途 |
|---------|-------|------|---------|------|
| `--primary` | #1F5CDB | #93C5FD | #CCABFA | アクション、リンク（マニュアル内では下記のブランド色に差し替わる） |
| `--foreground` | #3F3F46 | #E4E4E7 | #F8F8F2 | 本文テキスト |
| `--muted-foreground` | #67676F | #A8A8B3 | #B4BEDD | 補助テキスト |
| `--background` | #FAFAFA | #09090B | #282A36 | ページ背景 |
| `--card` | #FFFFFF | #18181B | #313545 | カード背景 |
| `--muted` | #F4F4F5 | #27272A | #44475A | セクション背景 |
| `--border` | #E4E4E7 | #27272A | #44475A | ボーダー |

いずれも WCAG AA（4.5:1）を実測で満たす値。手計算せず検算ツールで確定する。

### マニュアル別ブランドカラー

マニュアルを開いている間は `<html data-manual="...">` が付き（`useManualTheme`）、`index.css` の `[data-manual="..."]` ブロックが `--primary` 系（`--primary` / `--accent` / `--ring` / `--sidebar-*`）だけを各ブランド色に差し替える。地の色（`--background` / `--card` / `--foreground`）は共通のまま変わらない。

| マニュアル | Light | Dark | Dracula |
|---|---|---|---|
| `learning` | #456E0D | #A3E635 | #BEF264 |
| `git` | #BE123C | #FB7185 | #FC9EAB |
| `react` | #4F46E5 | #A5B4FC | #A5B4FC |
| `claude-code` | #6D28D9 | #C4B5FD | #C4B5FD |
| `threejs` | #0E6F68 | #2DD4BF | #2DD4BF |
| `ai-ml` | #A14A08 | #F59E0B | #F6A721 |
| `ux-design` | #BE185D | #F9A8D4 | #F9A8D4 |
| `api` | #047253 | #34D399 | #34D399 |
| `vue` | #047253 | #42B883 | #50FA7B |

`infra` / `devflow` は上書きを持たず、既定の `--primary` を使う。

色は**情報を伝える手段ではなく、現在地の手がかり**として使う。マニュアルの識別は番号・アイコン・テキストで行い、色だけに依存しない（色覚多様性への配慮）。

ブランド色は 9 マニュアル × 3 テーマ = 27 通りに分岐するため、目視や代表ページの抜き取りでは AA 未達を取りこぼす。`client/src/lib/theme-contrast.test.ts` がソースに実在する「文字色クラス × 背景色クラス」の組だけを全 27 通りで評価し、WCAG AA 4.5:1 を下回ったら失敗する。ここの色を変えるときはそのテストを通してから確定する。

`text-primary` を重ねる自己色ティントは `bg-primary/10` を上限とする。`bg-primary/α` は下地を文字色そのものへ寄せるため、α を上げるほどコントラストの余地が減る（`bg-primary/5` のセクションヘッダ内に置くと実効 α は 0.145 になる）。

### 禁止パターン

| 禁止 | 推奨 |
|------|------|
| `text-black` / `bg-white` 直接使用 | `text-foreground` / `bg-background` |
| 角丸カードに 1 辺だけのボーダー | hover shadow + 全辺 border |
| `shadow-lg` | `shadow-sm` |
| `duration-500` 以上 | `duration-150` ～ `200` |
| `/* */` in CodingChallenge | `//` コメントを使用 |
| 色だけで情報伝達 | アイコン + テキスト併用 |
| `bg-primary/20` に `text-primary` | `bg-primary/10` まで（自己色ティントで AA を割る） |
| プレビューに React 19 / Three.js 0.161+ | React 18.3.1 / Three.js 0.160.1（UMD 未配布のため） |

## テスト

```bash
pnpm check                       # 型チェック（tsc --noEmit）
pnpm test                        # Unit テスト（Vitest）
pnpm test:e2e                    # E2E 全スペック（Playwright, a11y 含む）
pnpm test:a11y                   # a11y のみ（axe-core, 3 テーマ）
pnpm test src/lib/editor-validation.test.ts   # 全チャレンジコードのトランスパイル検証
```

E2E は `playwright.config.ts` の既定ポート 3400 を使い、その値を dev サーバへ明示的に渡す（`pnpm dev` の既定は乱数なので、渡さないと待ち受け側とずれる）。3400 が他プロジェクトに使われている場合は、そのサーバを再利用して誤った結果になるため、`PORT=3401 pnpm test:e2e` のように空きポートを指定する。

CI（`.github/workflows/ci.yml`）は `verify`（型 → 単体 → ビルド）と `e2e`（Playwright 全スペック）の 2 ジョブ。

## デプロイ

Vercel に自動デプロイ（main push で発火）。

```json
// vercel.json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist/public",
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## バグ報告

- アプリ内: https://dev-album.vercel.app/bug-report
- GitHub Issue: フォーム形式（URL + カテゴリ + スクショ）

## ライセンス

MIT
