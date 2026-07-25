---
title: "無料フロントエンド教材「Dev Album」を作った"
emoji: "📘"
type: "idea"
topics: ["react", "nextjs", "threejs", "frontend"]
published: false
---

## 作ったもの

**Dev Album** — Git・React・Claude Code・Three.js を起点に、AI・ML / UX デザイン / API 設計 / Vue・Nuxt / インフラ / 開発フローまで広がった技術領域を、ステップバイステップで体系的に学べる Web 教材です。

https://dev-album.vercel.app

![Dev Album トップページ](スクショURL_1)

無料・アカウント不要。ブラウザだけで学習を始められます。

---

## なぜ作ったか

フロントエンド開発を学ぼうとすると、こういう状況になりがちです。

- React のチュートリアルを終えたけど、Git でチーム開発する方法がわからない
- Next.js を学んでも、デプロイや CI/CD との繋げ方が見えない
- Storybook の存在は知っているけど、デザイナーとして何をすればいいのかわからない
- アクセシビリティが大事なのはわかるけど、具体的に何をすればいいのか

技術は単体では力にならない。**繋がりの中で初めて実務に使える**ようになります。

既存の教材の多くは「React 入門」「Git 入門」と個別に閉じていて、横断的に結びつける教材が少ない。特に**デザイナーがコードに参加するための導線**はほとんどありませんでした。

Dev Album は、環境構築からデプロイ・チーム開発までの道筋を一本のラインで描くことを目指して作りました。

---

## 主なマニュアル

ここでは初期からある 4 つを紹介します（現在は AI・ML / UX デザイン / API 設計 / Vue・Nuxt / インフラ / 開発フローの各マニュアルも加わっています）。

### Git / GitHub 入門（27 ステップ）

Git の基本操作からブランチ戦略、GitHub PR 運用、AI エージェント連携まで。ターミナル操作が初めての方でも、環境構築から丁寧に解説しています。

- Git の仕組みと基本コマンド
- ブランチ・マージ・コンフリクト解決
- GitHub PR / Issue のチーム運用
- Claude Code・Cursor 等の AI エージェント連携

### React / TypeScript / Next.js 入門（69 ステップ）

コンポーネントの基本から React 19 の新機能、Next.js 15 の App Router、Storybook、デザインシステム構築、そしてアクセシビリティ・技術倫理まで。

- React 19 + TypeScript の基礎から応用
- Next.js 15 App Router / Server Components / PPR
- CSS Modules / Tailwind / MUI / styled-components
- Storybook（Figma 連携・Chromatic）
- Flexbox / CSS Grid 完全ガイド
- Dialog・Snackbar・Form の設計パターン
- セマンティック HTML・ARIA・Table 設計の全課題
- ダークパターン回避と技術倫理

### Three.js / React Three Fiber 入門（23 ステップ）

Web ブラウザで 3D 表現を実現するための入門。シーン構築からライティング、React Three Fiber、飛行シミュレーション開発まで。

- Three.js のシーン・カメラ・レンダラー
- ジオメトリ・マテリアル・ライト・アニメーション
- React Three Fiber + drei ヘルパー
- 飛行シミュレーション（地形生成・物理演算・HUD）

### Claude Code & tmux ガイド（44 ステップ）

AI を開発ワークフローに組み込むための実践ガイド。Claude Code CLI の基本から MCP サーバー、tmux によるマルチセッション管理、CI/CD パイプラインまで。

- Claude Code CLI の導入と活用
- MCP サーバー・カスタムスキル
- tmux セットアップと効率化
- Hooks・GitHub Actions・ヘッドレスモード

---

## こだわった学習体験

「コードを読むだけ」の教材にはしたくなかった。手を動かして、結果を即座に確認できる体験を重視しています。

### ライブコードエディタ

コードを左に書くと、右にリアルタイムでプレビューが表示されます。環境構築なしでブラウザだけで実験できます。

![コードエディタとプレビューの左右分割](スクショURL_2)

シンタックスハイライト付きで、コードの構造が視覚的にわかります。Sucrase でブラウザ内トランスパイルし、セルフホストした React 18 UMD（`/vendor/`）でプレビュー表示しています。

### 3D プレビュー

Three.js のコードも左右分割。コードの横で 3D シーンをドラッグ回転・ズームしながら確認できます。

![Three.js の3Dプレビュー](スクショURL_3)

### コーディングチャレンジ

各ステップにチャレンジ問題を配置。ヒントは段階的に表示され、模範解答も確認可能。キーワードベースの柔い判定で、完全一致でなくても正解になります。

![コーディングチャレンジ](スクショURL_4)

### クイズ・FAQ

知識の定着を確認するクイズと、つまずきやすいポイントを FAQ で解消。

---

## デザイナーとエンジニアの架け橋

Dev Album で最もこだわった部分です。

### Storybook セクション（6 ページ）

Figma ユーザーのメンタルモデルから出発し、Storybook が「なぜ必要か」「何ができるか」を**視覚的に**体験できるようにしました。

![Storybook Controls 体験](スクショURL_5)

- Figma のコンポーネント → Storybook の Story への対応
- Controls パネル（コードなしで Props を操作）
- デザイントークン → CSS 変数 → コンポーネントの対応表
- Visual Regression テスト（Chromatic）の before/after

### アクセシビリティ実践（3 ページ）

色のコントラストだけではない、網羅的なアクセシビリティ対応を扱っています。

- **セマンティック HTML と ARIA** — ランドマーク要素、aria-label/labelledby/describedby、フォーカス管理、スクリーンリーダーテスト
- **Table 設計の全課題** — ellipsis を安易に使うべきでない理由、横スクロールの判断基準、入れ子テーブルの代替案、レスポンシブテーブル戦略
- **Form のアクセシビリティ** — placeholder 依存の危険性、エラーメッセージの伝達、カスタム select の a11y 地獄

### ダークパターン回避と技術倫理

代表的なダークパターン 10 種を視覚例付きで解説し、Cookie バナーの NG/OK 比較、Confirmshaming の問題、WCAG 2.2 準拠の意義、障害者差別解消法との関係まで踏み込みました。

**アクセシビリティは権利であり、オプションではない** — この視座を、デザイナーもエンジニアも共有できる教材を目指しました。

---

## 技術スタック

| 技術 | 用途 |
|------|------|
| React 19 + TypeScript | フロントエンドフレームワーク |
| Vite | ビルドツール + HMR |
| Tailwind CSS | スタイリング |
| Sucrase | ブラウザ内 JSX トランスパイル（プレビュー用） |
| React Three Fiber | Three.js の React バインディング（3D プレビュー） |
| prism-react-renderer | シンタックスハイライト（エディタ・コードブロック） |
| wouter | 軽量ルーティング |
| Vercel | ホスティング + SPA デプロイ |

プレビューは `srcDoc` iframe + `sandbox="allow-scripts allow-same-origin"` で安全に分離。React（18.3.1 UMD）と Three.js（0.160.1 UMD）は `/vendor/` にセルフホストして読み込みます（React 19・Three.js 0.161+ は UMD ビルドを廃止したため。CSP の `script-src 'self'` で外部ホストのスクリプトは構造的に読み込みません）。

---

## おわりに

Dev Album は、自分自身がフロントエンド開発を学ぶ中で「こういう教材がほしかった」と思ったものを形にしたプロジェクトです。

- 全ステップ無料
- アカウント不要、ブラウザだけで学習開始
- デザイナーもエンジニアも対象
- ブックマーク・進捗管理機能付き
- ダークモード対応

フィードバック・バグ報告は GitHub Issue で受け付けています。フォーム形式で、スクショを貼るだけで報告できます。

https://dev-album.vercel.app/bug-report

ソースコードは GitHub で公開しています。

https://github.com/BoxPistols/dev-album

![ダークモード対応](スクショURL_6)

何か気になった点やアイデアがあれば、Issue や コメントで教えてください。
