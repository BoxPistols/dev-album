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
    id: "2026-06-27-infra-devflow-visuals-handson",
    date: "2026-06-27",
    title: "インフラ / 開発フロー全ページに図解とハンズオンを追加",
    description:
      "バックエンド/インフラ/DevOps と 開発フロー/DesignOps の全 54 ページに、Mermaid による図解（構成図・フロー・シーケンス・ER 図・gitGraph）と、書いて学べるハンズオン（CLI・設定ファイル・SQL・ADR・ユーザーストーリー・ポストモーテム等）を追加。読むだけでなく、見て・手を動かして理解できる教材に強化した。",
    category: "update",
    link: "/infra",
  },
  {
    id: "2026-06-27-infra-aws-section",
    date: "2026-06-27",
    title: "インフラマニュアルに「AWS 実践入門」セクションを追加",
    description:
      "バックエンド / インフラ / DevOps マニュアルに AWS の実践セクション（7 ページ）を追加。主要サービスの全体像・アカウント設計と IAM・ネットワークと VPC・コンピュート（EC2 / ECS / Lambda）・ストレージと配信（S3 / CloudFront）・データベース（RDS / Aurora / DynamoDB）・コスト管理と Well-Architected まで、代表的なハイパースケーラーを地図として学べる。",
    category: "update",
    link: "/infra/aws/overview",
  },
  {
    id: "2026-06-27-infra-devops-manual",
    date: "2026-06-27",
    title: "バックエンド / インフラ / DevOps マニュアルを新設",
    description:
      "フロントの先にあるインフラ領域を扱う独立マニュアル（9 セクション / 27 ページ）を追加。クラウドの全体像・Vercel / Netlify / Cloudflare のホスティング・CDN とエッジ・Supabase / Firebase（BaaS）・PostgreSQL / ORM / サーバーレス DB・BFF と認証・CI/CD / IaC / コンテナ・可観測性と SRE まで通しで学べる。",
    category: "feature",
    link: "/infra",
  },
  {
    id: "2026-06-27-devflow-designops-manual",
    date: "2026-06-27",
    title: "開発フロー / チーム / DesignOps マニュアルを新設",
    description:
      "チーム開発の進め方を扱う独立マニュアル（7 セクション / 21 ページ）を追加。アジャイル・スクラム・カンバン・バックログと見積もり・DevOps 文化と DORA メトリクス・ブランチ戦略・コードレビューと PR 運用・DesignOps とデザインレビュー・ふりかえりとインシデント対応まで体系的に学べる。",
    category: "feature",
    link: "/devflow",
  },
  {
    id: "2026-06-21-vue-nuxt-manual",
    date: "2026-06-21",
    title: "Vue 3 / Nuxt マニュアルを新設",
    description:
      "React マニュアルと並ぶ独立マニュアルとして Vue 3 / Nuxt 入門（8 セクション / 22 ページ）を追加。Vue の基礎・Composition API・Pinia・Vue Router・Nuxt 4・server/api・SSR/SSG/ISR・デプロイ・Vue 3.5 の最新機能まで実践的に学べる。",
    category: "feature",
    link: "/vue",
  },
  {
    id: "2026-06-20-api-data-modeling",
    date: "2026-06-20",
    title: "API マニュアルにデータモデリング・設計フロー編を追加",
    description:
      "ER図・モデル定義・要件からモデル/API への基本的な設計フローを扱う新セクション（4 ページ）を追加。エンティティとリレーション・正規化・要件→概念/論理/物理モデル→API リソース設計の流れを、実践例つきで学べる。",
    category: "feature",
    link: "/api/data-modeling/er-diagram",
  },
  {
    id: "2026-06-20-api-quickstart",
    date: "2026-06-20",
    title: "API マニュアルに FE 向けクイックスタートを追加",
    description:
      "バックエンドやデータベースが苦手なフロントエンドエンジニアが、現場で急いで API 設計・連携を学ぶための「要点を絞った一貫した学習フロー」を追加。最小限の BE/DB メンタルモデルと、最短ルートの読む順序を示す。",
    category: "feature",
    link: "/api/quickstart",
  },
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
