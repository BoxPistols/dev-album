# Dev Album — プロジェクト CLAUDE.md

## プロジェクト概要

Web 開発の実践リファレンス。Git・React・Claude Code・Three.js の 4 領域を、Web 標準とアクセシビリティの観点を含めて解説する技術マニュアル。W3Schools の構成を参考にしつつ、品質設計・a11y をより深く扱う。

- URL: https://dev-album.vercel.app
- リポジトリ: https://github.com/BoxPistols/dev-album
- スタック: React 19 + TypeScript + Vite + Tailwind CSS

### コアバリュー
1. **Web 標準**: セマンティック HTML、WCAG 準拠、正しいマークアップ
2. **アクセシビリティ**: 色覚多様性、キーボード操作、スクリーンリーダー対応
3. **品質設計**: ダークパターン回避、Table/Dialog/Form の正しい設計
4. **実践**: コードを書いて結果を見る、読むだけで終わらない

## ドキュメント階層（SSOT）

ルールと知識は 3 層 + 仕様で一元管理する。重複を作らず、正本は各 1 箇所に置く（教材が説く SSOT / 3 層構造を自ら体現する）。

| ファイル | 役割 | 対象 |
|---|---|---|
| **CLAUDE.md**（本ファイル） | Claude Code 固有の指示・プレビュー/教材固有の詳細 | Claude Code |
| **[AGENTS.md](./AGENTS.md)** | ツール非依存の共通規約（コーディング/テスト/PR/レビュー）の正本 | 全 AI ツール + 人間 |
| **[DESIGN.md](./DESIGN.md)** | アーキテクチャ・意思決定・制約の正本 | 人間 + AI（参照） |
| **[specs/](./specs/)** | 機能・教材セクションの自然言語仕様（スペック駆動） | 人間 + AI |

共通のコーディング/テスト/PR 規約の正本は **AGENTS.md**。本ファイルは Claude Code 固有の運用とプレビュー/教材固有の詳細に集中する。新機能・新セクションは `specs/` に仕様を書いてから実装する（適用判断は `specs/README.md`）。

> 本ファイル末尾の「グローバル設計方針」ブロックは `claude-memory-sync` が自動生成・同期する（手で消しても再注入される）。命名規則・禁止パターン等が AGENTS.md と重複するが、**規約が矛盾した場合は AGENTS.md を正とする**。汎用規約の編集は AGENTS.md 側で行う。

## 技術スタック

| 技術 | 用途 |
|------|------|
| React 19 + TypeScript | UI |
| Vite | ビルド + HMR |
| Tailwind CSS 4 | スタイリング |
| wouter | ルーティング |
| Sucrase | ブラウザ内 JSX トランスパイル（プレビュー用） |
| React Three Fiber | Three.js の React バインディング |
| prism-react-renderer | シンタックスハイライト |
| Vercel | ホスティング |

## ディレクトリ構成

```
client/src/
├── components/     共有コンポーネント（CodeBlock, CodePreview, CodingChallenge, InfoBox, Quiz 等）
├── contexts/       ThemeContext, LayoutContext
├── data/           トレーニングチャレンジデータ
├── features/       Three.js 専用コンポーネント
├── hooks/          useBookmarks, useProgress 等
├── lib/            navigation.ts, preview.ts, searchIndex.ts
└── pages/
    ├── react/      React マニュアル
    ├── git/        Git マニュアル
    ├── threejs/    Three.js マニュアル
    ├── claude-mux/ Claude Code マニュアル
    ├── Training.tsx  UI トレーニング
    ├── Landing.tsx   LP
    └── BugReport.tsx バグ報告
```

## カラートークン

### 設計方針（バウハウス・ミニマル）
- モノクロベース（zinc系）+ 単一プライマリ（ブルー）の抑制されたパレット
- マニュアル別の色分けを廃止し、統一プライマリカラーで表現
- accent / cta / secondary は primary に統合
- 3テーマ対応: Light / Dark（高コントラスト）/ Dracula（ソフトダーク）

### ライトモード

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #1F5CDB | アクション、リンク、フォーカスリング（text-primary×bg-primary/10 が AA 4.5:1 を満たす実測値。旧 #2563EB は 4.48:1 で未達） |
| --foreground | #3F3F46 | 見出し、本文テキスト |
| --muted-foreground | #67676F | 補助テキスト、プレースホルダー（muted 背景上でも AA 4.5:1 を満たす実測値） |
| --background | #FAFAFA | ページ背景 |
| --card | #FFFFFF | カード背景 |
| --muted | #F4F4F5 | セクション背景、無効状態 |
| --border | #E4E4E7 | ボーダー、セパレーター |

### ダークモード（高コントラスト）

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #93C5FD | アクション、リンク |
| --foreground | #E4E4E7 | 本文テキスト |
| --muted-foreground | #A1A1AA | 補助テキスト |
| --background | #09090B | ページ背景 |
| --card | #18181B | カード背景 |
| --muted | #27272A | セクション背景 |
| --border | #27272A | ボーダー |

### Dracula モード（ソフトダーク）

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #BD93F9 | アクション、リンク（Dracula パープル） |
| --foreground | #F8F8F2 | 本文テキスト |
| --muted-foreground | #6272A4 | 補助テキスト |
| --background | #282A36 | ページ背景 |
| --card | #313545 | カード背景 |
| --muted | #44475A | セクション背景 |
| --border | #44475A | ボーダー |

### マニュアル別カラー（統一）

全マニュアル共通で `text-primary` / `bg-primary` を使用。色ではなく番号・アイコン・テキストで区別する。

## コンポーネント命名規則

- ページ: PascalCase（`Flexbox.tsx`, `DialogPatterns.tsx`）
- 共有コンポーネント: PascalCase（`CodeBlock`, `CodingChallenge`）
- hooks: camelCase with `use` prefix（`useBookmarks`, `useProgress`）
- CSS クラス: Tailwind ユーティリティ + CSS 変数（`bg-primary`, `text-foreground`）

## 禁止パターン

| 禁止 | 理由 | 推奨 |
|------|------|------|
| `text-black` / `text-white` 直接使用 | ダークモード非対応 | `text-foreground` / `text-muted-foreground` |
| `bg-white` / `bg-gray-900` 直接使用 | テーマ非対応 | `bg-background` / `bg-card` / `bg-muted` |
| 角丸カードに 1 辺だけのボーダー | 視覚的に不自然 | hover shadow + 全辺 border |
| `shadow-lg` / `shadow-xl` | ノイズ過剰 | `shadow-sm` または `shadow-primary/5` |
| `duration-500` 以上のアニメーション | 操作が鈍く感じる | `duration-150` ～ `duration-200` |
| 色だけで情報を伝達 | 色覚多様性非対応 | アイコン + テキスト併用 |
| `/* コメント */` in CodingChallenge initialCode | Sucrase が正規表現と誤認 | `// コメント` を使用 |
| CDN で React 19 / Three.js 0.161+ を指定 | UMD ビルド廃止 | React 18.3.1 / Three.js 0.160.1 |
| プレビュー iframe に `sandbox="allow-scripts"` のみ | CDN 読み込み失敗 | `allow-scripts allow-same-origin` |
| エモーショナルなコピー（「劇的に」「飛躍的に」） | 教材のトーンに合わない | フラットで実用的な表現 |

## プレビューシステム

- JSX: Sucrase でトランスパイル → React 18.3.1 UMD (CDN) で描画
- Three.js: three@0.160.1 UMD (CDN) で描画
- Terminal/Config/Markdown: 専用レンダラー
- `resolvePreviewType()` で自動判定: JSX / terminal / config / markdown / threejs
- `detectComponentName()`: `App` が定義されていれば優先的にレンダリング

## ライティング指針

- フラットで実用的なトーン（Progate / オライリー参照）
- 「〜を一通り体験できる」「〜を試しながら学べる」
- ネガティブ訴求禁止（「〜できない」「〜わからない」→ ポジティブ提案に）
- 具体的な数値（ステップ数等）は変動するため記載しない
- クリシェ禁止（「技術は繋がりの中で力になる」等）

### 仕様値 vs 実測値ギャップの明示

「仕様で定義された値」と「実環境で観測される値」がズレる箇所は、**先に明示する**。学習者が「定数 = 神聖」と思い込むと、実測がずれた時に自分を責めて折れる。

| 仕様値 | 実測の振れ | 注記すべきこと |
|-------|-----------|---------------|
| CSS `100vh` | iOS Safari で address bar 込み | `100dvh` が現代解 |
| semver `^1.2.3` | lockfile で固定される | 「仕様は範囲、実測は lockfile」 |
| React `useEffect` 発火 | Strict Mode で 2 回走る | 仕様は「レンダ後」、実測は環境依存 |
| Three.js `requestAnimationFrame` | タブ非アクティブで停止 | 「60fps 保証ではない」 |

書き方のテンプレ: **「仕様では X、実測では Y になることがある。理由は Z」** を 1 段落で。理論導出は appendix に集約して本文を簡潔に保つ。

## CodingChallenge のヒント設計

`hints` は **段階ヒント (知らせる順に詰める)** ではなく **keyword 対応ヒント (1 keyword = 1 hint)** として書く。

- `keywords={['A', 'B', 'C']}` なら `hints` も 3 個、各 keyword の気づきに対応させる
- 学習者は「何を書けば正解か」を keyword 単位で把握する。順序依存にしない
- 5 個以上の keyword は問題そのものが複雑すぎる合図 — 分割を検討

## テスト

- Unit: `npx vitest run`
- E2E: `npx playwright test`（要 dev サーバー）
- 全チャレンジコードのトランスパイル検証: `editor-validation.test.ts`

## Git ワークフロー

- コミットメッセージ: 日本語、簡潔
- `Co-Authored-By` / 絵文字 / `Generated with Claude Code` を含めない
- `git add .` より対象ファイル明示を優先
- push 前にビルド + テスト通過を確認

## 教材更新時のルール

教材ページの追加・更新・修正を伴う PR では、`client/src/data/announcements.ts` の `ANNOUNCEMENTS` 配列の **先頭** にエントリを追加する（TOP の「最新のお知らせ」に表示される）。

- `id`: `YYYY-MM-DD-kebab-case-slug` 形式
- `date`: 当日の日付（`YYYY-MM-DD`）
- `category`: `feature`（新ページ） / `update`（既存ページ更新） / `fix`（誤記訂正） / `release`（大型変更）
- `title`: 「何が」分かる短いタイトル
- `description`: 「どこに」「どんな効果が」を 1〜2 文で
- `link`: 該当ページの最も具体的なパス（教材一覧ではなく実ページに直接ジャンプできるもの）

複数ページにまたがる更新でも、それぞれ別エントリとして登録した方が発見性が高い（一覧画面で個別にリンクできるため）。
<!-- claude-memory-sync: auto-generated -->

## グローバル設計方針

# グローバル設計方針

## コンポーネント設計
- 単一責任。1コンポーネント1責務
- Props は必ず型定義。any 禁止
- 副作用は hooks に分離する

## 命名規則
- コンポーネント: PascalCase
- hooks: use プレフィックス
- 定数: UPPER_SNAKE_CASE

## Claude への指示スタイル
- 差分だけ返す。ファイル全体を返さない
- 変更理由を1行コメントで添える
- 選択肢がある場合は推奨を1つ明示してから提示する

## 禁止パターン
- any の使用
- console.log の commit
- ハードコードされた文字列（i18n対象はすべて定数化）

---
<!-- このファイルは claude-memory-sync が管理します -->
<!-- 自由に編集してください。cm コマンドで同期されます -->

