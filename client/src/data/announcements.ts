// 教材の更新履歴・お知らせ。新しいものを配列の先頭に追加する。

export type AnnouncementCategory =
  | "feature" // 新機能・新ページ追加
  | "update" // 既存ページの内容更新
  | "fix" // バグ修正・誤記訂正
  | "release"; // バージョンリリース・大型変更

export interface Announcement {
  // YYYY-MM-DD-kebab-case-slug 形式
  id: string;
  // YYYY-MM-DD
  date: string;
  title: string;
  description?: string;
  category: AnnouncementCategory;
  // 関連ページへの内部リンク（任意、wouter の path）
  link?: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "2026-06-20-api-design-manual",
    date: "2026-06-20",
    title: "API 設計 / OpenAPI 入門マニュアルを新設",
    description:
      "REST API 設計・OpenAPI/Swagger・API 検証をゼロから学ぶ独立マニュアル（9 セクション / 36 ページ）を追加。リソース設計・ステータスコード・エラー設計・HTTP キャッシュ・べき等キー・スキーマファースト・レート制限・Webhooks・契約テスト・Spectral Lint・認証認可・可観測性・デバッグ/GUI ツール・BE/FE 協業・デザイン(情報設計)連携・React/Next/Vue/Nuxt 実践まで体系的に扱う。",
    category: "feature",
    link: "/api",
  },
  {
    id: "2026-04-27-announcements-page",
    date: "2026-04-27",
    title: "お知らせ全件ページを追加",
    description:
      "TOP の「最新のお知らせ」からジャンプできる /announcements を新設。カテゴリフィルタと年月別グルーピングで過去の更新履歴を体系的に閲覧できる。",
    category: "feature",
    link: "/announcements",
  },
  {
    id: "2026-04-27-cmux-fact-check",
    date: "2026-04-27",
    title: "cmux 教材を実機検証で更新",
    description:
      "全 5 ページに VerifiedBox（バージョン・検証日）を追加。settings.json 改変の副作用警告と browser API の脅威モデル TL;DR、期待出力ブロックも追加。",
    category: "update",
    link: "/claude-mux/cmux/cmux-setup",
  },
  {
    id: "2026-04-26-cmux-pages-added",
    date: "2026-04-26",
    title: "cmux 教材を 5 ページ追加",
    description:
      "Intro / Setup / AgentTeams / BrowserAPI / Worktrees。cmux と tmux の使い分け、Claude Code との連携、git worktree との組み合わせを扱う。",
    category: "feature",
    link: "/claude-mux/cmux/cmux-intro",
  },
  {
    id: "2026-04-26-harness-engineering",
    date: "2026-04-26",
    title: "ハーネスエンジニアリングのページを追加",
    description:
      "Claude Code を支える「ハーネス」の概念と設計指針。コンテキストエンジニアリング・DESIGN.md と合わせて 3 ページ追加。",
    category: "feature",
    link: "/claude-mux/best-practices/harness-engineering",
  },
  {
    id: "2026-04-26-context-engineering",
    date: "2026-04-26",
    title: "コンテキストエンジニアリングのページを追加",
    description:
      "AGENTS.md / CLAUDE.md / プロンプト設計の使い分け、コンテキスト圧縮の判断軸を整理。",
    category: "feature",
    link: "/claude-mux/claude-core/context-engineering",
  },
  {
    id: "2026-04-26-design-md",
    date: "2026-04-26",
    title: "CLAUDE.md / AGENTS.md / DESIGN.md の整理",
    description:
      "3 つのマークダウン設計ファイルの責務分担と Multi-AI 環境での使い分けを解説。",
    category: "feature",
    link: "/claude-mux/multi-ai/design-md",
  },
];
