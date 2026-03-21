export type ManualId = 'react' | 'git' | 'threejs' | 'claude-mux';

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
    description: 'AI ツール・tmux・CI/CD の実践ガイド',
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

  // === Three.js マニュアル ===
  { id: 'threejs-intro', title: 'はじめに', manualId: 'threejs' },
  { id: 'basics', title: '基礎編', manualId: 'threejs' },
  { id: 'applied', title: '応用編', manualId: 'threejs' },
  { id: 'practical', title: '実践編', manualId: 'threejs' },
  { id: 'game-dev', title: '開発編', manualId: 'threejs' },

  // === Claude+tmux マニュアル ===
  { id: 'getting-started', title: 'はじめに', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'ガイドの目的と前提条件' },
  { id: 'claude-intro', title: 'Claude Code 導入', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'インストールと初期設定' },
  { id: 'claude-core', title: 'Claude Code コア機能', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'スラッシュコマンド・権限・CLAUDE.md' },
  { id: 'mcp', title: 'MCP連携', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'Model Context Protocol の活用' },
  { id: 'agent-extensions', title: 'エージェントの拡張', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'Subagents・Hooks・カスタムコマンド' },
  { id: 'tmux-intro', title: 'tmux入門', manualId: 'claude-mux', part: 'basic', colorScheme: 'tmux', description: 'tmux の概念と基本操作' },
  { id: 'tmux-setup', title: 'tmuxセットアップ', manualId: 'claude-mux', part: 'basic', colorScheme: 'tmux', description: 'インストールと初期設定' },
  { id: 'tmux-basics', title: 'tmux基本操作', manualId: 'claude-mux', part: 'basic', colorScheme: 'tmux', description: 'ウィンドウ・ペイン・セッション管理' },
  { id: 'tmux-customize', title: 'tmuxカスタマイズ', manualId: 'claude-mux', part: 'basic', colorScheme: 'tmux', description: 'キーバインド・テーマ・プラグイン' },
  { id: 'integration', title: '統合ワークフロー', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'Claude Code + tmux の実践的統合' },
  { id: 'cmux', title: 'cmux (GUI 環境管理)', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'Ghostty ベースの macOS ネイティブ端末' },
  { id: 'reference', title: 'リファレンス', manualId: 'claude-mux', part: 'basic', colorScheme: 'claude', description: 'コマンド・設定リファレンス' },
  { id: 'best-practices', title: 'ベストプラクティス', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'トークン最適化・コンテキスト管理' },
  { id: 'hooks-advanced', title: 'Hooks 詳解', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'イベントフック・自動化' },
  { id: 'cicd-headless', title: 'CI/CD とヘッドレス運用', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'ヘッドレスモード・GitHub Actions 連携' },
  { id: 'ide-agent-teams', title: 'IDE連携とエージェント協調', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: 'VS Code・JetBrains・マルチエージェント' },
  { id: 'multi-ai-architecture', title: 'マルチAIアーキテクチャ', manualId: 'claude-mux', part: 'advanced', colorScheme: 'claude', description: '複数AIの協調と統合設計' },
];

// ── ページ定義 ──

export const pages: PageInfo[] = [
  // ===========================
  // React マニュアル (69ページ)
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
  { step: 34, path: '/react/nextjs-basics/what-is-nextjs', title: 'Next.js とは', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 35, path: '/react/nextjs-basics/project-setup', title: 'Next.js プロジェクト作成', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 36, path: '/react/nextjs-basics/routing', title: 'ページとルーティング', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 37, path: '/react/nextjs-basics/layout', title: 'レイアウトとナビゲーション', sectionId: 'nextjs-basics', manualId: 'react' },
  { step: 38, path: '/react/nextjs-server/rsc', title: 'Server Components', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 39, path: '/react/nextjs-server/client', title: 'Client Components', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 40, path: '/react/nextjs-server/data-fetching', title: 'データフェッチング', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 41, path: '/react/nextjs-server/loading-error', title: 'Loading / Error UI', sectionId: 'nextjs-server', manualId: 'react' },
  { step: 42, path: '/react/nextjs-practice/route-handlers', title: 'Route Handlers', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 43, path: '/react/nextjs-practice/server-actions', title: 'Server Actions', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 44, path: '/react/nextjs-practice/middleware', title: 'ミドルウェアと認証', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 45, path: '/react/nextjs-practice/optimization', title: '画像最適化とメタデータ', sectionId: 'nextjs-practice', manualId: 'react' },
  { step: 46, path: '/react/nextjs-advanced/next15-features', title: 'Next.js 15 の新機能', sectionId: 'nextjs-advanced', manualId: 'react' },
  { step: 47, path: '/react/nextjs-advanced/next15-ppr', title: 'Partial Pre-rendering と最新レンダリング', sectionId: 'nextjs-advanced', manualId: 'react' },
  { step: 48, path: '/react/nextjs-css/tailwind-mui', title: 'Next.js × Tailwind / MUI', sectionId: 'nextjs-css', manualId: 'react' },
  { step: 49, path: '/react/nextjs-css/css-modules-sc', title: 'Next.js × CSS Modules / styled-components', sectionId: 'nextjs-css', manualId: 'react' },
  { step: 50, path: '/react/deploy/vercel', title: 'Vercel デプロイ', sectionId: 'deploy', manualId: 'react' },
  { step: 51, path: '/react/deploy/summary', title: '総まとめと次のステップ', sectionId: 'deploy', manualId: 'react' },
  { step: 52, path: '/react/storybook/intro', title: 'Storybook とは', sectionId: 'storybook', manualId: 'react' },
  { step: 53, path: '/react/storybook/setup', title: 'Storybook 導入と初期画面', sectionId: 'storybook', manualId: 'react' },
  { step: 54, path: '/react/storybook/structure', title: 'Story の書き方と構造', sectionId: 'storybook', manualId: 'react' },
  { step: 55, path: '/react/storybook/css', title: 'CSS 環境別 Storybook 表示', sectionId: 'storybook', manualId: 'react' },
  { step: 56, path: '/react/storybook/figma', title: 'Figma 連携と Chromatic', sectionId: 'storybook', manualId: 'react' },
  { step: 57, path: '/react/storybook/advanced', title: 'Storybook 応用とカスタマイズ', sectionId: 'storybook', manualId: 'react' },
  { step: 58, path: '/react/architecture/overview', title: 'React / Next.js アーキテクチャ総論', sectionId: 'architecture', manualId: 'react' },
  { step: 59, path: '/react/architecture/design-system', title: 'デザインシステムの設計と構築', sectionId: 'architecture', manualId: 'react' },
  { step: 60, path: '/react/architecture/maintenance', title: '長期運用とチーム開発', sectionId: 'architecture', manualId: 'react' },
  { step: 61, path: '/react/css-layout/flexbox', title: 'Flexbox 完全ガイド', sectionId: 'css-layout', manualId: 'react' },
  { step: 62, path: '/react/css-layout/grid', title: 'CSS Grid 完全ガイド', sectionId: 'css-layout', manualId: 'react' },
  { step: 63, path: '/react/ui-patterns/dialog', title: 'Dialog の設計パターン', sectionId: 'ui-patterns', manualId: 'react' },
  { step: 64, path: '/react/ui-patterns/snackbar', title: 'Snackbar / Toast の設計', sectionId: 'ui-patterns', manualId: 'react' },
  { step: 65, path: '/react/ui-patterns/form-group', title: 'Form グループの構造と課題', sectionId: 'ui-patterns', manualId: 'react' },
  { step: 66, path: '/react/accessibility/semantic-aria', title: 'セマンティック HTML と ARIA', sectionId: 'accessibility', manualId: 'react' },
  { step: 67, path: '/react/accessibility/table-design', title: 'Table 設計の全課題', sectionId: 'accessibility', manualId: 'react' },
  { step: 68, path: '/react/accessibility/form-a11y', title: 'Form のアクセシビリティ', sectionId: 'accessibility', manualId: 'react' },
  { step: 69, path: '/react/web-quality/ethics', title: 'ダークパターン回避と技術倫理', sectionId: 'web-quality', manualId: 'react' },
  { step: 70, path: '/react/design-tokens/why-dark-mode', title: 'ダークモードはなぜ必要か', sectionId: 'design-tokens', manualId: 'react' },
  { step: 71, path: '/react/design-tokens/tokens-practice', title: 'デザイントークンの実践', sectionId: 'design-tokens', manualId: 'react' },
  { step: 72, path: '/react/design-tokens/dark-mode-impl', title: 'ダークモードの実装', sectionId: 'design-tokens', manualId: 'react' },
  { step: 73, path: '/react/cdd-flow/component-driven', title: 'コンポーネント駆動開発（CDD）', sectionId: 'cdd-flow', manualId: 'react' },
  { step: 74, path: '/react/cdd-flow/design-code-sync', title: 'デザインとコードの自動同期', sectionId: 'cdd-flow', manualId: 'react' },
  { step: 75, path: '/react/cdd-flow/design-qa', title: 'デザイン QA の自動化', sectionId: 'cdd-flow', manualId: 'react' },

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
  // Claude+tmux マニュアル (44ページ)
  // ===========================
  { step: 1, path: '/claude-mux', title: 'このガイドの目的', sectionId: 'getting-started', manualId: 'claude-mux' },
  { step: 2, path: '/claude-mux/getting-started/why-claude-code', title: 'なぜClaude Codeなのか', sectionId: 'getting-started', manualId: 'claude-mux' },
  { step: 3, path: '/claude-mux/claude-intro/claude-code-intro', title: 'Claude Code CLI の概要', sectionId: 'claude-intro', manualId: 'claude-mux' },
  { step: 4, path: '/claude-mux/claude-intro/install-setup', title: 'インストールと初期設定', sectionId: 'claude-intro', manualId: 'claude-mux' },
  { step: 5, path: '/claude-mux/claude-intro/slash-commands', title: 'スラッシュコマンドの活用', sectionId: 'claude-intro', manualId: 'claude-mux' },
  { step: 6, path: '/claude-mux/claude-core/context-management', title: 'コンテキスト管理', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 7, path: '/claude-mux/claude-core/security-permissions', title: 'セキュリティと権限設定', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 8, path: '/claude-mux/claude-core/token-optimization', title: 'トークン消費の最適化', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 9, path: '/claude-mux/claude-core/extended-thinking', title: '拡張思考とモデル選択', sectionId: 'claude-core', manualId: 'claude-mux' },
  { step: 10, path: '/claude-mux/mcp/mcp-setup', title: 'MCP (Model Context Protocol)', sectionId: 'mcp', manualId: 'claude-mux' },
  { step: 11, path: '/claude-mux/mcp/mcp-practical', title: '実践的な MCP 連携', sectionId: 'mcp', manualId: 'claude-mux' },
  { step: 12, path: '/claude-mux/agent-extensions/subagents', title: 'Subagents による並列処理', sectionId: 'agent-extensions', manualId: 'claude-mux' },
  { step: 13, path: '/claude-mux/agent-extensions/custom-skills', title: 'Skills・コマンド・Hooks', sectionId: 'agent-extensions', manualId: 'claude-mux' },
  { step: 14, path: '/claude-mux/tmux-intro/why-tmux', title: 'なぜtmuxを学ぶのか', sectionId: 'tmux-intro', manualId: 'claude-mux' },
  { step: 15, path: '/claude-mux/tmux-intro/iterm-vs-tmux', title: 'iTerm2との違い', sectionId: 'tmux-intro', manualId: 'claude-mux' },
  { step: 16, path: '/claude-mux/tmux-intro/prerequisites', title: '前提知識', sectionId: 'tmux-intro', manualId: 'claude-mux' },
  { step: 17, path: '/claude-mux/tmux-setup/install-tmux', title: 'tmuxのインストール', sectionId: 'tmux-setup', manualId: 'claude-mux' },
  { step: 18, path: '/claude-mux/tmux-setup/verify-install', title: 'インストール確認', sectionId: 'tmux-setup', manualId: 'claude-mux' },
  { step: 19, path: '/claude-mux/tmux-basics/core-concepts', title: 'コアコンセプト', sectionId: 'tmux-basics', manualId: 'claude-mux' },
  { step: 20, path: '/claude-mux/tmux-basics/first-session', title: '最初のセッション作成', sectionId: 'tmux-basics', manualId: 'claude-mux' },
  { step: 21, path: '/claude-mux/tmux-basics/prefix-key', title: 'プリフィックスキーの理解', sectionId: 'tmux-basics', manualId: 'claude-mux' },
  { step: 22, path: '/claude-mux/tmux-basics/windows-panes', title: 'ウィンドウとペインの操作', sectionId: 'tmux-basics', manualId: 'claude-mux' },
  { step: 23, path: '/claude-mux/tmux-customize/tmux-config', title: 'tmux.confの基本', sectionId: 'tmux-customize', manualId: 'claude-mux' },
  { step: 24, path: '/claude-mux/tmux-customize/productivity-config', title: '生産性向上の設定', sectionId: 'tmux-customize', manualId: 'claude-mux' },
  { step: 25, path: '/claude-mux/tmux-customize/plugins', title: 'プラグイン導入', sectionId: 'tmux-customize', manualId: 'claude-mux' },
  { step: 26, path: '/claude-mux/integration/tmux-integration', title: 'tmux との統合 (AI Cockpit)', sectionId: 'integration', manualId: 'claude-mux' },
  { step: 27, path: '/claude-mux/integration/tmuxp-automation', title: 'tmuxp による環境のコード化', sectionId: 'integration', manualId: 'claude-mux' },
  { step: 28, path: '/claude-mux/integration/practical-workflow', title: '実践ワークフロー構築', sectionId: 'integration', manualId: 'claude-mux' },
  { step: 29, path: '/claude-mux/cmux/cmux-intro', title: 'cmux: GUI ベースのエージェント管理', sectionId: 'cmux', manualId: 'claude-mux' },
  { step: 30, path: '/claude-mux/cmux/cmux-setup', title: 'cmux のセットアップと活用', sectionId: 'cmux', manualId: 'claude-mux' },
  { step: 31, path: '/claude-mux/reference/session-management', title: '環境の永続化', sectionId: 'reference', manualId: 'claude-mux' },
  { step: 32, path: '/claude-mux/reference/troubleshooting', title: 'トラブルシューティング', sectionId: 'reference', manualId: 'claude-mux' },
  { step: 33, path: '/claude-mux/reference/claude-cheatsheet', title: 'Claude Code チートシート', sectionId: 'reference', manualId: 'claude-mux' },
  { step: 34, path: '/claude-mux/reference/tmux-cheatsheet', title: 'tmux チートシート', sectionId: 'reference', manualId: 'claude-mux' },
  { step: 35, path: '/claude-mux/best-practices/effective-workflows', title: '効果的なワークフロー', sectionId: 'best-practices', manualId: 'claude-mux' },
  { step: 36, path: '/claude-mux/best-practices/spec-driven-dev', title: '仕様駆動開発 (SDD)', sectionId: 'best-practices', manualId: 'claude-mux' },
  { step: 37, path: '/claude-mux/best-practices/testing-debugging', title: 'テストとデバッグの戦略', sectionId: 'best-practices', manualId: 'claude-mux' },
  { step: 38, path: '/claude-mux/hooks-advanced/hooks-guide', title: 'Hooks の設計と実装', sectionId: 'hooks-advanced', manualId: 'claude-mux' },
  { step: 39, path: '/claude-mux/hooks-advanced/hooks-recipes', title: 'Hooks 実践レシピ', sectionId: 'hooks-advanced', manualId: 'claude-mux' },
  { step: 40, path: '/claude-mux/ci-cd/github-actions', title: 'GitHub Actions 連携', sectionId: 'cicd-headless', manualId: 'claude-mux' },
  { step: 41, path: '/claude-mux/ci-cd/headless-mode', title: 'ヘッドレスモードと自動化', sectionId: 'cicd-headless', manualId: 'claude-mux' },
  { step: 42, path: '/claude-mux/ide-agent-teams/ide-integration', title: 'VS Code・JetBrains 連携', sectionId: 'ide-agent-teams', manualId: 'claude-mux' },
  { step: 43, path: '/claude-mux/ide-agent-teams/agent-orchestration', title: 'エージェントチームの協調', sectionId: 'ide-agent-teams', manualId: 'claude-mux' },
  { step: 44, path: '/claude-mux/ide-agent-teams/plugins-ecosystem', title: 'プラグインとエコシステム', sectionId: 'ide-agent-teams', manualId: 'claude-mux' },
  { step: 45, path: '/claude-mux/multi-ai/multi-ai-coexistence', title: 'マルチAIツールの共存戦略', sectionId: 'multi-ai-architecture', manualId: 'claude-mux' },
  { step: 46, path: '/claude-mux/multi-ai/single-source-of-truth', title: 'シングルソースオブトゥルース設計', sectionId: 'multi-ai-architecture', manualId: 'claude-mux' },
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
  const match = path.match(/^\/(react|git|threejs|claude-mux)/);
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

// ── Claude+tmux パート定義 ──

export const parts = [
  { id: 'basic', title: '基礎編', description: 'Claude Code の全機能と tmux の基本操作' },
  { id: 'advanced', title: '発展編', description: 'ベストプラクティス、CI/CD、マルチAI連携' },
];

export function getSectionsByPart(partId: string): SectionInfo[] {
  return sections.filter((s) => s.manualId === 'claude-mux' && s.part === partId);
}
