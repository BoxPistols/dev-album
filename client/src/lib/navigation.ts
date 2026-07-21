export type ManualId = 'react' | 'git' | 'threejs' | 'claude-mux' | 'ai-ml' | 'ux-design' | 'api' | 'vue' | 'infra' | 'devflow';

export interface ManualInfo {
  id: ManualId;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
}

export interface SectionInfo {
  id: string;
  title: string;
  manualId: ManualId;
  part?: string;
  description?: string;
  colorScheme?: string;
}

export interface PageInfo {
  step: number;
  path: string;
  title: string;
  sectionId: string;
  manualId: ManualId;
}

// ── マニュアル定義 ──

export const manuals: ManualInfo[] = [
  {
    id: 'git',
    title: 'Git / GitHub 入門',
    shortTitle: 'Git',
    description: 'Git・GitHub・AIエージェント連携の学習ガイド',
    icon: 'G',
    color: '#F43F5E',
  },
  {
    id: 'react',
    title: 'React / TypeScript / Next.js 入門',
    shortTitle: 'React',
    description: 'React・TypeScript・Next.js の実践マニュアル',
    icon: 'R',
    color: '#6366F1',
  },
  {
    id: 'claude-mux',
    title: 'Claude Code & 開発環境',
    shortTitle: 'Claude Code',
    description: 'Claude Code と AI コーディングエージェント・CI/CD の実践ガイド',
    icon: 'C',
    color: '#8B5CF6',
  },
  {
    id: 'threejs',
    title: 'Three.js / React Three Fiber 入門',
    shortTitle: 'Three.js',
    description: '3Dグラフィックスとインタラクティブ開発',
    icon: '3',
    color: '#14B8A6',
  },
  {
    id: 'ai-ml',
    title: 'AI / Python / 機械学習',
    shortTitle: 'AI・ML',
    description: 'Python・機械学習・LLM・LMOps の基礎',
    icon: 'A',
    color: '#F59E0B',
  },
  {
    id: 'ux-design',
    title: 'UX デザイン入門',
    shortTitle: 'UX Design',
    description: 'ユーザーリサーチからプロトタイピング・評価まで',
    icon: 'U',
    color: '#EC4899',
  },
  {
    id: 'api',
    title: 'API 設計 / OpenAPI 入門',
    shortTitle: 'API 設計',
    description: 'REST API 設計・OpenAPI/Swagger・API 検証をゼロから学ぶ',
    icon: '{}',
    color: '#10B981',
  },
  {
    id: 'vue',
    title: 'Vue 3 / Nuxt 入門',
    shortTitle: 'Vue / Nuxt',
    description: 'Vue 3・Composition API・Pinia・Nuxt を実践的に学ぶ',
    icon: 'V',
    color: '#42B883',
  },
  {
    id: 'infra',
    title: 'バックエンド / インフラ / DevOps 入門',
    shortTitle: 'Infra / DevOps',
    description: 'ホスティング・エッジ・BaaS・DB・BFF・CI/CD まで、フロントの先を学ぶ',
    icon: '☁',
    color: '#0EA5E9',
  },
  {
    id: 'devflow',
    title: '開発フロー / チーム / DesignOps 入門',
    shortTitle: '開発フロー',
    description: 'アジャイル・スクラム・DevOps・コードレビュー・DesignOps を学ぶ',
    icon: '⟳',
    color: '#F97316',
  },
];

// ── セクション定義 ──

export const sections: SectionInfo[] = [
  // === React マニュアル ===
  { id: 'react-intro', title: 'はじめに', manualId: 'react', part: 'react' },
  { id: 'react-basics', title: 'React の基本', manualId: 'react', part: 'react' },
  { id: 'state-events', title: '状態管理とイベント', manualId: 'react', part: 'react' },
  { id: 'hooks-deep', title: 'Hooks 深掘り', manualId: 'react', part: 'react' },
  { id: 'react19', title: 'React 19 新機能', manualId: 'react', part: 'react' },
  { id: 'css-basics', title: 'CSS スタイリング基礎', manualId: 'react', part: 'react' },
  { id: 'tailwind', title: 'Tailwind CSS', manualId: 'react', part: 'react' },
  { id: 'mui', title: 'MUI (Material UI)', manualId: 'react', part: 'react' },
  { id: 'practice-app', title: '実践アプリ制作', manualId: 'react', part: 'react' },
  { id: 'api-design', title: '本格 API 連携', manualId: 'react', part: 'react' },
  { id: 'nextjs-basics', title: 'Next.js 基礎', manualId: 'react', part: 'nextjs' },
  { id: 'nextjs-server', title: 'Server / Client Components', manualId: 'react', part: 'nextjs' },
  { id: 'nextjs-practice', title: 'Next.js 実践', manualId: 'react', part: 'nextjs' },
  { id: 'nextjs-advanced', title: 'Next.js 15 新機能', manualId: 'react', part: 'nextjs' },
  { id: 'nextjs-css', title: 'Next.js + CSS 統合', manualId: 'react', part: 'nextjs' },
  { id: 'deploy', title: 'デプロイと総まとめ', manualId: 'react', part: 'nextjs' },
  { id: 'storybook', title: 'Storybook', manualId: 'react', part: 'storybook' },
  { id: 'architecture', title: 'アーキテクチャとデザインシステム', manualId: 'react', part: 'architecture' },
  { id: 'css-layout', title: 'CSS レイアウト実践', manualId: 'react', part: 'quality' },
  { id: 'ui-patterns', title: 'UI コンポーネント設計', manualId: 'react', part: 'quality' },
  { id: 'accessibility', title: 'アクセシビリティ実践', manualId: 'react', part: 'quality' },
  { id: 'web-quality', title: 'Web 品質と技術倫理', manualId: 'react', part: 'quality' },
  { id: 'design-tokens', title: 'デザイントークンとダークモード', manualId: 'react', part: 'quality' },
  { id: 'cdd-flow', title: 'コンポーネント駆動開発', manualId: 'react', part: 'quality' },

  // === Git マニュアル ===
  { id: 'git-intro', title: 'はじめに', manualId: 'git' },
  { id: 'environment', title: '環境準備', manualId: 'git' },
  { id: 'github-basics', title: 'GitHub 基礎', manualId: 'git' },
  { id: 'markdown-prompt', title: 'Markdown/プロンプト', manualId: 'git' },
  { id: 'git-workflow', title: 'Git ワークフロー実践', manualId: 'git' },
  { id: 'react-practice', title: 'React 実践', manualId: 'git' },
  { id: 'advanced-setup', title: '実践的な環境構築', manualId: 'git' },
  { id: 'ai-agent', title: 'AI エージェント連携', manualId: 'git' },
  { id: 'github-actions', title: 'GitHub Actions / CI/CD', manualId: 'git' },
  { id: 'flow-automation', title: '開発フロー自動化とガバナンス', manualId: 'git' },

  // === Three.js マニュアル ===
  { id: 'threejs-intro', title: 'はじめに', manualId: 'threejs' },
  { id: 'basics', title: '基礎編', manualId: 'threejs' },
  { id: 'applied', title: '応用編', manualId: 'threejs' },
  { id: 'practical', title: '実践編', manualId: 'threejs' },
  { id: 'game-dev', title: '開発編', manualId: 'threejs' },

  // === Claude Code マニュアル ===
  { id: 'getting-started', title: 'はじめに', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'ガイドの目的と前提条件' },
  { id: 'claude-intro', title: 'Claude Code 導入', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'インストールと初期設定' },
  { id: 'claude-core', title: 'Claude Code コア機能', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'スラッシュコマンド・権限・CLAUDE.md' },
  { id: 'mcp', title: 'MCP連携', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'Model Context Protocol の活用' },
  { id: 'agent-extensions', title: 'エージェントの拡張', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'Subagents・Hooks・カスタムコマンド' },
  { id: 'ai-coding-agents', title: 'AI コーディングエージェント', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: '主要 AI CLI/エージェントの比較と使い分け' },
  { id: 'cmux', title: 'cmux (GUI 環境管理)', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'Ghostty ベースの macOS ネイティブ端末' },
  { id: 'reference', title: 'リファレンス', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'コマンド・設定リファレンス' },
  { id: 'best-practices', title: 'ベストプラクティス', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'トークン最適化・コンテキスト管理' },
  { id: 'hooks-advanced', title: 'Hooks 詳解', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'イベントフック・自動化' },
  { id: 'cicd-headless', title: 'CI/CD とヘッドレス運用', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'ヘッドレスモード・GitHub Actions 連携' },
  { id: 'ide-agent-teams', title: 'IDE連携とエージェント協調', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'VS Code・JetBrains・マルチエージェント' },
  { id: 'multi-ai-architecture', title: 'マルチAIアーキテクチャ', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: '複数AIの協調と統合設計' },

  // === AI / Python / 機械学習マニュアル ===
  { id: 'ai-ml-intro', title: 'はじめに', manualId: 'ai-ml' },
  { id: 'ai-overview', title: 'AI 概論', manualId: 'ai-ml' },
  { id: 'python-ml', title: 'Python for ML', manualId: 'ai-ml' },
  { id: 'ml-fundamentals', title: '機械学習の基礎', manualId: 'ai-ml' },
  { id: 'lmops', title: 'LMOps', manualId: 'ai-ml' },

  // === UX デザインマニュアル ===
  { id: 'ux-intro', title: 'はじめに', manualId: 'ux-design' },
  { id: 'ux-foundations', title: 'UX の基礎', manualId: 'ux-design' },
  { id: 'research', title: 'ユーザーリサーチ', manualId: 'ux-design' },
  { id: 'ia-wireframe', title: 'IA とワイヤーフレーム', manualId: 'ux-design' },
  { id: 'ui-design', title: 'UI デザイン', manualId: 'ux-design' },
  { id: 'prototyping', title: 'プロトタイピング', manualId: 'ux-design' },
  { id: 'for-designers', title: 'デザイナーのためのトークンとコンポーネント', manualId: 'ux-design' },
  { id: 'evaluation', title: '評価と改善', manualId: 'ux-design' },

  // === API 設計マニュアル ===
  { id: 'api-intro', title: 'はじめに', manualId: 'api' },
  { id: 'api-basics', title: 'API の基礎', manualId: 'api' },
  { id: 'data-modeling', title: 'データモデリングと設計フロー', manualId: 'api' },
  { id: 'rest-design', title: 'REST API 設計', manualId: 'api' },
  { id: 'openapi', title: 'OpenAPI / Swagger', manualId: 'api' },
  { id: 'api-build', title: 'API 構築実践', manualId: 'api' },
  { id: 'api-quality', title: 'API 検証と品質', manualId: 'api' },
  { id: 'api-collaboration', title: '設計と協業', manualId: 'api' },
  { id: 'api-practice', title: 'フロントエンド実践', manualId: 'api' },
  { id: 'api-advanced', title: '発展', manualId: 'api' },

  // === Vue / Nuxt マニュアル ===
  { id: 'vue-intro', title: 'はじめに', manualId: 'vue' },
  { id: 'vue-basics', title: 'Vue の基礎', manualId: 'vue' },
  { id: 'composition', title: 'Composition API', manualId: 'vue' },
  { id: 'state-routing', title: '状態管理とルーティング', manualId: 'vue' },
  { id: 'vue-styling', title: 'スタイリングと UI', manualId: 'vue' },
  { id: 'nuxt-basics', title: 'Nuxt 基礎', manualId: 'vue' },
  { id: 'nuxt-server', title: 'Nuxt サーバーと実践', manualId: 'vue' },
  { id: 'vue-advanced', title: '最新と総まとめ', manualId: 'vue' },

  // === バックエンド / インフラ / DevOps マニュアル ===
  { id: 'infra-intro', title: 'はじめに', manualId: 'infra' },
  { id: 'infra-foundations', title: 'インフラの全体像', manualId: 'infra' },
  { id: 'hosting', title: 'ホスティングとデプロイ', manualId: 'infra' },
  { id: 'edge-cdn', title: 'エッジと CDN', manualId: 'infra' },
  { id: 'baas', title: 'BaaS（Supabase / Firebase）', manualId: 'infra' },
  { id: 'database', title: 'データベース', manualId: 'infra' },
  { id: 'bff-backend', title: 'BFF とバックエンド設計', manualId: 'infra' },
  { id: 'devops-cicd', title: 'CI/CD と IaC', manualId: 'infra' },
  { id: 'observability', title: '可観測性と運用', manualId: 'infra' },
  { id: 'aws', title: 'AWS 実践入門', manualId: 'infra' },

  // === 開発フロー / チーム / DesignOps マニュアル ===
  { id: 'devflow-intro', title: 'はじめに', manualId: 'devflow' },
  { id: 'agile-scrum', title: 'アジャイルとスクラム', manualId: 'devflow' },
  { id: 'project-mgmt', title: 'プロジェクトマネジメント', manualId: 'devflow' },
  { id: 'devops-flow', title: 'DevOps とデリバリー', manualId: 'devflow' },
  { id: 'code-review', title: 'コードレビュー', manualId: 'devflow' },
  { id: 'designops', title: 'DesignOps とデザインフロー', manualId: 'devflow' },
  { id: 'team-quality', title: 'チーム品質とコラボレーション', manualId: 'devflow' },
];

// ── ページ定義 ──

export const pages: PageInfo[] = [
  // ===========================
  // React マニュアル (77ページ)
  // ===========================
  { step: 1, path: '/react', title: 'このマニュアルについて', sectionId: 'react-intro', manualId: 'react' },
  { step: 2, path: '/react/intro/setup', title: '環境構築', sectionId: 'react-intro', manualId: 'react' },
  { step: 3, path: '/react/react-basics/hello-react', title: 'Hello React', sectionId: 'react-basics', manualId: 'react' },
  { step: 4, path: '/react/react-basics/jsx', title: 'JSX を理解する', sectionId: 'react-basics', manualId: 'react' },
  { step: 5, path: '/react/react-basics/components', title: 'コンポーネント', sectionId: 'react-basics', manualId: 'react' },
  { step: 6, path: '/react/react-basics/props', title: 'Props', sectionId: 'react-basics', manualId: 'react' },
  { step: 7, path: '/react/react-basics/typescript', title: 'TypeScript で型をつける', sectionId: 'react-basics', manualId: 'react' },
  { step: 8, path: '/react/state-events/use-state', title: 'useState', sectionId: 'state-events', manualId: 'react' },
  { step: 9, path: '/react/state-events/events', title: 'イベントハンドリング', sectionId: 'state-events', manualId: 'react' },
  { step: 10, path: '/react/state-events/conditional-list', title: '条件分岐とリスト表示', sectionId: 'state-events', manualId: 'react' },
  { step: 11, path: '/react/state-events/forms', title: 'フォーム入門', sectionId: 'state-events', manualId: 'react' },
  { step: 12, path: '/react/hooks-deep/use-effect', title: 'useEffect', sectionId: 'hooks-deep', manualId: 'react' },
  { step: 13, path: '/react/hooks-deep/use-context', title: 'useContext', sectionId: 'hooks-deep', manualId: 'react' },
  { step: 14, path: '/react/hooks-deep/use-reducer', title: 'useReducer', sectionId: 'hooks-deep', manualId: 'react' },
  { step: 15, path: '/react/hooks-deep/memo-callback', title: 'useMemo / useCallback', sectionId: 'hooks-deep', manualId: 'react' },
  { step: 16, path: '/react/hooks-deep/custom-hooks', title: 'カスタム Hooks', sectionId: 'hooks-deep', manualId: 'react' },
  { step: 17, path: '/react/react19/hooks', title: 'React 19 の新しい Hooks', sectionId: 'react19', manualId: 'react' },
  { step: 18, path: '/react/react19/features', title: 'React 19 の新機能', sectionId: 'react19', manualId: 'react' },
  { step: 19, path: '/react/react19/upgrade', title: 'React 19 アップグレードガイド', sectionId: 'react19', manualId: 'react' },
  { step: 20, path: '/react/css-basics/plain-css', title: 'プレーン CSS と CSS Modules', sectionId: 'css-basics', manualId: 'react' },
  { step: 21, path: '/react/css-basics/css-in-js', title: 'CSS-in-JS の考え方', sectionId: 'css-basics', manualId: 'react' },
  { step: 22, path: '/react/css-basics/styled-components', title: 'styled-components', sectionId: 'css-basics', manualId: 'react' },
  { step: 23, path: '/react/css-basics/emotion', title: 'Emotion', sectionId: 'css-basics', manualId: 'react' },
  { step: 24, path: '/react/css-basics/css-patterns', title: 'CSS 設計パターン', sectionId: 'css-basics', manualId: 'react' },
  { step: 25, path: '/react/tailwind/intro', title: 'Tailwind CSS 入門', sectionId: 'tailwind', manualId: 'react' },
  { step: 26, path: '/react/tailwind/responsive-dark', title: 'レスポンシブとダークモード', sectionId: 'tailwind', manualId: 'react' },
  { step: 27, path: '/react/tailwind/shadcn', title: 'shadcn/ui', sectionId: 'tailwind', manualId: 'react' },
  { step: 28, path: '/react/mui/intro', title: 'MUI 7 入門', sectionId: 'mui', manualId: 'react' },
  { step: 29, path: '/react/mui/components', title: 'MUI コンポーネント活用', sectionId: 'mui', manualId: 'react' },
  { step: 30, path: '/react/mui/customization', title: 'MUI カスタマイズ', sectionId: 'mui', manualId: 'react' },
  { step: 31, path: '/react/practice-app/api', title: 'API 連携', sectionId: 'practice-app', manualId: 'react' },
  { step: 32, path: '/react/practice-app/routing', title: 'React Router', sectionId: 'practice-app', manualId: 'react' },
  { step: 33, path: '/react/practice-app/portfolio', title: 'ポートフォリオサイト制作', sectionId: 'practice-app', manualId: 'react' },
  { step: 34, path: '/react/api-design/graphql', title: 'GraphQL 入門', sectionId: 'api-design', manualId: 'react' },
  { step: 35, path: '/react/api-design/openapi-swagger', title: 'OpenAPI / Swagger', sectionId: 'api-design', manualId: 'react' },
  { step: 36, path: '/react/nextjs-basics/what-is-nextjs', title: 'Next.js とは', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 37, path: '/react/nextjs-basics/project-setup', title: 'Next.js プロジェクト作成', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 38, path: '/react/nextjs-basics/routing', title: 'ページとルーティング', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 39, path: '/react/nextjs-basics/layout', title: 'レイアウトとナビゲーション', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 40, path: '/react/nextjs-server/rsc', title: 'Server Components', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 41, path: '/react/nextjs-server/client', title: 'Client Components', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 42, path: '/react/nextjs-server/data-fetching', title: 'データフェッチング', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 43, path: '/react/nextjs-server/loading-error', title: 'Loading / Error UI', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 44, path: '/react/nextjs-practice/route-handlers', title: 'Route Handlers', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 45, path: '/react/nextjs-practice/server-actions', title: 'Server Actions', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 46, path: '/react/nextjs-practice/middleware', title: 'ミドルウェアと認証', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 47, path: '/react/nextjs-practice/optimization', title: '画像最適化とメタデータ', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 48, path: '/react/nextjs-advanced/next15-features', title: 'Next.js 15 の新機能', sectionId: 'nextjs-advanced', manualId: 'react' },
  { step: 49, path: '/react/nextjs-advanced/next15-ppr', title: 'Partial Pre-rendering と最新レンダリング', sectionId: 'nextjs-advanced', manualId: 'react' },
  { step: 50, path: '/react/nextjs-css/tailwind-mui', title: 'Next.js × Tailwind / MUI', sectionId: 'nextjs-css', manualId: 'react' },
  { step: 51, path: '/react/nextjs-css/css-modules-sc', title: 'Next.js × CSS Modules / styled-components', sectionId: 'nextjs-css', manualId: 'react' },
  { step: 52, path: '/react/deploy/vercel', title: 'Vercel デプロイ', sectionId: 'deploy', manualId: 'react' },
  { step: 53, path: '/react/deploy/summary', title: '総まとめと次のステップ', sectionId: 'deploy', manualId: 'react' },
  { step: 54, path: '/react/storybook/intro', title: 'Storybook とは', sectionId: 'storybook', manualId: 'react' },
  { step: 55, path: '/react/storybook/setup', title: 'Storybook 導入と初期画面', sectionId: 'storybook', manualId: 'react' },
  { step: 56, path: '/react/storybook/structure', title: 'Story の書き方と構造', sectionId: 'storybook', manualId: 'react' },
  { step: 57, path: '/react/storybook/css', title: 'CSS 環境別 Storybook 表示', sectionId: 'storybook', manualId: 'react' },
  { step: 58, path: '/react/storybook/figma', title: 'Figma 連携と Chromatic', sectionId: 'storybook', manualId: 'react' },
  { step: 59, path: '/react/storybook/advanced', title: 'Storybook 応用とカスタマイズ', sectionId: 'storybook', manualId: 'react' },
  { step: 60, path: '/react/architecture/overview', title: 'React / Next.js アーキテクチャ総論', sectionId: 'architecture', manualId: 'react' },
  { step: 61, path: '/react/architecture/design-system', title: 'デザインシステムの設計と構築', sectionId: 'architecture', manualId: 'react' },
  { step: 62, path: '/react/architecture/maintenance', title: '長期運用とチーム開発', sectionId: 'architecture', manualId: 'react' },
  { step: 63, path: '/react/css-layout/flexbox', title: 'Flexbox 完全ガイド', sectionId: 'css-layout', manualId: 'react' },
  { step: 64, path: '/react/css-layout/grid', title: 'CSS Grid 完全ガイド', sectionId: 'css-layout', manualId: 'react' },
  { step: 65, path: '/react/ui-patterns/dialog', title: 'Dialog の設計パターン', sectionId: 'ui-patterns', manualId: 'react' },
  { step: 66, path: '/react/ui-patterns/snackbar', title: 'Snackbar / Toast の設計', sectionId: 'ui-patterns', manualId: 'react' },
  { step: 67, path: '/react/ui-patterns/form-group', title: 'Form グループの構造と課題', sectionId: 'ui-patterns', manualId: 'react' },
  { step: 68, path: '/react/accessibility/semantic-aria', title: 'セマンティック HTML と ARIA', sectionId: 'accessibility', manualId: 'react' },
  { step: 69, path: '/react/accessibility/table-design', title: 'Table 設計の全課題', sectionId: 'accessibility', manualId: 'react' },
  { step: 70, path: '/react/accessibility/form-a11y', title: 'Form のアクセシビリティ', sectionId: 'accessibility', manualId: 'react' },
  { step: 71, path: '/react/web-quality/ethics', title: 'ダークパターン回避と技術倫理', sectionId: 'web-quality', manualId: 'react' },
  { step: 72, path: '/react/design-tokens/why-dark-mode', title: 'ダークモードはなぜ必要か', sectionId: 'design-tokens', manualId: 'react' },
  { step: 73, path: '/react/design-tokens/tokens-practice', title: 'デザイントークンの実践', sectionId: 'design-tokens', manualId: 'react' },
  { step: 74, path: '/react/design-tokens/dark-mode-impl', title: 'ダークモードの実装', sectionId: 'design-tokens', manualId: 'react' },
  { step: 75, path: '/react/cdd-flow/component-driven', title: 'コンポーネント駆動開発（CDD）', sectionId: 'cdd-flow', manualId: 'react' },
  { step: 76, path: '/react/cdd-flow/design-code-sync', title: 'デザインとコードの自動同期', sectionId: 'cdd-flow', manualId: 'react' },
  { step: 77, path: '/react/cdd-flow/design-qa', title: 'デザイン QA の自動化', sectionId: 'cdd-flow', manualId: 'react' },

  // ===========================
  // Git マニュアル (27ページ)
  // ===========================
  { step: 1, path: '/git', title: 'はじめに', sectionId: 'git-intro', manualId: 'git' },
  { step: 2, path: '/git/environment/prerequisites', title: '前提知識', sectionId: 'environment', manualId: 'git' },
  { step: 3, path: '/git/environment/cursor', title: 'Cursor インストール', sectionId: 'environment', manualId: 'git' },
  { step: 4, path: '/git/environment/git', title: 'Git インストール', sectionId: 'environment', manualId: 'git' },
  { step: 5, path: '/git/environment/nodejs', title: 'Node.js インストール', sectionId: 'environment', manualId: 'git' },
  { step: 6, path: '/git/github/account', title: 'GitHub アカウント作成', sectionId: 'github-basics', manualId: 'git' },
  { step: 7, path: '/git/github/setup', title: 'Git ローカル設定', sectionId: 'github-basics', manualId: 'git' },
  { step: 8, path: '/git/github/first-repo', title: '最初のリポジトリ作成', sectionId: 'github-basics', manualId: 'git' },
  { step: 9, path: '/git/github/markdown', title: 'Markdown 入門', sectionId: 'markdown-prompt', manualId: 'git' },
  { step: 10, path: '/git/markdown-prompt/prompt-engineering', title: 'プロンプトエンジニアリング入門', sectionId: 'markdown-prompt', manualId: 'git' },
  { step: 11, path: '/git/workflow/commit', title: 'ファイル作成と Commit', sectionId: 'git-workflow', manualId: 'git' },
  { step: 12, path: '/git/workflow/push-pull', title: 'Push と Pull', sectionId: 'git-workflow', manualId: 'git' },
  { step: 13, path: '/git/workflow/history', title: '差分・履歴確認', sectionId: 'git-workflow', manualId: 'git' },
  { step: 14, path: '/git/workflow/branch', title: 'ブランチの基本', sectionId: 'git-workflow', manualId: 'git' },
  { step: 15, path: '/git/react/setup', title: 'React 開発環境セットアップ', sectionId: 'react-practice', manualId: 'git' },
  { step: 16, path: '/git/react/modify', title: 'デザイン変更と Git 管理', sectionId: 'react-practice', manualId: 'git' },
  { step: 17, path: '/git/advanced/wsl2', title: 'WSL2 導入', sectionId: 'advanced-setup', manualId: 'git' },
  { step: 18, path: '/git/advanced/wsl2-ssh', title: 'WSL2 での SSH キー接続', sectionId: 'advanced-setup', manualId: 'git' },
  { step: 19, path: '/git/advanced/github-cli', title: 'GitHub CLI 導入', sectionId: 'advanced-setup', manualId: 'git' },
  { step: 20, path: '/git/advanced/linux-basics', title: 'Linux/Ubuntu 基礎', sectionId: 'advanced-setup', manualId: 'git' },
  { step: 21, path: '/git/advanced/vscode', title: 'VSCode 導入', sectionId: 'advanced-setup', manualId: 'git' },
  { step: 22, path: '/git/advanced/integration', title: '開発環境の統合確認', sectionId: 'advanced-setup', manualId: 'git' },
  { step: 23, path: '/git/ai-agent/overview', title: 'AI コーディング環境の全体像', sectionId: 'ai-agent', manualId: 'git' },
  { step: 24, path: '/git/ai-agent/claude-code-setup', title: 'Claude Code 導入', sectionId: 'ai-agent', manualId: 'git' },
  { step: 25, path: '/git/ai-agent/claude-code-basics', title: 'Claude Code 基本操作', sectionId: 'ai-agent', manualId: 'git' },
  { step: 26, path: '/git/ai-agent/cursor-cline', title: 'Cursor + Cline 導入', sectionId: 'ai-agent', manualId: 'git' },
  { step: 27, path: '/git/ai-agent/sub-tools', title: '予備ツール（Gemini / Warp / Antigravity）', sectionId: 'ai-agent', manualId: 'git' },
  { step: 28, path: '/git/github-actions/intro', title: 'GitHub Actions と CI/CD 入門', sectionId: 'github-actions', manualId: 'git' },
  { step: 29, path: '/git/github-actions/workflow-basics', title: 'ワークフローの基本構造', sectionId: 'github-actions', manualId: 'git' },
  { step: 30, path: '/git/github-actions/triggers-jobs', title: 'トリガー・ジョブ・ステップの制御', sectionId: 'github-actions', manualId: 'git' },
  { step: 31, path: '/git/github-actions/ci-practice', title: 'CI 実践：lint・test・build', sectionId: 'github-actions', manualId: 'git' },
  { step: 32, path: '/git/github-actions/secrets-cd', title: 'シークレットと環境・デプロイ（CD）', sectionId: 'github-actions', manualId: 'git' },
  { step: 33, path: '/git/github-actions/reuse-troubleshoot', title: '再利用・最適化・トラブルシュート', sectionId: 'github-actions', manualId: 'git' },
  { step: 34, path: '/git/flow-automation/why', title: 'なぜ Git フローを自動化するのか', sectionId: 'flow-automation', manualId: 'git' },
  { step: 35, path: '/git/flow-automation/auto-test-refactor', title: '自動テストと自動修正（リファクタリング）', sectionId: 'flow-automation', manualId: 'git' },
  { step: 36, path: '/git/flow-automation/labels', title: 'ラベルと分類の自動化', sectionId: 'flow-automation', manualId: 'git' },
  { step: 37, path: '/git/flow-automation/assignment', title: 'アサインとレビューの自動割り当て', sectionId: 'flow-automation', manualId: 'git' },
  { step: 38, path: '/git/flow-automation/projects', title: 'GitHub Projects 連携', sectionId: 'flow-automation', manualId: 'git' },
  { step: 39, path: '/git/flow-automation/merge-governance', title: 'マージガバナンス（意図せぬマージの防止）', sectionId: 'flow-automation', manualId: 'git' },

  // ===========================
  // Three.js マニュアル (23ページ)
  // ===========================
  { step: 1, path: '/threejs', title: 'はじめに', sectionId: 'threejs-intro', manualId: 'threejs' },
  { step: 2, path: '/threejs/basics/scene', title: 'シーンを作ろう', sectionId: 'basics', manualId: 'threejs' },
  { step: 3, path: '/threejs/basics/camera', title: 'カメラを理解する', sectionId: 'basics', manualId: 'threejs' },
  { step: 4, path: '/threejs/basics/renderer', title: 'レンダラーの仕組み', sectionId: 'basics', manualId: 'threejs' },
  { step: 5, path: '/threejs/basics/geometry', title: 'ジオメトリ（形）', sectionId: 'basics', manualId: 'threejs' },
  { step: 6, path: '/threejs/basics/material', title: 'マテリアル（質感）', sectionId: 'basics', manualId: 'threejs' },
  { step: 7, path: '/threejs/basics/light', title: 'ライト（光）', sectionId: 'basics', manualId: 'threejs' },
  { step: 8, path: '/threejs/basics/animation', title: 'アニメーション', sectionId: 'basics', manualId: 'threejs' },
  { step: 9, path: '/threejs/applied/textures', title: 'テクスチャ', sectionId: 'applied', manualId: 'threejs' },
  { step: 10, path: '/threejs/applied/model-loading', title: '3D モデル読み込み', sectionId: 'applied', manualId: 'threejs' },
  { step: 11, path: '/threejs/applied/interaction', title: 'インタラクション', sectionId: 'applied', manualId: 'threejs' },
  { step: 12, path: '/threejs/applied/responsive', title: 'レスポンシブ対応', sectionId: 'applied', manualId: 'threejs' },
  { step: 13, path: '/threejs/applied/orbit-controls', title: 'OrbitControls', sectionId: 'applied', manualId: 'threejs' },
  { step: 14, path: '/threejs/applied/post-processing', title: 'ポストプロセシング入門', sectionId: 'applied', manualId: 'threejs' },
  { step: 15, path: '/threejs/practical/r3f-basics', title: 'React Three Fiber 入門', sectionId: 'practical', manualId: 'threejs' },
  { step: 16, path: '/threejs/practical/r3f-drei', title: 'drei ヘルパー活用', sectionId: 'practical', manualId: 'threejs' },
  { step: 17, path: '/threejs/practical/portfolio-scene', title: 'ポートフォリオ 3D シーン作成', sectionId: 'practical', manualId: 'threejs' },
  { step: 18, path: '/threejs/game-dev/overview', title: 'ゲーム設計の全体像', sectionId: 'game-dev', manualId: 'threejs' },
  { step: 19, path: '/threejs/game-dev/aircraft', title: '飛行機モデルと操作', sectionId: 'game-dev', manualId: 'threejs' },
  { step: 20, path: '/threejs/game-dev/terrain', title: '地形と空の環境', sectionId: 'game-dev', manualId: 'threejs' },
  { step: 21, path: '/threejs/game-dev/physics', title: '飛行物理シミュレーション', sectionId: 'game-dev', manualId: 'threejs' },
  { step: 22, path: '/threejs/game-dev/camera', title: 'カメラ追従と視点切替', sectionId: 'game-dev', manualId: 'threejs' },
  { step: 23, path: '/threejs/game-dev/hud-gameloop', title: 'HUD・スコア・ゲームループ', sectionId: 'game-dev', manualId: 'threejs' },

  // ===========================
  // Claude Code マニュアル (40ページ)
  // ===========================
  { step: 1, path: '/claude-mux', title: 'このガイドの目的', sectionId: 'getting-started', manualId: 'claude-mux' },
  { step: 2, path: '/claude-mux/getting-started/why-claude-code', title: 'なぜClaude Codeなのか', sectionId: 'getting-started', manualId: 'claude-mux' },
  { step: 3, path: '/claude-mux/claude-intro/claude-code-intro', title: 'Claude Code CLI の概要', sectionId: 'claude-intro', manualId: 'claude-mux' },
  { step: 4, path: '/claude-mux/claude-intro/install-setup', title: 'インストールと初期設定', sectionId: 'claude-intro', manualId: 'claude-mux' },
  { step: 5, path: '/claude-mux/claude-intro/slash-commands', title: 'スラッシュコマンドの活用', sectionId: 'claude-intro', manualId: 'claude-mux' },
  { step: 6, path: '/claude-mux/claude-core/context-management', title: 'コンテキスト管理', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 7, path: '/claude-mux/claude-core/context-engineering', title: 'コンテキストエンジニアリング', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 8, path: '/claude-mux/claude-core/security-permissions', title: 'セキュリティと権限設定', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 9, path: '/claude-mux/claude-core/token-optimization', title: 'トークン消費の最適化', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 10, path: '/claude-mux/claude-core/extended-thinking', title: '拡張思考とモデル選択', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 11, path: '/claude-mux/mcp/mcp-setup', title: 'MCP (Model Context Protocol)', sectionId: 'mcp', manualId: 'claude-mux' },
  { step: 12, path: '/claude-mux/mcp/mcp-practical', title: '実践的な MCP 連携', sectionId: 'mcp', manualId: 'claude-mux' },
  { step: 13, path: '/claude-mux/agent-extensions/subagents', title: 'Subagents による並列処理', sectionId: 'agent-extensions', manualId: 'claude-mux' },
  { step: 14, path: '/claude-mux/agent-extensions/custom-skills', title: 'Skills・コマンド・Hooks', sectionId: 'agent-extensions', manualId: 'claude-mux' },
  { step: 15, path: '/claude-mux/ai-coding-agents/gemini-cli', title: 'Gemini CLI', sectionId: 'ai-coding-agents', manualId: 'claude-mux' },
  { step: 16, path: '/claude-mux/ai-coding-agents/openai-codex', title: 'OpenAI Codex', sectionId: 'ai-coding-agents', manualId: 'claude-mux' },
  { step: 17, path: '/claude-mux/ai-coding-agents/github-copilot', title: 'GitHub Copilot', sectionId: 'ai-coding-agents', manualId: 'claude-mux' },
  { step: 18, path: '/claude-mux/ai-coding-agents/amazon-q-developer', title: 'Amazon Q Developer', sectionId: 'ai-coding-agents', manualId: 'claude-mux' },
  { step: 19, path: '/claude-mux/ai-coding-agents/choosing-tools', title: 'ツールの選び方と使い分け', sectionId: 'ai-coding-agents', manualId: 'claude-mux' },
  { step: 20, path: '/claude-mux/cmux/cmux-intro', title: 'cmux: GUI ベースのエージェント管理', sectionId: 'cmux', manualId: 'claude-mux' },
  { step: 21, path: '/claude-mux/cmux/cmux-setup', title: 'cmux のセットアップと活用', sectionId: 'cmux', manualId: 'claude-mux' },
  { step: 22, path: '/claude-mux/cmux/agent-teams', title: 'cmux と Agent Teams', sectionId: 'cmux', manualId: 'claude-mux' },
  { step: 23, path: '/claude-mux/cmux/browser-api', title: 'ビルトインブラウザと Scriptable API', sectionId: 'cmux', manualId: 'claude-mux' },
  { step: 24, path: '/claude-mux/cmux/worktrees', title: 'cmux と git worktree', sectionId: 'cmux', manualId: 'claude-mux' },
  { step: 25, path: '/claude-mux/reference/troubleshooting', title: 'トラブルシューティング', sectionId: 'reference', manualId: 'claude-mux' },
  { step: 26, path: '/claude-mux/reference/claude-cheatsheet', title: 'Claude Code チートシート', sectionId: 'reference', manualId: 'claude-mux' },
  { step: 27, path: '/claude-mux/best-practices/harness-engineering', title: 'ハーネスエンジニアリング', sectionId: 'best-practices', manualId: 'claude-mux' },
  { step: 28, path: '/claude-mux/best-practices/effective-workflows', title: '効果的なワークフロー', sectionId: 'best-practices', manualId: 'claude-mux' },
  { step: 29, path: '/claude-mux/best-practices/spec-driven-dev', title: '仕様駆動開発 (SDD)', sectionId: 'best-practices', manualId: 'claude-mux' },
  { step: 30, path: '/claude-mux/best-practices/testing-debugging', title: 'テストとデバッグの戦略', sectionId: 'best-practices', manualId: 'claude-mux' },
  { step: 31, path: '/claude-mux/hooks-advanced/hooks-guide', title: 'Hooks の設計と実装', sectionId: 'hooks-advanced', manualId: 'claude-mux' },
  { step: 32, path: '/claude-mux/hooks-advanced/hooks-recipes', title: 'Hooks 実践レシピ', sectionId: 'hooks-advanced', manualId: 'claude-mux' },
  { step: 33, path: '/claude-mux/ci-cd/github-actions', title: 'GitHub Actions 連携', sectionId: 'cicd-headless', manualId: 'claude-mux' },
  { step: 34, path: '/claude-mux/ci-cd/headless-mode', title: 'ヘッドレスモードと自動化', sectionId: 'cicd-headless', manualId: 'claude-mux' },
  { step: 35, path: '/claude-mux/ide-agent-teams/ide-integration', title: 'VS Code・JetBrains 連携', sectionId: 'ide-agent-teams', manualId: 'claude-mux' },
  { step: 36, path: '/claude-mux/ide-agent-teams/agent-orchestration', title: 'エージェントチームの協調', sectionId: 'ide-agent-teams', manualId: 'claude-mux' },
  { step: 37, path: '/claude-mux/ide-agent-teams/plugins-ecosystem', title: 'プラグインとエコシステム', sectionId: 'ide-agent-teams', manualId: 'claude-mux' },
  { step: 38, path: '/claude-mux/multi-ai/multi-ai-coexistence', title: 'マルチAIツールの共存戦略', sectionId: 'multi-ai-architecture', manualId: 'claude-mux' },
  { step: 39, path: '/claude-mux/multi-ai/single-source-of-truth', title: 'シングルソースオブトゥルース設計', sectionId: 'multi-ai-architecture', manualId: 'claude-mux' },
  { step: 40, path: '/claude-mux/multi-ai/design-md', title: 'CLAUDE.md / AGENTS.md / DESIGN.md', sectionId: 'multi-ai-architecture', manualId: 'claude-mux' },

  // ===========================
  // AI / Python / 機械学習マニュアル (8ページ)
  // ===========================
  { step: 1, path: '/ai-ml', title: 'このマニュアルについて', sectionId: 'ai-ml-intro', manualId: 'ai-ml' },
  { step: 2, path: '/ai-ml/ai-overview/landscape', title: 'AI・ML・DL・LLM の全体像', sectionId: 'ai-overview', manualId: 'ai-ml' },
  { step: 3, path: '/ai-ml/ai-overview/ml-concepts', title: '機械学習の基礎概念', sectionId: 'ai-overview', manualId: 'ai-ml' },
  { step: 4, path: '/ai-ml/python-ml/python-setup', title: 'Python 環境構築', sectionId: 'python-ml', manualId: 'ai-ml' },
  { step: 5, path: '/ai-ml/python-ml/python-basics', title: 'Python 基本文法', sectionId: 'python-ml', manualId: 'ai-ml' },
  { step: 6, path: '/ai-ml/python-ml/data-libraries', title: 'NumPy・Pandas・Matplotlib', sectionId: 'python-ml', manualId: 'ai-ml' },
  { step: 7, path: '/ai-ml/python-ml/python-practice', title: 'Python 実践ユースケース', sectionId: 'python-ml', manualId: 'ai-ml' },
  { step: 8, path: '/ai-ml/ml-fundamentals/supervised', title: '教師あり学習の実践', sectionId: 'ml-fundamentals', manualId: 'ai-ml' },
  { step: 9, path: '/ai-ml/ml-fundamentals/deep-learning', title: 'ディープラーニング入門', sectionId: 'ml-fundamentals', manualId: 'ai-ml' },
  { step: 10, path: '/ai-ml/lmops/llm-basics', title: 'LLM の仕組みと活用', sectionId: 'lmops', manualId: 'ai-ml' },
  { step: 11, path: '/ai-ml/lmops/lmops-workflow', title: 'LMOps ワークフロー', sectionId: 'lmops', manualId: 'ai-ml' },

  // ===========================
  // UX デザインマニュアル (15ページ)
  // ===========================
  { step: 1, path: '/ux-design', title: 'このマニュアルについて', sectionId: 'ux-intro', manualId: 'ux-design' },
  { step: 2, path: '/ux-design/ux-foundations/what-is-ux', title: 'UX デザインとは', sectionId: 'ux-foundations', manualId: 'ux-design' },
  { step: 3, path: '/ux-design/ux-foundations/design-process', title: 'デザインプロセスの全体像', sectionId: 'ux-foundations', manualId: 'ux-design' },
  { step: 4, path: '/ux-design/ux-foundations/design-thinking', title: 'デザイン思考', sectionId: 'ux-foundations', manualId: 'ux-design' },
  { step: 5, path: '/ux-design/research/user-research', title: 'ユーザーリサーチ手法', sectionId: 'research', manualId: 'ux-design' },
  { step: 6, path: '/ux-design/research/persona-journey', title: 'ペルソナとジャーニーマップ', sectionId: 'research', manualId: 'ux-design' },
  { step: 7, path: '/ux-design/ia-wireframe/information-architecture', title: '情報アーキテクチャ', sectionId: 'ia-wireframe', manualId: 'ux-design' },
  { step: 8, path: '/ux-design/ia-wireframe/wireframe', title: 'ワイヤーフレーム設計', sectionId: 'ia-wireframe', manualId: 'ux-design' },
  { step: 9, path: '/ux-design/ui-design/visual-design', title: 'ビジュアルデザインの原則', sectionId: 'ui-design', manualId: 'ux-design' },
  { step: 10, path: '/ux-design/ui-design/design-system', title: 'デザインシステム構築', sectionId: 'ui-design', manualId: 'ux-design' },
  { step: 11, path: '/ux-design/prototyping/figma-prototype', title: 'Figma プロトタイピング', sectionId: 'prototyping', manualId: 'ux-design' },
  { step: 12, path: '/ux-design/for-designers/design-tokens-for-designers', title: 'デザイントークン入門（デザイナー向け）', sectionId: 'for-designers', manualId: 'ux-design' },
  { step: 13, path: '/ux-design/for-designers/component-thinking', title: 'コンポーネント思考', sectionId: 'for-designers', manualId: 'ux-design' },
  { step: 14, path: '/ux-design/for-designers/ai-collaboration-with-tokens', title: 'AI 時代のデザイン共通言語', sectionId: 'for-designers', manualId: 'ux-design' },
  { step: 15, path: '/ux-design/evaluation/usability-testing', title: 'ユーザビリティテストと改善', sectionId: 'evaluation', manualId: 'ux-design' },

  // ===========================
  // API 設計マニュアル (24ページ)
  // ===========================
  { step: 1, path: '/api', title: 'このマニュアルについて', sectionId: 'api-intro', manualId: 'api' },
  { step: 2, path: '/api/quickstart', title: '現場で急ぐ人のクイックスタート（FE 向け）', sectionId: 'api-intro', manualId: 'api' },
  { step: 3, path: '/api/basics/what-is-api', title: 'API とは何か', sectionId: 'api-basics', manualId: 'api' },
  { step: 4, path: '/api/basics/http', title: 'HTTP の基礎', sectionId: 'api-basics', manualId: 'api' },
  { step: 5, path: '/api/basics/rest', title: 'REST という設計思想', sectionId: 'api-basics', manualId: 'api' },
  { step: 6, path: '/api/basics/resources', title: 'リソースと URI 設計', sectionId: 'api-basics', manualId: 'api' },
  { step: 7, path: '/api/data-modeling/er-diagram', title: 'ER図とデータモデリングの基礎', sectionId: 'data-modeling', manualId: 'api' },
  { step: 8, path: '/api/data-modeling/normalization', title: '正規化と良いモデルの指針', sectionId: 'data-modeling', manualId: 'api' },
  { step: 9, path: '/api/data-modeling/design-flow', title: '要件からモデル・API への設計フロー', sectionId: 'data-modeling', manualId: 'api' },
  { step: 10, path: '/api/data-modeling/worked-example', title: '実践: 要件から ER図・テーブル・API まで', sectionId: 'data-modeling', manualId: 'api' },
  { step: 11, path: '/api/rest-design/http-methods', title: 'HTTP メソッドの使い分け', sectionId: 'rest-design', manualId: 'api' },
  { step: 12, path: '/api/rest-design/status-codes', title: 'ステータスコード設計', sectionId: 'rest-design', manualId: 'api' },
  { step: 13, path: '/api/rest-design/request-response', title: 'リクエスト / レスポンス設計', sectionId: 'rest-design', manualId: 'api' },
  { step: 14, path: '/api/rest-design/pagination', title: 'ページネーション・フィルタ・ソート', sectionId: 'rest-design', manualId: 'api' },
  { step: 15, path: '/api/rest-design/error-handling', title: 'エラーレスポンス設計', sectionId: 'rest-design', manualId: 'api' },
  { step: 16, path: '/api/rest-design/caching', title: 'HTTP キャッシュと条件付きリクエスト', sectionId: 'rest-design', manualId: 'api' },
  { step: 17, path: '/api/rest-design/idempotency', title: 'べき等キーと安全なリトライ', sectionId: 'rest-design', manualId: 'api' },
  { step: 18, path: '/api/openapi/what-is-openapi', title: 'OpenAPI 仕様とは', sectionId: 'openapi', manualId: 'api' },
  { step: 19, path: '/api/openapi/document-structure', title: 'OpenAPI ドキュメントの構造', sectionId: 'openapi', manualId: 'api' },
  { step: 20, path: '/api/openapi/schema-components', title: 'スキーマとコンポーネント', sectionId: 'openapi', manualId: 'api' },
  { step: 21, path: '/api/openapi/swagger-ui', title: 'Swagger UI と Redoc', sectionId: 'openapi', manualId: 'api' },
  { step: 22, path: '/api/openapi/schema-first', title: 'スキーマファースト開発', sectionId: 'openapi', manualId: 'api' },
  { step: 23, path: '/api/build/mock-server', title: 'モックサーバーから始める', sectionId: 'api-build', manualId: 'api' },
  { step: 24, path: '/api/build/validation', title: '入力バリデーション', sectionId: 'api-build', manualId: 'api' },
  { step: 25, path: '/api/build/auth', title: '認証と認可', sectionId: 'api-build', manualId: 'api' },
  { step: 26, path: '/api/build/rate-limiting', title: 'レート制限とスロットリング', sectionId: 'api-build', manualId: 'api' },
  { step: 27, path: '/api/build/webhooks', title: 'Webhooks と非同期 API', sectionId: 'api-build', manualId: 'api' },
  { step: 28, path: '/api/build/versioning', title: 'API バージョニング', sectionId: 'api-build', manualId: 'api' },
  { step: 29, path: '/api/quality/contract-testing', title: '契約テスト', sectionId: 'api-quality', manualId: 'api' },
  { step: 30, path: '/api/quality/linting', title: 'スキーマ Lint と Spectral', sectionId: 'api-quality', manualId: 'api' },
  { step: 31, path: '/api/quality/security', title: 'API セキュリティ設計', sectionId: 'api-quality', manualId: 'api' },
  { step: 32, path: '/api/quality/observability', title: 'API の可観測性', sectionId: 'api-quality', manualId: 'api' },
  { step: 33, path: '/api/quality/debugging-tools', title: 'API のデバッグと GUI / CLI ツール', sectionId: 'api-quality', manualId: 'api' },
  { step: 34, path: '/api/collaboration/backend-frontend', title: 'バックエンドとフロントエンドの API 設計', sectionId: 'api-collaboration', manualId: 'api' },
  { step: 35, path: '/api/collaboration/design-and-api', title: 'デザイン・情報設計と API', sectionId: 'api-collaboration', manualId: 'api' },
  { step: 36, path: '/api/practice/react', title: 'React での API 連携', sectionId: 'api-practice', manualId: 'api' },
  { step: 37, path: '/api/practice/nextjs', title: 'Next.js での API 連携', sectionId: 'api-practice', manualId: 'api' },
  { step: 38, path: '/api/practice/vue', title: 'Vue での API 連携', sectionId: 'api-practice', manualId: 'api' },
  { step: 39, path: '/api/practice/nuxt', title: 'Nuxt での API 連携', sectionId: 'api-practice', manualId: 'api' },
  { step: 40, path: '/api/advanced/beyond-rest', title: 'REST 以外の選択肢（GraphQL / gRPC）', sectionId: 'api-advanced', manualId: 'api' },
  { step: 41, path: '/api/advanced/summary', title: '設計まとめとチェックリスト', sectionId: 'api-advanced', manualId: 'api' },

  // ===========================
  // Vue / Nuxt マニュアル (22ページ)
  // ===========================
  { step: 1, path: '/vue', title: 'このマニュアルについて', sectionId: 'vue-intro', manualId: 'vue' },
  { step: 2, path: '/vue/basics/setup', title: '環境構築とプロジェクト作成', sectionId: 'vue-basics', manualId: 'vue' },
  { step: 3, path: '/vue/basics/template-syntax', title: 'テンプレート構文とディレクティブ', sectionId: 'vue-basics', manualId: 'vue' },
  { step: 4, path: '/vue/basics/reactivity', title: 'リアクティビティ（ref / reactive）', sectionId: 'vue-basics', manualId: 'vue' },
  { step: 5, path: '/vue/basics/components', title: 'コンポーネントの基本', sectionId: 'vue-basics', manualId: 'vue' },
  { step: 6, path: '/vue/basics/props-emits', title: 'Props と Emits', sectionId: 'vue-basics', manualId: 'vue' },
  { step: 7, path: '/vue/composition/script-setup', title: 'script setup と TypeScript', sectionId: 'composition', manualId: 'vue' },
  { step: 8, path: '/vue/composition/computed-watch', title: 'computed と watch', sectionId: 'composition', manualId: 'vue' },
  { step: 9, path: '/vue/composition/lifecycle', title: 'ライフサイクルフック', sectionId: 'composition', manualId: 'vue' },
  { step: 10, path: '/vue/composition/composables', title: 'Composables（再利用ロジック）', sectionId: 'composition', manualId: 'vue' },
  { step: 11, path: '/vue/composition/provide-inject', title: 'provide / inject', sectionId: 'composition', manualId: 'vue' },
  { step: 12, path: '/vue/state-routing/router', title: 'Vue Router', sectionId: 'state-routing', manualId: 'vue' },
  { step: 13, path: '/vue/state-routing/pinia', title: 'Pinia による状態管理', sectionId: 'state-routing', manualId: 'vue' },
  { step: 14, path: '/vue/styling/sfc-styling', title: 'SFC とスタイリング', sectionId: 'vue-styling', manualId: 'vue' },
  { step: 15, path: '/vue/nuxt-basics/what-is-nuxt', title: 'Nuxt とは / プロジェクト作成', sectionId: 'nuxt-basics', manualId: 'vue' },
  { step: 16, path: '/vue/nuxt-basics/routing-layouts', title: 'ファイルベースルーティングとレイアウト', sectionId: 'nuxt-basics', manualId: 'vue' },
  { step: 17, path: '/vue/nuxt-basics/data-fetching', title: 'データ取得（useFetch / useAsyncData / $fetch）', sectionId: 'nuxt-basics', manualId: 'vue' },
  { step: 18, path: '/vue/nuxt-server/server-api', title: 'server/api と Nitro', sectionId: 'nuxt-server', manualId: 'vue' },
  { step: 19, path: '/vue/nuxt-server/rendering-modes', title: 'レンダリングモード（SSR / SSG / ISR）', sectionId: 'nuxt-server', manualId: 'vue' },
  { step: 20, path: '/vue/nuxt-server/middleware-plugins', title: 'ミドルウェア・プラグイン・モジュール', sectionId: 'nuxt-server', manualId: 'vue' },
  { step: 21, path: '/vue/nuxt-server/deploy', title: 'Nuxt のデプロイ', sectionId: 'nuxt-server', manualId: 'vue' },
  { step: 22, path: '/vue/advanced/latest-features', title: 'Vue 3.5 / Nuxt 4 の最新機能と総まとめ', sectionId: 'vue-advanced', manualId: 'vue' },

  // ===========================
  // バックエンド / インフラ / DevOps マニュアル (27ページ)
  // ===========================
  { step: 1, path: '/infra', title: 'このマニュアルについて', sectionId: 'infra-intro', manualId: 'infra' },
  { step: 2, path: '/infra/foundations/landscape', title: 'クラウドとインフラの全体像', sectionId: 'infra-foundations', manualId: 'infra' },
  { step: 3, path: '/infra/foundations/compute-models', title: 'サーバー / サーバーレス / エッジ', sectionId: 'infra-foundations', manualId: 'infra' },
  { step: 4, path: '/infra/foundations/choosing', title: 'アーキテクチャの選択軸', sectionId: 'infra-foundations', manualId: 'infra' },
  { step: 5, path: '/infra/hosting/vercel', title: 'Vercel', sectionId: 'hosting', manualId: 'infra' },
  { step: 6, path: '/infra/hosting/netlify', title: 'Netlify', sectionId: 'hosting', manualId: 'infra' },
  { step: 7, path: '/infra/hosting/cloudflare-pages', title: 'Cloudflare Pages / Workers', sectionId: 'hosting', manualId: 'infra' },
  { step: 8, path: '/infra/hosting/comparison', title: 'ホスティングの比較と選び方', sectionId: 'hosting', manualId: 'infra' },
  { step: 9, path: '/infra/edge/cdn-basics', title: 'CDN とキャッシュの基礎', sectionId: 'edge-cdn', manualId: 'infra' },
  { step: 10, path: '/infra/edge/cloudflare', title: 'Cloudflare の全体像', sectionId: 'edge-cdn', manualId: 'infra' },
  { step: 11, path: '/infra/edge/edge-functions', title: 'エッジ関数とエッジコンピューティング', sectionId: 'edge-cdn', manualId: 'infra' },
  { step: 12, path: '/infra/baas/what-is-baas', title: 'BaaS とは', sectionId: 'baas', manualId: 'infra' },
  { step: 13, path: '/infra/baas/supabase', title: 'Supabase', sectionId: 'baas', manualId: 'infra' },
  { step: 14, path: '/infra/baas/firebase', title: 'Firebase', sectionId: 'baas', manualId: 'infra' },
  { step: 15, path: '/infra/baas/comparison', title: 'Supabase と Firebase の比較', sectionId: 'baas', manualId: 'infra' },
  { step: 16, path: '/infra/database/relational', title: 'リレーショナル DB と PostgreSQL', sectionId: 'database', manualId: 'infra' },
  { step: 17, path: '/infra/database/serverless-db', title: 'サーバーレス DB と接続管理', sectionId: 'database', manualId: 'infra' },
  { step: 18, path: '/infra/database/orm', title: 'ORM（Prisma / Drizzle）', sectionId: 'database', manualId: 'infra' },
  { step: 19, path: '/infra/database/beyond-relational', title: 'KV・ベクトル・オブジェクトストレージ', sectionId: 'database', manualId: 'infra' },
  { step: 20, path: '/infra/bff/what-is-bff', title: 'BFF パターンとは', sectionId: 'bff-backend', manualId: 'infra' },
  { step: 21, path: '/infra/bff/auth', title: '認証・認可とシークレット管理', sectionId: 'bff-backend', manualId: 'infra' },
  { step: 22, path: '/infra/bff/api-gateway', title: 'API Gateway とバックエンド構成', sectionId: 'bff-backend', manualId: 'infra' },
  { step: 23, path: '/infra/devops/cicd', title: 'CI/CD パイプライン', sectionId: 'devops-cicd', manualId: 'infra' },
  { step: 24, path: '/infra/devops/iac', title: 'Infrastructure as Code', sectionId: 'devops-cicd', manualId: 'infra' },
  { step: 25, path: '/infra/devops/containers', title: 'コンテナと実行環境', sectionId: 'devops-cicd', manualId: 'infra' },
  { step: 26, path: '/infra/observability/monitoring', title: 'モニタリングとログ', sectionId: 'observability', manualId: 'infra' },
  { step: 27, path: '/infra/observability/sre', title: 'SRE と信頼性設計', sectionId: 'observability', manualId: 'infra' },
  { step: 28, path: '/infra/aws/overview', title: 'AWS の全体像と主要サービス', sectionId: 'aws', manualId: 'infra' },
  { step: 29, path: '/infra/aws/iam-account', title: 'アカウント設計と IAM', sectionId: 'aws', manualId: 'infra' },
  { step: 30, path: '/infra/aws/network-vpc', title: 'ネットワークと VPC', sectionId: 'aws', manualId: 'infra' },
  { step: 31, path: '/infra/aws/compute', title: 'コンピュート（EC2 / ECS / Lambda）', sectionId: 'aws', manualId: 'infra' },
  { step: 32, path: '/infra/aws/storage-cdn', title: 'ストレージと配信（S3 / CloudFront）', sectionId: 'aws', manualId: 'infra' },
  { step: 33, path: '/infra/aws/database', title: 'データベース（RDS / Aurora / DynamoDB）', sectionId: 'aws', manualId: 'infra' },
  { step: 34, path: '/infra/aws/cost-ops', title: 'コスト管理と Well-Architected', sectionId: 'aws', manualId: 'infra' },

  // ===========================
  // 開発フロー / チーム / DesignOps マニュアル (21ページ)
  // ===========================
  { step: 1, path: '/devflow', title: 'このマニュアルについて', sectionId: 'devflow-intro', manualId: 'devflow' },
  { step: 2, path: '/devflow/agile/what-is-agile', title: 'アジャイルとは', sectionId: 'agile-scrum', manualId: 'devflow' },
  { step: 3, path: '/devflow/agile/scrum', title: 'スクラムの全体像', sectionId: 'agile-scrum', manualId: 'devflow' },
  { step: 4, path: '/devflow/agile/sprint', title: 'スプリントとイベント', sectionId: 'agile-scrum', manualId: 'devflow' },
  { step: 5, path: '/devflow/agile/kanban', title: 'カンバンとフロー効率', sectionId: 'agile-scrum', manualId: 'devflow' },
  { step: 6, path: '/devflow/pm/backlog', title: 'バックログとユーザーストーリー', sectionId: 'project-mgmt', manualId: 'devflow' },
  { step: 7, path: '/devflow/pm/estimation', title: '見積もりとプランニング', sectionId: 'project-mgmt', manualId: 'devflow' },
  { step: 8, path: '/devflow/pm/roadmap', title: 'ロードマップと優先順位付け', sectionId: 'project-mgmt', manualId: 'devflow' },
  { step: 9, path: '/devflow/devops/culture', title: 'DevOps 文化と CALMS', sectionId: 'devops-flow', manualId: 'devflow' },
  { step: 10, path: '/devflow/devops/dora', title: 'DORA メトリクスと開発生産性', sectionId: 'devops-flow', manualId: 'devflow' },
  { step: 11, path: '/devflow/devops/branching', title: 'ブランチ戦略とリリースフロー', sectionId: 'devops-flow', manualId: 'devflow' },
  { step: 12, path: '/devflow/review/why-review', title: 'コードレビューの目的', sectionId: 'code-review', manualId: 'devflow' },
  { step: 13, path: '/devflow/review/pull-request', title: 'Pull Request の運用', sectionId: 'code-review', manualId: 'devflow' },
  { step: 14, path: '/devflow/review/perspectives', title: 'レビュー観点とチェックリスト', sectionId: 'code-review', manualId: 'devflow' },
  { step: 15, path: '/devflow/review/culture', title: 'レビュー文化とコミュニケーション', sectionId: 'code-review', manualId: 'devflow' },
  { step: 16, path: '/devflow/designops/what-is-designops', title: 'DesignOps とは', sectionId: 'designops', manualId: 'devflow' },
  { step: 17, path: '/devflow/designops/design-review', title: 'デザインレビュー', sectionId: 'designops', manualId: 'devflow' },
  { step: 18, path: '/devflow/designops/handoff', title: 'デザインとエンジニアの協業・ハンドオフ', sectionId: 'designops', manualId: 'devflow' },
  { step: 19, path: '/devflow/team/documentation', title: 'ドキュメンテーションと ADR', sectionId: 'team-quality', manualId: 'devflow' },
  { step: 20, path: '/devflow/team/retrospective', title: 'ふりかえりと継続的改善', sectionId: 'team-quality', manualId: 'devflow' },
  { step: 21, path: '/devflow/team/incident', title: 'インシデント対応とポストモーテム', sectionId: 'team-quality', manualId: 'devflow' },
];

// ── ヘルパー関数 ──

export function getManualById(id: ManualId): ManualInfo | undefined {
  return manuals.find((m) => m.id === id);
}

export function getManualPages(manualId: ManualId): PageInfo[] {
  return pages.filter((p) => p.manualId === manualId);
}

export function getManualSections(manualId: ManualId): SectionInfo[] {
  return sections.filter((s) => s.manualId === manualId);
}

export function getPageByPath(path: string): PageInfo | undefined {
  return pages.find((p) => p.path === path);
}

/** 同一マニュアル内の次ページ */
export function getNextPage(currentPath: string): PageInfo | undefined {
  const current = getPageByPath(currentPath);
  if (!current) return undefined;
  const manualPages = getManualPages(current.manualId);
  return manualPages.find((p) => p.step === current.step + 1);
}

/** 同一マニュアル内の前ページ */
export function getPreviousPage(currentPath: string): PageInfo | undefined {
  const current = getPageByPath(currentPath);
  if (!current) return undefined;
  const manualPages = getManualPages(current.manualId);
  return manualPages.find((p) => p.step === current.step - 1);
}

export function getSectionPages(sectionId: string): PageInfo[] {
  return pages.filter((p) => p.sectionId === sectionId);
}

export function getManualIdFromPath(path: string): ManualId | undefined {
  const match = path.match(/^\/(react|git|threejs|claude-mux|ai-ml|ux-design|api|vue|infra|devflow)/);
  return match ? (match[1] as ManualId) : undefined;
}

export function getNextSectionFirstPage(currentPath: string): PageInfo | undefined {
  const page = getPageByPath(currentPath);
  if (!page) return undefined;
  const manualSections = getManualSections(page.manualId);
  const sectionIndex = manualSections.findIndex((s) => s.id === page.sectionId);
  if (sectionIndex === -1 || sectionIndex >= manualSections.length - 1) return undefined;
  return getSectionPages(manualSections[sectionIndex + 1].id)[0];
}

export function getPrevSectionFirstPage(currentPath: string): PageInfo | undefined {
  const page = getPageByPath(currentPath);
  if (!page) return undefined;
  const manualSections = getManualSections(page.manualId);
  const sectionIndex = manualSections.findIndex((s) => s.id === page.sectionId);
  if (sectionIndex <= 0) return undefined;
  return getSectionPages(manualSections[sectionIndex - 1].id)[0];
}

// ── Claude Code パート定義 ──

export const parts = [
  { id: 'basic', title: '基礎編', description: 'Claude Code の全機能と AI コーディングエージェントの使い分け' },
  { id: 'advanced', title: '発展編', description: 'ベストプラクティス、CI/CD、マルチAI連携' },
];

export function getSectionsByPart(partId: string): SectionInfo[] {
  return sections.filter((s) => s.manualId === 'claude-mux' && s.part === partId);
}
