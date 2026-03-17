# Dev Album — プロジェクト CLAUDE.md

## プロジェクト概要

Web 開発の実践リファレンス。React・Git・Three.js・Claude Code の 4 領域を、Web 標準とアクセシビリティの観点を含めて解説する技術マニュアル。W3Schools の構成を参考にしつつ、品質設計・a11y をより深く扱う。

- URL: https://dev-album.vercel.app
- リポジトリ: https://github.com/BoxPistols/unified-manual
- スタック: React 19 + TypeScript + Vite + Tailwind CSS

### コアバリュー
1. **Web 標準**: セマンティック HTML、WCAG 準拠、正しいマークアップ
2. **アクセシビリティ**: 色覚多様性、キーボード操作、スクリーンリーダー対応
3. **品質設計**: ダークパターン回避、Table/Dialog/Form の正しい設計
4. **実践**: コードを書いて結果を見る、読むだけで終わらない

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
    ├── react/      React マニュアル（69 ステップ）
    ├── git/        Git マニュアル（27 ステップ）
    ├── threejs/    Three.js マニュアル（23 ステップ）
    ├── claude-mux/ Claude Code マニュアル（44 ステップ）
    ├── Training.tsx  UI トレーニング（40 問）
    ├── Landing.tsx   LP
    └── BugReport.tsx バグ報告
```

## カラートークン

### ライトモード

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #2563EB | アクション、リンク、フォーカスリング |
| --foreground | #0F172A | 見出し、本文テキスト |
| --muted-foreground | #64748B | 補助テキスト、プレースホルダー |
| --background | #FFFFFF | ページ背景 |
| --card | #FFFFFF | カード背景 |
| --muted | #F1F5F9 | セクション背景、無効状態 |
| --border | #E2E8F0 | ボーダー、セパレーター |
| --accent | #7C3AED | バッジ、アクセント |
| --cta | #F97316 | CTA ボタン |

### ダークモード

| トークン | 値 | 用途 |
|---------|-----|------|
| --primary | #7CB3E8 | アクション、リンク |
| --foreground | #CDD5E0 | 本文テキスト |
| --muted-foreground | #8B99AD | 補助テキスト |
| --background | #151D2B | ページ背景 |
| --card | #1C2737 | カード背景 |
| --muted | #283545 | セクション背景 |
| --border | #283545 | ボーダー |

### マニュアル別アクセントカラー

| マニュアル | テキスト | 背景 | 用途 |
|-----------|---------|------|------|
| Git | rose-600 / rose-300 | bg-rose-500 | Git セクション |
| React | indigo-600 / indigo-300 | bg-indigo-500 | React セクション |
| Claude Code | violet-600 / violet-300 | bg-violet-500 | Claude Code セクション |
| Three.js | teal-600 / teal-300 | bg-teal-500 | Three.js セクション |

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

## テスト

- Unit: `npx vitest run`（176 テスト）
- E2E: `npx playwright test`（14 テスト、要 dev サーバー）
- 全チャレンジコードのトランスパイル検証: `editor-validation.test.ts`

## Git ワークフロー

- コミットメッセージ: 日本語、簡潔
- `Co-Authored-By` / 絵文字 / `Generated with Claude Code` を含めない
- `git add .` より対象ファイル明示を優先
- push 前にビルド + テスト通過を確認
