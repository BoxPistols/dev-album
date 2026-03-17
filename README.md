# Dev Album

Web 開発の実践リファレンス。

React・Git・Three.js・Claude Code の 4 領域を、Web 標準とアクセシビリティの観点を含めて解説する技術マニュアル。セマンティック HTML、ARIA、Table/Dialog/Form の設計、ダークパターン回避なども扱う。

https://dev-album.vercel.app

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
| Vercel | ホスティング |

## セットアップ

```bash
pnpm install
npm run dev
# → http://localhost:3000
```

## コンテンツ構成

| マニュアル | ステップ数 | 内容 |
|-----------|:---------:|------|
| Git / GitHub | 27 | 基本操作、ブランチ、PR、AI エージェント連携 |
| React / Next.js | 69 | React 19、Next.js 15、CSS、Storybook、a11y、技術倫理 |
| Claude Code | 44 | CLI、MCP、Agent Teams、tmux、Hooks、CI/CD |
| Three.js | 23 | シーン構築、R3F、飛行シミュレーション |
| UI トレーニング | 40問 | HTML/CSS/JS の実践チャレンジ（4レベル） |

## アーキテクチャ

```
client/src/
├── components/          共有コンポーネント
│   ├── CodeBlock.tsx      静的コード表示（シンタックスハイライト）
│   ├── CodePreview.tsx    コード + ライブプレビュー（左右分割）
│   ├── CodingChallenge.tsx  チャレンジエディタ（ハイライト + プレビュー + 判定）
│   ├── Navigation.tsx     サイドバーナビゲーション
│   └── ...
├── data/                トレーニングチャレンジデータ
├── features/threejs/    Three.js 専用（CodeWithPreview, ThreePreview）
├── hooks/               useBookmarks, useProgress
├── lib/
│   ├── navigation.ts      ページ・セクション定義（全163ステップ）
│   ├── preview.ts         プレビュー HTML 生成（JSX / Three.js / Terminal / Config / Markdown）
│   └── searchIndex.ts     全文検索インデックス
└── pages/
    ├── react/           React マニュアル（5部構成）
    ├── git/             Git マニュアル
    ├── threejs/         Three.js マニュアル
    ├── claude-mux/      Claude Code マニュアル
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
  ├── jsx      → Sucrase トランスパイル → React 18.3.1 UMD (CDN) で描画
  ├── threejs  → Three.js 0.160.1 UMD (CDN) で描画
  ├── terminal → シンタックスハイライト付きターミナル表示
  ├── config   → JSON バリデーション + ハイライト
  └── markdown → Markdown パーサーで HTML 変換
  ↓
srcDoc iframe（sandbox="allow-scripts allow-same-origin"）で表示
```

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
| `/project:fact-check` | Claude Code 教材のファクトチェック |

### Hooks

| イベント | 処理 |
|---------|------|
| PostToolUse / Write | `.tsx` `.ts` `.css` ファイル書き込み後に prettier 自動フォーマット |

### Permissions

- 許可: ビルド、テスト、Git 操作、ファイル読み書き
- 拒否: `rm -rf /`、`git push --force`

## デザインシステム

### カラートークン

CSS 変数ベース。ライト / ダークモード自動切替。

| トークン | ライト | ダーク | 用途 |
|---------|--------|--------|------|
| `--primary` | #2563EB | #7CB3E8 | アクション、リンク |
| `--foreground` | #0F172A | #CDD5E0 | 本文テキスト |
| `--muted-foreground` | #64748B | #8B99AD | 補助テキスト |
| `--background` | #FFFFFF | #151D2B | ページ背景 |
| `--border` | #E2E8F0 | #283545 | ボーダー |

### マニュアル別アクセントカラー

| マニュアル | カラー | Tailwind |
|-----------|--------|----------|
| Git | Rose | `rose-500` / `rose-300` |
| React | Indigo | `indigo-500` / `indigo-300` |
| Claude Code | Violet | `violet-500` / `violet-300` |
| Three.js | Teal | `teal-500` / `teal-300` |

### 禁止パターン

| 禁止 | 推奨 |
|------|------|
| `text-black` / `bg-white` 直接使用 | `text-foreground` / `bg-background` |
| 角丸カードに 1 辺だけのボーダー | hover shadow + 全辺 border |
| `shadow-lg` | `shadow-sm` |
| `duration-500` 以上 | `duration-150` ～ `200` |
| 色だけで情報伝達 | アイコン + テキスト併用 |
| `/* */` in CodingChallenge | `//` コメントを使用 |
| React 19 / Three.js 0.161+ CDN | React 18.3.1 / Three.js 0.160.1（UMD 廃止対応） |

## テスト

```bash
# Unit テスト（176 テスト）
npx vitest run

# E2E テスト（14 テスト、dev サーバー自動起動）
npx playwright test

# 全チャレンジコードのトランスパイル検証
npx vitest run src/lib/editor-validation.test.ts
```

## デプロイ

Vercel に自動デプロイ（main push で発火）。

```json
// vercel.json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist/public",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## バグ報告

- アプリ内: https://dev-album.vercel.app/bug-report
- GitHub Issue: フォーム形式（URL + カテゴリ + スクショ）

## ライセンス

MIT
