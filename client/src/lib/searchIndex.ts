/**
 * 統合検索インデックス
 * 4つのマニュアルのページ検索用インデックスを統合
 * 各ページパスに対して H2 見出しとキーワードをマッピング
 */
export const searchIndex: Record<string, string[]> = {
  // ===== react-manual =====
  '/react': [
    'このマニュアルについて', '扱う技術スタック', 'カリキュラム', '前提知識', '学習の進め方',
  ],
  '/react/intro/setup': [
    '環境構築', 'ターミナル', 'Git', 'Node.js', 'pnpm', 'エディタ', 'VS Code', 'プロジェクト作成',
  ],
  '/react/react-basics/hello-react': [
    'React が生まれた背景', 'React とは何か', '仮想 DOM', 'SPA', 'シングルページアプリケーション',
    'プロジェクト構造', 'Hello React', 'レンダリングの流れ', 'Vite', 'コーディングチャレンジ',
  ],
  '/react/react-basics/jsx': [
    'JSX とは何か', 'HTML との違い', 'JSX エラー', '式の埋め込み', '条件分岐', '条件付きレンダリング',
    'リストのレンダリング', 'map', 'フラグメント', 'インラインスタイル', 'コーディングチャレンジ',
  ],
  '/react/react-basics/components': [
    'コンポーネントとは', 'コンポーネントの粒度', 'UI 分解', '関数コンポーネント',
    'ファイル構成', 'コンポジション', 'Card コンポーネント', 'コンポーネント設計', 'コーディングチャレンジ',
  ],
  '/react/react-basics/props': [
    'Props とは', '一方向データフロー', '文字列', '数値', '真偽値', 'オブジェクト', '配列',
    'children prop', 'デフォルト Props', '分割代入', 'デストラクチャリング', 'スプレッド構文',
    'ProfileCard', 'コーディングチャレンジ',
  ],
  '/react/react-basics/typescript': [
    'TypeScript', 'Figma プロパティ', '型', 'interface', 'type', 'Badge', 'Card',
    '型推論', 'Alert', 'ジェネリクス', '型ユーティリティ', 'Partial', 'Omit', 'Pick',
    'Button', 'ReactNode', 'コーディングチャレンジ',
  ],
  '/react/state-events/use-state': [
    'state', '状態', 'useState', 'カウンター', 'テキスト入力', 'トグル',
    'イミュータビリティ', '配列の更新', 'オブジェクトの更新', 'コールバック形式',
    'バッチ更新', 'Todo リスト', 'コーディングチャレンジ',
  ],
  '/react/state-events/events': [
    'onClick', 'クリックイベント', 'イベント型', 'イベントハンドラ', '命名規則',
    'onChange', 'onSubmit', 'デフォルト動作の防止', 'キーボードイベント',
    'バブリング', 'キャプチャ', 'デバウンス', 'スロットル', 'カラーピッカー', 'コーディングチャレンジ',
  ],
  '/react/state-events/conditional-list': [
    '条件分岐', 'タブ切り替え', 'アコーディオン', 'ステッパー', 'map',
    'key prop', 'フィルタリング', 'ソート', 'Empty State', 'カードギャラリー', 'コーディングチャレンジ',
  ],
  '/react/state-events/forms': [
    '制御コンポーネント', '非制御コンポーネント', 'テキスト入力', 'テキストエリア',
    'セレクトボックス', 'チェックボックス', 'ラジオボタン', 'フォーム送信', 'onSubmit',
    'バリデーション', 'React Hook Form', 'コーディングチャレンジ',
  ],
  '/react/hooks-deep/use-effect': [
    '副作用', 'Side Effect', 'useEffect', '依存配列', 'クリーンアップ関数',
    'API データ取得', 'fetch', 'レースコンディション', 'AbortController', 'タイマー', 'コーディングチャレンジ',
  ],
  '/react/hooks-deep/use-context': [
    'Props Drilling', 'Context', 'createContext', 'Provider', 'useContext',
    'テーマ切り替え', '複数 Context', '認証情報', 'パフォーマンス', 'コーディングチャレンジ',
  ],
  '/react/hooks-deep/use-reducer': [
    'useReducer', 'Reducer', 'Flux', 'dispatch', 'action',
    'TypeScript 型付け', 'Todo アプリ', 'immer', 'ベストプラクティス', 'コーディングチャレンジ',
  ],
  '/react/hooks-deep/memo-callback': [
    '再レンダー', 'React.memo', 'useMemo', 'useCallback', 'メモ化',
    'DevTools Profiler', 'アンチパターン', 'React Compiler', '検索フィルター', 'コーディングチャレンジ',
  ],
  '/react/hooks-deep/custom-hooks': [
    'カスタム Hook', 'useLocalStorage', 'useWindowSize', 'useFetch', 'useDebounce',
    'OSS Hooks', 'テスト方法', 'use API', 'React 19', '設計ガイド', 'コーディングチャレンジ',
  ],
  '/react/css-basics/plain-css': [
    'プレーン CSS', 'CSS Modules', 'ハッシュ化', ':global', 'Vite',
    'className', 'composes', 'typed-css-modules', 'カードコンポーネント',
    'ファイル構成', 'コーディングチャレンジ',
  ],
  '/react/css-basics/css-in-js': [
    'CSS-in-JS', 'CSS アプローチ比較', 'メリット', 'デメリット', 'ゼロランタイム',
    'パフォーマンス', 'SSR', 'vanilla-extract', 'Linaria', 'コーディングチャレンジ',
  ],
  '/react/css-basics/styled-components': [
    'styled-components', 'Props ベース', '動的スタイル', 'v6', 'Extending Styles',
    'SSR', 'ServerStyleSheet', 'グローバルスタイル', 'ThemeProvider', 'テーマ切り替え',
    'keyframes', 'アニメーション', 'コーディングチャレンジ',
  ],
  '/react/css-basics/emotion': [
    'Emotion', 'css prop', 'styled API', 'Composition', 'TypeScript テーマ',
    'babel-plugin', 'styled-components 比較', 'レスポンシブ', 'コーディングチャレンジ',
  ],
  '/react/css-basics/css-patterns': [
    'BEM', 'SMACSS', 'ユーティリティクラス', 'Container クエリ', '@layer',
    'CSS ネスティング', 'カスタムプロパティ', 'デザイントークン', 'レスポンシブ',
    'Fluid Typography', 'コーディングチャレンジ',
  ],
  '/react/tailwind/intro': [
    'ユーティリティファースト', 'Tailwind CSS', 'Vite インストール', 'スペーシング',
    'カラー', 'タイポグラフィ', 'Flexbox', 'Grid', 'ホバー', 'フォーカス', 'カードコンポーネント',
  ],
  '/react/tailwind/responsive-dark': [
    'レスポンシブ', 'ブレイクポイント', 'ダークモード', 'CSS 変数', 'カスタムカラー',
    'アニメーション', 'プロフィールページ',
  ],
  '/react/tailwind/shadcn': [
    'shadcn/ui', 'Button', 'Card', 'Dialog', 'モーダル', 'CSS 変数', 'テーマカスタマイズ',
    '設定画面', 'MUI 比較',
  ],
  '/react/mui/intro': [
    'MUI', 'Material UI', 'インストール', 'ThemeProvider', 'Button', 'Typography',
    'Box', 'Container', 'sx prop', 'ウェルカムページ',
  ],
  '/react/mui/components': [
    'Grid', 'Stack', 'Container', 'TextField', 'Select', 'Checkbox',
    'Alert', 'Snackbar', 'Dialog', 'AppBar', 'Drawer', 'Tabs',
    'Table', 'Card', 'List', 'ダッシュボード',
  ],
  '/react/mui/customization': [
    'createTheme', 'パレット', 'タイポグラフィ', 'オーバーライド', 'スタイリング',
    'デザイントークン', 'ブランドテーマ',
  ],
  '/react/practice-app/api': [
    'fetch API', 'async', 'await', '非同期処理', 'データ取得パターン',
    'カスタムフック', 'axios', 'Todo API',
  ],
  '/react/practice-app/routing': [
    'React Router', 'Routes', 'Route', 'Link', 'NavLink', 'useNavigate',
    'useParams', '動的ルーティング', 'ネストされたルート', 'マルチページ',
  ],
  '/react/practice-app/portfolio': [
    'ポートフォリオ', 'プロジェクト設計', '型定義', 'レイアウト', 'ヘッダー',
    'ヒーロー', 'スキル', 'プロジェクトギャラリー', 'お問い合わせフォーム', 'レスポンシブ', 'デプロイ',
  ],
  '/react/api-design/graphql': [
    'GraphQL', 'Query', 'Mutation', 'Subscription', 'Apollo Client', 'urql',
    'スキーマ', 'SDL', 'GraphQL Code Generator', '型生成', 'useQuery', 'useMutation',
    'REST 比較', 'オーバーフェッチ', 'アンダーフェッチ', 'キャッシュ',
  ],
  '/react/api-design/openapi-swagger': [
    'OpenAPI', 'Swagger', 'Swagger UI', 'API 設計', 'REST API', 'YAML',
    'スキーマ定義', 'コード生成', 'orval', 'openapi-typescript', 'openapi-fetch',
    'モックサーバー', 'Prism', 'MSW', 'API ファースト', 'ステータスコード',
    'ページネーション', 'バージョニング',
  ],
  '/react/nextjs-basics/what-is-nextjs': [
    'Next.js', 'レンダリング方式', 'SSR', 'SSG', 'ISR',
    'ファイルベースルーティング', 'Server Components', 'RSC', 'React Vite 比較',
  ],
  '/react/nextjs-basics/project-setup': [
    'create-next-app', 'プロジェクト構造', 'ファイル構造', '開発サーバー', 'TypeScript',
  ],
  '/react/nextjs-basics/routing': [
    'App Router', 'ファイル規約', '動的ルート', 'slug', 'ルートグループ',
    'Link', 'useRouter', 'usePathname', 'ブログ ルーティング',
  ],
  '/react/nextjs-basics/layout': [
    'ルートレイアウト', 'ネストレイアウト', 'ダッシュボード', 'template.tsx',
    'ナビゲーション', 'Metadata API', 'next/font',
  ],
  '/react/nextjs-server/rsc': [
    'Server Components', 'RSC', 'async コンポーネント', 'データ取得パターン', 'Server Client 境界',
  ],
  '/react/nextjs-server/client': [
    'use client', 'Client Component', 'コンポジションパターン', '境界のルール',
    'シリアライズ', '判断フロー',
  ],
  '/react/nextjs-server/data-fetching': [
    'サーバーサイド fetch', 'キャッシュ戦略', '再検証', 'Revalidation',
    '並列データ取得', 'Suspense', 'ストリーミング',
  ],
  '/react/nextjs-server/loading-error': [
    'loading.tsx', 'ローディング UI', 'error.tsx', 'エラー UI', 'not-found.tsx',
    '404', 'グローバルエラー',
  ],
  '/react/nextjs-practice/route-handlers': [
    'route.ts', 'HTTP メソッド', 'GET', 'POST', 'リクエスト', 'レスポンス',
    'お問い合わせフォーム API', 'CORS', 'セキュリティ',
  ],
  '/react/nextjs-practice/server-actions': [
    'Server Actions', 'フォーム', '送信状態', 'useFormStatus', 'データ再検証',
    'revalidatePath', 'TODO アプリ', 'セキュリティ',
  ],
  '/react/nextjs-practice/middleware': [
    'ミドルウェア', 'middleware.ts', 'matcher', 'リダイレクト', 'リライト',
    '認証', 'ヘッダー', 'Cookie',
  ],
  '/react/nextjs-practice/optimization': [
    'next/image', '画像最適化', 'レスポンシブ画像', 'メタデータ API',
    'generateMetadata', 'OG 画像', 'next/font', 'フォント最適化',
  ],
  '/react/nextjs-css/tailwind-mui': [
    'Tailwind CSS セットアップ', 'Tailwind カスタマイズ', 'MUI セットアップ',
    'MUI コンポーネント', 'Tailwind vs MUI', 'shadcn/ui',
  ],
  '/react/nextjs-css/css-modules-sc': [
    'CSS Modules', 'styled-components', 'Emotion', 'スタイリング比較', '判断フロー',
  ],
  '/react/deploy/vercel': [
    'Vercel', 'デプロイ', '環境変数', 'プレビューデプロイ', 'カスタムドメイン', 'チェックリスト',
  ],
  '/react/deploy/summary': [
    '学習の振り返り', 'スキルセット', '次に学ぶべきこと', 'プロジェクトアイデア',
    '学習リソース', 'デザイナー × エンジニア',
  ],
  '/react/storybook/intro': [
    'Storybook とは', 'なぜ Storybook', 'コンポーネント開発', '4つの問題',
    'デザイナーとエンジニア', 'エコシステム', '画面構成', 'Storybook 8',
  ],
  '/react/storybook/setup': [
    'Storybook 導入', 'インストール', 'ファイル構造', 'main.ts', 'preview.ts',
    '初期画面', 'Next.js', 'TypeScript', '静的ビルド',
  ],
  '/react/storybook/structure': [
    'CSF3', 'Component Story Format', 'Meta', 'Story', 'args', 'argTypes',
    'play 関数', 'インタラクションテスト', 'decorators', 'parameters', 'Docs ページ',
  ],
  '/react/storybook/css': [
    'CSS 環境', 'プレーン CSS', 'CSS Modules', 'Tailwind CSS', 'MUI',
    'styled-components', 'Emotion', '環境別設定',
  ],
  '/react/storybook/figma': [
    'Figma 連携', 'addon-designs', 'Design Tokens', 'Chromatic',
    'ビジュアルリグレッション', '静的サイト公開',
  ],
  '/react/storybook/advanced': [
    'Addons', 'カスタマイズ', 'テスト連携', 'Composition', '複数 Storybook',
    'Storybook 8', '新機能',
  ],
  '/react/architecture/overview': [
    'フロントエンドアーキテクチャ', 'メンタルモデル', 'ディレクトリ構成',
    '状態管理', 'Next.js アーキテクチャ', 'デザインライブラリ', '推奨パターン',
  ],
  '/react/architecture/design-system': [
    'デザインシステム', '階層構造', 'デザイントークン', 'コンポーネント API',
    'スターターキット', 'デザイナー',
  ],
  '/react/architecture/maintenance': [
    '長期運用', 'チーム開発', 'ベストプラクティス', 'テスト戦略', 'パフォーマンス',
    '次のステップ', '55ステップ振り返り',
  ],

  // ===== git-manual =====
  '/git': [
    '環境構築', 'GitHub', 'React', '学習フロー', 'キーボードショートカット',
    'なぜこれを学ぶのか', 'このガイドの特徴', 'AI', 'デザイナー', 'マーケター',
  ],
  '/git/environment/prerequisites': [
    '前提知識', 'Git とは何か', 'GitHub とは何か', 'ターミナルの基本',
    '必要なツール一覧', 'バージョン管理', 'リポジトリ', 'コマンドライン',
  ],
  '/git/environment/cursor': [
    'Cursor インストール', 'Cursor とは', 'インストール手順', 'インストール確認',
    'エディタ', 'AI コーディング', 'VSCode',
  ],
  '/git/environment/git': [
    'Git インストール', 'Git をインストールする理由', 'インストール手順',
    'トラブルシューティング', 'Homebrew', 'バージョン確認',
  ],
  '/git/environment/nodejs': [
    'Node.js インストール', 'Node.js とは', 'npm について', 'インストール手順',
    'パッケージマネージャ', 'JavaScript', 'ランタイム',
  ],
  '/git/github/account': [
    'GitHub アカウント作成', 'GitHub アカウントが必要な理由', 'アカウント作成手順',
    'サインアップ', 'メールアドレス', 'ユーザー名',
  ],
  '/git/github/setup': [
    'Git ローカル設定', 'Git ユーザー情報を設定', 'SSH キーを生成・登録',
    'トラブルシューティング', 'git config', 'user.name', 'user.email', 'SSH',
  ],
  '/git/github/first-repo': [
    '最初のリポジトリ作成', 'リポジトリとは', 'GitHub 上でリポジトリを作成',
    'リポジトリをローカルにクローン', 'リポジトリの構造', 'GitHub Pages',
    'git clone', 'README',
  ],
  '/git/github/markdown': [
    'Markdown 入門', 'なぜ Markdown を覚えるべきなのか', 'Markdown が使われている場所',
    '基本の書き方', 'よく使う応用記法', 'プラットフォームごとの対応状況',
    '実践：README.md を書いてみよう', 'Markdown 早見表',
    '見出し', 'リスト', 'リンク', 'コードブロック', 'テーブル', 'チェックボックス',
    '太字', '斜体', '引用', '水平線', 'GFM',
  ],
  '/git/markdown-prompt/prompt-engineering': [
    'プロンプトエンジニアリング入門', 'なぜ構造化された指示が効くのか',
    'プロンプトの基本構造', 'Before / After：GitHub 関連の例', '実践的なコツ',
    'ChatGPT', 'Claude', 'AI', 'プロンプト', '構造化',
  ],
  '/git/workflow/commit': [
    'ファイル作成と Commit', 'Commit とは', 'ファイルを作成',
    'Git ワークフロー：add → commit → push',
    'git add', 'git commit', 'ステージング', 'コミットメッセージ', 'セーブポイント',
  ],
  '/git/workflow/push-pull': [
    'Push と Pull', 'ローカルとリモートの概念',
    'Push：ローカルの変更を GitHub にアップロード',
    'Pull：GitHub の最新をローカルに取得',
    'Push と Pull のワークフロー',
    'git push', 'git pull', 'origin', 'リモート',
  ],
  '/git/workflow/history': [
    '差分・履歴確認', '差分・履歴を確認する理由',
    'git log：変更履歴を確認', 'git diff：変更内容を確認',
    'GitHub Web UI で確認', 'セルフレビューの重要性',
    'git log', 'git diff', '差分', '履歴', 'コミット履歴',
  ],
  '/git/workflow/branch': [
    'ブランチの基本', 'ブランチとは', 'ブランチを作成・切り替え',
    'ブランチで変更を加える', 'ブランチをマージ',
    'git branch', 'git checkout', 'git switch', 'git merge',
    'feature', 'main', '並行開発', 'マージ',
  ],
  '/git/react/setup': [
    'React 開発環境セットアップ', 'React とは', 'React プロジェクトを作成',
    'React プロジェクトの構造', '開発サーバーを起動',
    'npm create', 'Vite', 'コンポーネント', 'JSX',
  ],
  '/git/react/modify': [
    'デザイン変更と Git 管理', 'このセクションの目的',
    'App.js を編集してデザイン変更', 'Git でバージョン管理', '学習成果',
    'CSS', 'スタイル', 'コンポーネント編集',
  ],
  '/git/advanced/wsl2': [
    'WSL2 導入', 'WSL2 とは', '前提条件', 'インストール手順',
    'トラブルシューティング', 'Windows', 'Linux', 'Ubuntu',
  ],
  '/git/advanced/wsl2-ssh': [
    'WSL2 での SSH キー接続', 'SSH キーの確認', 'SSH キーの生成',
    'GitHub に公開キーを登録', 'SSH 接続のテスト', 'Git の SSH 設定確認',
    'リポジトリをクローン', 'ssh-keygen', 'id_ed25519',
  ],
  '/git/advanced/github-cli': [
    'GitHub CLI 導入', 'GitHub CLI のインストール', 'GitHub CLI で認証',
    'GitHub CLI の基本コマンド', '実践例：GitHub CLI でのワークフロー',
    '便利なエイリアス設定', 'gh', 'gh auth', 'gh repo', 'gh pr',
  ],
  '/git/advanced/linux-basics': [
    'Linux/Ubuntu 基礎', 'ターミナルの基本', 'よく使うコマンド',
    'ファイルシステムの理解', 'ユーザーと権限', '実践練習',
    'ls', 'cd', 'mkdir', 'rm', 'chmod', 'sudo',
  ],
  '/git/advanced/vscode': [
    'VSCode 導入', 'VSCode とは', 'インストール手順',
    'おすすめの拡張機能', 'ターミナル統合',
    'WSL2 との統合（Windows ユーザー向け）',
    'Visual Studio Code', '拡張機能', 'Remote WSL',
  ],
  '/git/advanced/integration': [
    '開発環境の統合確認', 'インストール確認', '初めてのプロジェクト作成',
    '実践的な開発フロー', 'Cursor vs VSCode - 使い分け',
    '統合テスト', '環境確認',
  ],
  '/git/ai-agent/overview': [
    'AI コーディング環境の全体像', 'AI コーディングツールって何？',
    'このセクションのゴール', 'ツールは3タイプある',
    'GitHub Copilot', 'Claude Code', 'Cursor', 'Cline',
  ],
  '/git/ai-agent/claude-code-setup': [
    'Claude Code 導入', 'Claude Code とは？', 'このページのまとめ',
    'Anthropic', 'API キー', 'インストール', 'npm',
  ],
  '/git/ai-agent/claude-code-basics': [
    'Claude Code 基本操作', 'このページのゴール', '実践チャレンジ', 'このページのまとめ',
    'リポジトリと接続', 'fetch / pull', '画面で確認',
    'git status', 'git log', '開発サーバー', 'CLAUDE.md',
  ],
  '/git/ai-agent/cursor-cline': [
    'Cursor + Cline 導入', 'Cursor とは？', 'Cline とは？',
    'Cursor と Cline、どっちを使う？', 'このページのまとめ',
    'AI エディタ', 'VSCode 拡張',
  ],
  '/git/ai-agent/sub-tools': [
    '予備ツール', 'Gemini CLI', 'Warp', 'Google Antigravity',
    'このページのまとめ', 'ターミナル', 'AI ツール',
  ],

  // ===== threejs-manual =====
  '/threejs': [
    'なぜ Three.js を学ぶのか',
    '学習フロー',
    'このガイドの特徴',
    'キーボードショートカット',
    '準備はいいですか？',
  ],
  '/threejs/basics/scene': [
    'Three.js の 3 つの要素',
    '最初のシーンを作る',
    'コードの流れ',
  ],
  '/threejs/basics/camera': [
    'PerspectiveCamera とは',
    'カメラのコード',
    'カメラの位置と向き',
  ],
  '/threejs/basics/renderer': [
    'WebGLRenderer とは',
    'レンダラーの基本設定',
    '各設定の解説',
    'アンチエイリアスの効果',
    'ウィンドウリサイズ対応',
  ],
  '/threejs/basics/geometry': [
    'ジオメトリとは',
    'BoxGeometry を試してみよう',
    'よく使うジオメトリ一覧',
  ],
  '/threejs/basics/material': [
    '3 つの基本マテリアル',
    'マテリアルの選び方',
  ],
  '/threejs/basics/light': [
    '3 つの基本ライト',
    'ライトを調整してみよう',
    'ライトのコード',
    'その他のライト',
  ],
  '/threejs/basics/animation': [
    'アニメーションの仕組み',
    '基本のアニメーションループ',
    'コードの流れ',
    '回転する立方体',
    '回転以外のアニメーション',
  ],
  '/threejs/applied/textures': [
    'TextureLoader の基本',
    'UV マッピングとは',
    'チェッカーボードテクスチャ',
  ],
  '/threejs/applied/model-loading': [
    'glTF フォーマットとは',
    'GLTFLoader の使い方',
    'React Three Fiber での読み込み',
    'プリミティブによる構造物の例',
    'モデル最適化のポイント',
  ],
  '/threejs/applied/interaction': [
    'Raycaster の仕組み',
    'Raycaster のコード',
    'インタラクティブなボックス',
    'R3F でのインタラクション',
  ],
  '/threejs/applied/responsive': [
    'リサイズ対応が必要な理由',
    'リサイズイベントの実装',
    'コンテナ要素に合わせる場合',
    'レスポンシブなシーンの例',
    'R3F でのレスポンシブ対応',
  ],
  '/threejs/applied/orbit-controls': [
    'OrbitControls の機能',
    'パラメータを調整してみよう',
    'OrbitControls のセットアップ',
  ],
  '/threejs/applied/post-processing': [
    'EffectComposer の仕組み',
    'Three.js での EffectComposer',
    'Bloom エフェクト',
    'R3F でのポストプロセシング',
    'よく使うポストプロセシングエフェクト',
  ],
  '/threejs/practical/r3f-basics': [
    'R3F の基本概念',
    'バニラ Three.js vs R3F の比較',
    'useFrame でアニメーション',
    'R3F コンポーネントの書き方',
  ],
  '/threejs/practical/r3f-drei': [
    '1. OrbitControls',
    '2. Environment',
    '3. Text',
    '4. Float',
    '5. MeshWobbleMaterial',
    'Float + MeshWobbleMaterial デモ',
  ],
  '/threejs/practical/portfolio-scene': [
    '完成シーンのプレビュー',
    'シーンの構成要素',
    '完全なソースコード',
    '使用している技術の整理',
  ],
  '/threejs/game-dev/overview': [
    'ゲームアーキテクチャの全体像',
    'ゲームループの基本構造',
    '飛行機プレビュー',
    'R3F でのゲームループ',
  ],
  '/threejs/game-dev/aircraft': [
    '飛行機の構造',
    '飛行機モデルのプレビュー',
    'キーボード操作の実装',
    'キーマッピング',
  ],
  '/threejs/game-dev/terrain': [
    'プロシージャル地形の仕組み',
    '地形プレビュー',
    '地形生成アルゴリズム',
    '空と雲の実装',
  ],
  '/threejs/game-dev/physics': [
    '飛行の 4 つの力',
    '物理シミュレーション プレビュー',
    '物理更新関数の実装',
    'useFrame での統合',
  ],
  '/threejs/game-dev/camera': [
    '3 つのカメラモード',
    '三人称カメラのプレビュー',
    'カメラ追従ロジック（lerp）',
    '視点切替の実装',
  ],
  '/threejs/game-dev/hud-gameloop': [
    'HUD（Head-Up Display）',
    'ミニゲーム プレビュー',
    'ゲーム状態の管理',
    'チェックポイント当たり判定',
    'HUD の実装パターン',
  ],

  // ===== claude-mux-manual =====
  '/claude-mux': ['対象となるエンジニア', '学習のロードマップ', 'ガイドの特徴', '準備はよろしいですか'],
  '/claude-mux/getting-started/why-claude-code': ['ターミナルファーストのAIエージェント', '他のAIコーディングツールとの違い', 'エージェンティック開発の実践', 'Copilot', 'Cursor'],
  '/claude-mux/claude-intro/claude-code-intro': ['設計コンセプト', '主要な機能カテゴリ', '信頼と安全性のモデル', 'IDE統合', '導入手順', 'キーボードショートカット', 'CLI'],
  '/claude-mux/claude-intro/install-setup': ['インストール', '認証の設定', 'プロジェクトの初期化', '基本的な起動オプション', 'npm', 'API キー'],
  '/claude-mux/claude-intro/slash-commands': ['コア操作コマンド', 'セッション管理', 'コスト・コンテキスト監視', '設定・診断', '開発ワークフロー', 'その他のユーティリティ', 'カスタムコマンド', 'クイック入力プレフィックス', '/help', '/init', '/clear', '/compact', '/cost'],
  '/claude-mux/claude-core/context-management': ['CLAUDE.md メモリ階層', '@import構文とルール管理', '自動メモリ', '.claudeignore', '秘匿情報の保護', 'コンテキスト使用量の監視'],
  '/claude-mux/claude-core/security-permissions': ['承認フロー', 'Human-in-the-loop', 'パーミッションモード', 'パーミッションルール', 'サンドボックス', '設定ファイルの優先順位', 'allow', 'deny'],
  '/claude-mux/claude-core/token-optimization': ['コスト監視コマンド', '自動コンパクション', 'Effort Level', '推論強度', 'コスト削減のベストプラクティス', 'トークン'],
  '/claude-mux/claude-core/extended-thinking': ['モデルファミリーと選択基準', 'Effort Level', '推論深度の制御', '拡張思考', 'Extended Thinking', 'タスク別の推奨設定', 'Opus', 'Sonnet', 'Haiku'],
  '/claude-mux/mcp/mcp-setup': ['アーキテクチャの理解', 'MCPサーバの追加', 'MCPスコープ', 'MCP管理コマンド一覧', 'チームでのMCP共有', 'Model Context Protocol'],
  '/claude-mux/mcp/mcp-practical': ['デザイン → コード', 'ドキュメント参照', 'コード理解・ナビゲーション', 'ブラウザ自動化', '監視・バックエンド連携', '実践的なプロンプト例', 'HTTP MCPとOAuth認証', 'Figma', 'Sentry', 'Puppeteer'],
  '/claude-mux/agent-extensions/subagents': ['マルチエージェント・オーケストレーション', 'ビルトインサブエージェント', 'カスタムエージェントの定義', 'バックグラウンド実行と監視', '並列処理'],
  '/claude-mux/agent-extensions/custom-skills': ['Skills', 'スキル', 'カスタムスラッシュコマンド', 'Hooks', 'ライフサイクルフック', '使い分けガイド'],
  '/claude-mux/ai-coding-agents/gemini-cli': ['Gemini CLI', 'Google', 'オープンソース', 'Apache 2.0', '無料枠', 'GEMINI.md', 'MCP', 'Google 検索グラウンディング', 'npx @google/gemini-cli', 'YOLO モード'],
  '/claude-mux/ai-coding-agents/openai-codex': ['OpenAI Codex', 'Codex CLI', 'ChatGPT', 'AGENTS.md', 'サンドボックス', '承認モード', 'クラウドタスク', 'codex exec', 'Rust', 'IDE 拡張'],
  '/claude-mux/ai-coding-agents/github-copilot': ['GitHub Copilot', 'コード補完', 'Copilot Chat', 'Copilot CLI', 'コーディングエージェント', 'エージェントモード', 'copilot-instructions.md', 'プレミアムリクエスト', 'AI クレジット', 'モデル選択'],
  '/claude-mux/ai-coding-agents/amazon-q-developer': ['Amazon Q Developer', 'AWS', 'Kiro', 'Builder ID', 'IAM Identity Center', 'コード変換', 'Java アップグレード', 'エージェンティックコーディング', 'Bedrock', 'セキュリティスキャン'],
  '/claude-mux/ai-coding-agents/choosing-tools': ['ツール比較', '使い分け', '選定基準', '料金比較', 'エコシステム', 'Claude Code', 'Gemini CLI', 'Codex', 'Copilot', 'Amazon Q'],
  '/claude-mux/claude-core/context-engineering': ['コンテキストエンジニアリング', 'context window', 'トークン管理', '/clear', '/compact', '/rewind', '/btw', '@import', 'Repository Impact Map', 'prompt cache', '1-hour cache', 'subagent context'],
  '/claude-mux/best-practices/harness-engineering': ['ハーネスエンジニアリング', 'harness', 'Agent = Model + Harness', 'Constrain Inform Verify Correct', 'guides sensors', 'Managed Agents', 'meta-harness', 'brain hands session', 'Martin Fowler'],
  '/claude-mux/multi-ai/design-md': ['DESIGN.md', 'CLAUDE.md', 'AGENTS.md', '3 層構造', 'アーキテクチャ', '意思決定', 'ADR', 'SSOT', '@import', 'ツール非依存'],
  '/claude-mux/cmux/cmux-intro': ['cmux', 'Ghostty', 'macOS', 'ネイティブアプリ', 'GUI', '通知リング', '垂直タブ', 'ビルトインブラウザ', 'tmux との比較', 'ソケット API', 'ワークスペース'],
  '/claude-mux/cmux/cmux-setup': ['cmux インストール', 'brew', 'Homebrew', 'CLI シンボリックリンク', 'Claude Code Hooks', 'stop hook', '通知設定', 'マルチエージェント', 'ワークスペース', 'manaflow-ai', 'ペイン分割'],
  '/claude-mux/cmux/agent-teams': ['Agent Teams', 'teammate', 'cmux claude-teams', 'ネイティブ split', 'マルチエージェント', '並列タスク', 'レビュー担当', '実装担当', 'tmux 比較', 'ロール分担'],
  '/claude-mux/cmux/browser-api': ['ビルトインブラウザ', 'Scriptable API', 'ax-snapshot', 'アクセシビリティツリー', 'click', 'fill', 'evaluate', 'JavaScript', 'dev サーバー検証', 'エージェント操作'],
  '/claude-mux/cmux/worktrees': ['git worktree', 'cmux worktree', '並列ブランチ', '作業ツリー分離', 'feature branch', 'hotfix', 'craigsc/cmux', 'manaflow-ai/cmux', 'worktree prune', 'worktree remove'],
  '/claude-mux/reference/troubleshooting': ['よくある問題', 'FAQ', 'トラブルシューティング'],
  '/claude-mux/reference/claude-cheatsheet': ['スラッシュコマンド', 'コア操作', 'セッション管理', '設定・ワークフロー', 'CLI 起動オプション', 'キーボードショートカット', 'CLAUDE.md の構成', 'パーミッションモード'],
  '/claude-mux/best-practices/effective-workflows': ['検証可能な指示を与える', 'Explore → Plan → Implement → Commit', '具体的なコンテキストを提供する', 'セッション管理', 'Fast Mode の活用', 'よくあるアンチパターン', 'ワークフロー設計'],
  '/claude-mux/best-practices/spec-driven-dev': ['SDD', 'Spec-Driven Development', '仕様駆動開発', 'TDD との違い', 'SDD のワークフロー', 'CLAUDE.md と仕様ファイルの連携'],
  '/claude-mux/best-practices/testing-debugging': ['テスト駆動の開発フロー', 'Writer/Reviewer パターン', 'エラーの根本原因を特定するプロンプティング', 'Subagents を使ったコードレビュー', 'スクリーンショットベースの UI デバッグ', 'ファンアウト: 大規模移行での並列処理'],
  '/claude-mux/hooks-advanced/hooks-guide': ['Hooks とは', 'Hook イベント一覧', '3つの Hook タイプ', 'Matcher によるフィルタリング', '入出力の仕様', '設定ファイルの配置スコープ', 'PreToolUse', 'PostToolUse', 'command', 'prompt', 'agent'],
  '/claude-mux/hooks-advanced/hooks-recipes': ['デスクトップ通知', 'ファイル編集後の自動フォーマット', '保護ファイルへの編集ブロック', 'コンパクション後のコンテキスト再注入', 'ツール使用の監査ログ', 'Prompt Hook: タスク完了チェック', 'Agent Hook: テスト実行による検証'],
  '/claude-mux/ci-cd/github-actions': ['claude-code-action の概要', 'セットアップ手順', 'トリガーイベント', '主要パラメータ', 'セキュリティと権限', '実践パターン', 'GitHub Actions'],
  '/claude-mux/ci-cd/headless-mode': ['パイプモード', '自動化スクリプト', '権限の自動承認', 'サンドボックス環境', 'SDK によるプログラム的な利用', 'ヘッドレス実行の主要オプション', '-p', '--dangerously-skip-permissions'],
  '/claude-mux/ide-agent-teams/ide-integration': ['VS Code 連携', 'JetBrains 連携', 'ターミナル統合のセットアップ', 'デスクトップアプリ', '実践的な使い分け', 'IDE 共通の操作ヒント'],
  '/claude-mux/ide-agent-teams/agent-orchestration': ['マルチエージェントの概要', 'Agent Teams の表示モード', 'Git ワークツリーによる分離', 'Subagents とマルチインスタンスの違い', 'エージェント間の情報共有', 'マルチエージェントのベストプラクティス'],
  '/claude-mux/ide-agent-teams/plugins-ecosystem': ['プラグインの概要', 'プラグインの管理', 'プラグインの発見', 'カスタムスラッシュコマンド', 'MCP エコシステムとの連携', 'プラグイン開発の基本'],
  '/claude-mux/multi-ai/multi-ai-coexistence': ['なぜマルチ AI 戦略が必要か', '主要 AI コーディングツールの比較', 'ハイブリッドアーキテクチャの設計', '機能分担パターン', 'スキルの共通化', '段階的導入ガイド'],
  '/claude-mux/multi-ai/single-source-of-truth': ['なぜ SSOT が必要か', '階層的ルール管理', 'SSOT 運用のベストプラクティス', 'シングルソースオブトゥルース'],

  // ===== ai-ml-manual =====
  '/ai-ml': [
    'AI', 'Python', '機械学習', 'ディープラーニング', 'LLM', 'LMOps',
  ],
  '/ai-ml/ai-overview/landscape': [
    'AI', 'ML', 'DL', 'LLM', '全体像', 'Transformer', 'ChatGPT', 'Claude',
    'ニューラルネットワーク', 'RAG', 'ベクトル検索', '画像生成',
  ],
  '/ai-ml/ai-overview/ml-concepts': [
    '教師あり学習', '教師なし学習', '強化学習', '分類', '回帰',
    '特徴量', 'ラベル', '過学習', '汎化', 'クラスタリング',
  ],
  '/ai-ml/python-ml/python-setup': [
    'Python', 'pyenv', 'venv', 'pip', 'Jupyter', 'Google Colab',
    'Miniconda', '環境構築', 'VS Code',
  ],
  '/ai-ml/python-ml/python-basics': [
    'Python', '基本文法', 'リスト内包表記', '関数', 'クラス',
    'JavaScript 比較', '型ヒント', 'f-string', 'スライシング',
  ],
  '/ai-ml/python-ml/data-libraries': [
    'NumPy', 'Pandas', 'Matplotlib', 'ndarray', 'DataFrame',
    'CSV', 'グラフ', '散布図', 'ヒストグラム', 'データ前処理',
  ],
  '/ai-ml/python-ml/python-practice': [
    'Python 実践', 'ユースケース', 'CSV', 'Pandas', 'requests', 'API',
    'スクレイピング', 'BeautifulSoup', 'Pillow', '画像処理', 'JSON', 'YAML',
    'テキスト前処理', '正規表現', 'pathlib', 'CodingChallenge',
  ],
  '/ai-ml/ml-fundamentals/supervised': [
    '教師あり学習', 'scikit-learn', '分類', '回帰', '決定木',
    'ランダムフォレスト', 'SVM', '過学習', 'train_test_split', 'Iris',
  ],
  '/ai-ml/ml-fundamentals/deep-learning': [
    'ディープラーニング', 'ニューラルネットワーク', 'CNN', 'RNN',
    'Transformer', 'PyTorch', 'TensorFlow', 'GPU', '転移学習', 'Google Colab',
  ],
  '/ai-ml/lmops/llm-basics': [
    'LLM', '大規模言語モデル', 'Transformer', 'トークン', 'Embedding',
    'Anthropic API', 'プロンプトエンジニアリング', 'RAG', 'ベクトル検索',
    'Few-shot', 'Chain-of-Thought', 'Pinecone', 'Chroma', 'pgvector',
  ],
  '/ai-ml/lmops/lmops-workflow': [
    'LMOps', 'MLOps', 'RAG パイプライン', 'LangChain', 'Chroma',
    'ファインチューニング', 'トークン', 'コスト最適化', 'ガードレール',
    '評価', 'Langfuse', 'ハルシネーション', 'AI 倫理',
  ],

  // ===== ux-design-manual =====
  '/ux-design': [
    'UX デザイン', 'ユーザー体験', 'UI', 'リサーチ', 'プロトタイプ',
  ],
  '/ux-design/ux-foundations/what-is-ux': [
    'UX', 'UI', 'ユーザー体験', 'ユーザー体験の5要素', 'Garrett',
    '戦略', '要件', '構造', '骨格', '表層',
  ],
  '/ux-design/ux-foundations/design-process': [
    'ダブルダイヤモンド', 'デザインプロセス', 'アジャイル UX', 'リーン UX',
    'Discover', 'Define', 'Develop', 'Deliver',
  ],
  '/ux-design/ux-foundations/design-thinking': [
    'デザイン思考', 'd.school', '共感', '問題定義', 'Ideate',
    'プロトタイプ', 'テスト', 'How Might We', 'ブレインストーミング',
  ],
  '/ux-design/research/user-research': [
    'ユーザーリサーチ', 'インタビュー', 'アンケート', 'A/B テスト',
    '行動観察', 'アナリティクス', '定性', '定量', 'Hotjar',
  ],
  '/ux-design/research/persona-journey': [
    'ペルソナ', 'ジャーニーマップ', 'エンパシーマップ', 'タッチポイント',
    'カスタマージャーニー', '感情曲線',
  ],
  '/ux-design/ia-wireframe/information-architecture': [
    '情報アーキテクチャ', 'IA', 'サイトマップ', 'ナビゲーション',
    'カードソーティング', 'ラベリング', 'ブレッドクラム',
  ],
  '/ux-design/ia-wireframe/wireframe': [
    'ワイヤーフレーム', 'Lo-fi', 'Hi-fi', 'レイアウト',
    'F パターン', 'Z パターン', 'モバイルファースト', 'レスポンシブ',
  ],
  '/ux-design/ui-design/visual-design': [
    'ビジュアルデザイン', '近接', '整列', '反復', 'コントラスト',
    '色彩理論', 'タイポグラフィ', 'WCAG', 'ゲシュタルト', '余白',
  ],
  '/ux-design/ui-design/design-system': [
    'デザインシステム', 'デザイントークン', 'Atomic Design',
    'Material Design', 'Figma', 'コンポーネントライブラリ', 'バリアント',
  ],
  '/ux-design/prototyping/figma-prototype': [
    'Figma', 'プロトタイプ', 'オートレイアウト', 'Dev Mode',
    'スマートアニメート', 'インタラクション', 'v0', 'Figma AI',
  ],
  '/ux-design/for-designers/design-tokens-for-designers': [
    'デザイントークン', 'デザイナー向け', 'Figma Variables', 'Collection',
    'Mode', 'Alias', '役割名', 'セマンティック', '命名', 'ダークモード',
    '共通言語',
  ],
  '/ux-design/for-designers/component-thinking': [
    'コンポーネント', 'コンポーネント思考', 'デザイナー向け', 'バリアント',
    'Main Component', 'インスタンス', 'Component Property', 'props',
    'ハンドオフ', '軸設計', '部品化',
  ],
  '/ux-design/for-designers/ai-collaboration-with-tokens': [
    'AI 駆動開発', 'デザイナー向け', 'プロンプト', 'トークン名',
    '再現性', '一貫性', 'デザイン仕様', 'テンプレート', '共通言語',
    'デザインシステム',
  ],
  '/ux-design/evaluation/usability-testing': [
    'ユーザビリティテスト', 'ヒューリスティック評価', 'Nielsen',
    'SUS', 'タスク完了率', 'NPS', '改善サイクル', 'A/B テスト',
  ],

  // ===== api-manual =====
  '/api': [
    'このマニュアルについて', 'API 設計', 'OpenAPI', 'Swagger', 'REST', 'カリキュラム', '学習の進め方',
  ],
  '/api/quickstart': [
    'クイックスタート', '現場', '緊急', '最短', '学習フロー', 'フロントエンド', 'FE',
    'バックエンド苦手', 'データベース苦手', '要点', 'ロードマップ', '最初に読む', 'survival',
  ],
  '/api/basics/what-is-api': [
    'API とは', 'Application Programming Interface', 'Web API', 'クライアント', 'サーバー',
    'インターフェース', '契約', 'リクエスト', 'レスポンス', 'エンドポイント', 'JSON',
  ],
  '/api/basics/http': [
    'HTTP', 'リクエスト', 'レスポンス', 'メソッド', 'ヘッダー', 'ボディ', 'ステータスコード',
    'URL', 'URI', 'ステートレス', 'HTTPS', 'Content-Type', 'curl',
  ],
  '/api/basics/rest': [
    'REST', 'RESTful', 'Roy Fielding', 'リソース指向', 'ステートレス', '統一インターフェース',
    'HATEOAS', 'Richardson 成熟度モデル', '冪等性', 'キャッシュ',
  ],
  '/api/basics/resources': [
    'リソース設計', 'URI 設計', '名詞', '複数形', 'コレクション', 'ネスト', 'パスパラメータ',
    'クエリパラメータ', '命名規則', 'ケバブケース', 'URL 設計',
  ],
  '/api/data-modeling/er-diagram': [
    'ER図', 'データモデリング', 'エンティティ', '属性', 'リレーション', '多重度', 'カーディナリティ',
    '主キー', '外部キー', 'Crow\'s foot', '一対多', '多対多', '関連', 'mermaid',
  ],
  '/api/data-modeling/normalization': [
    '正規化', '第1正規形', '第2正規形', '第3正規形', '1NF', '2NF', '3NF',
    '非正規化', '冗長', '更新異常', '関数従属', 'データ整合性', 'トレードオフ',
  ],
  '/api/data-modeling/design-flow': [
    '設計フロー', '要件', '概念モデル', '論理モデル', '物理モデル', 'モデル定義',
    'リソース設計', 'ER から API', 'エンティティとリソース', '設計プロセス', 'ドメインモデル',
  ],
  '/api/data-modeling/worked-example': [
    '実践', '設計例', '要件定義', 'ER図', 'テーブル定義', 'OpenAPI', 'エンドポイント',
    '一気通貫', 'ブログ', 'ハンズオン', 'ウォークスルー',
  ],
  '/api/rest-design/http-methods': [
    'HTTP メソッド', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', '冪等性', '安全性',
    'CRUD', 'リソース操作', 'べき等',
  ],
  '/api/rest-design/status-codes': [
    'ステータスコード', '200', '201', '204', '400', '401', '403', '404', '409', '422', '500',
    '2xx', '4xx', '5xx', 'Location ヘッダー', '成功', 'クライアントエラー', 'サーバーエラー',
  ],
  '/api/rest-design/request-response': [
    'リクエスト設計', 'レスポンス設計', 'リクエストボディ', 'レスポンスボディ', 'JSON',
    'エンベロープ', 'メタデータ', 'Content-Type', 'Accept', 'ヘッダー', '一貫性',
  ],
  '/api/rest-design/pagination': [
    'ページネーション', 'オフセット', 'カーソル', 'limit', 'offset', 'cursor', 'フィルタ',
    'ソート', 'sort', 'filter', 'キーセットページネーション', 'リンクヘッダー',
  ],
  '/api/rest-design/error-handling': [
    'エラー設計', 'エラーレスポンス', 'Problem Details', 'RFC 9457', 'RFC 7807',
    'エラーコード', 'バリデーションエラー', '422', 'エラーメッセージ', '一貫性',
  ],
  '/api/rest-design/caching': [
    'HTTP キャッシュ', 'Cache-Control', 'ETag', '条件付きリクエスト', '304 Not Modified',
    'If-None-Match', 'If-Modified-Since', 'Last-Modified', 'max-age', 'no-store',
    'private', 'public', '再検証', 'CDN', '帯域削減',
  ],
  '/api/rest-design/idempotency': [
    'べき等キー', 'Idempotency-Key', 'べき等性', 'リトライ', '安全な再送', '二重作成防止',
    'POST', 'ネットワーク障害', 'タイムアウト', '重複排除', '決済',
  ],
  '/api/build/rate-limiting': [
    'レート制限', 'スロットリング', '429', 'Too Many Requests', 'Retry-After',
    'X-RateLimit-Limit', 'X-RateLimit-Remaining', 'トークンバケット', '固定ウィンドウ',
    'スライディングウィンドウ', 'クォータ', 'DoS 対策',
  ],
  '/api/build/webhooks': [
    'Webhook', '非同期 API', 'イベント駆動', 'コールバック', 'HMAC 署名', '署名検証',
    'リトライ', '冪等性', 'イベント配信', 'ペイロード', 'ポーリング', '202 Accepted',
  ],
  '/api/quality/observability': [
    '可観測性', 'Observability', 'ロギング', 'トレーシング', 'メトリクス', '相関 ID',
    'Correlation ID', 'リクエスト ID', '分散トレーシング', 'OpenTelemetry', 'SLI', 'SLO',
  ],
  '/api/openapi/what-is-openapi': [
    'OpenAPI', 'Swagger', 'OpenAPI Specification', 'OAS', 'API 仕様', '契約', 'スキーマ',
    'YAML', 'JSON', 'ドキュメント', 'openapi.json', '正本', 'Source of Truth',
  ],
  '/api/openapi/document-structure': [
    'OpenAPI ドキュメント', 'openapi', 'info', 'paths', 'components', 'servers',
    'operation', 'parameters', 'requestBody', 'responses', 'tags', 'YAML 構造',
  ],
  '/api/openapi/schema-components': [
    'スキーマ', 'components', 'schemas', '$ref', '再利用', 'JSON Schema', 'type', 'properties',
    'required', 'enum', 'allOf', 'oneOf', 'nullable', 'モデル定義',
  ],
  '/api/openapi/swagger-ui': [
    'Swagger UI', 'Redoc', 'API ドキュメント', 'Try it out', 'Execute', 'Authorize',
    'インタラクティブ', 'docs', 'ドキュメント生成', 'スキーマ表示',
  ],
  '/api/openapi/schema-first': [
    'スキーマファースト', 'デザインファースト', 'コードファースト', '型生成',
    'openapi-typescript', 'コード生成', '契約駆動', 'モック', 'SDK 生成', 'ワークフロー',
  ],
  '/api/build/mock-server': [
    'モックサーバー', 'Prism', 'スタブ', 'モック', 'フロントエンド先行', '並行開発',
    'example', 'レスポンス例', 'API シミュレーション',
  ],
  '/api/build/validation': [
    'バリデーション', '入力検証', 'スキーマ検証', 'Zod', 'JSON Schema', '422',
    'リクエスト検証', '型安全', 'サニタイズ', '境界値', '防御的設計',
  ],
  '/api/build/auth': [
    '認証', '認可', 'Authentication', 'Authorization', 'API キー', 'Bearer トークン',
    'JWT', 'OAuth 2.0', 'スコープ', '401', '403', 'securityScheme',
  ],
  '/api/build/versioning': [
    'バージョニング', 'API バージョン', 'URL バージョニング', 'ヘッダーバージョニング',
    'v1', '後方互換', '破壊的変更', '非推奨', 'Deprecation', 'Sunset',
  ],
  '/api/quality/contract-testing': [
    '契約テスト', 'Contract Testing', 'Pact', 'コンシューマ駆動契約', 'CDC',
    'プロバイダ', 'コンシューマ', '契約のズレ', '型契約', 'スキーマ検証', 'CI',
  ],
  '/api/quality/linting': [
    'Lint', 'Spectral', 'スタイルガイド', 'API ガバナンス', 'ルールセット', '命名規則チェック',
    'OpenAPI 検証', '静的解析', 'CI 連携', '一貫性',
  ],
  '/api/quality/security': [
    'API セキュリティ', 'OWASP API Security Top 10', 'BOLA', '認可不備', 'レート制限',
    'マスアサインメント', '入力検証', 'HTTPS', 'CORS', 'セキュリティヘッダー',
  ],
  '/api/quality/debugging-tools': [
    'デバッグ', '検証ツール', 'curl', 'httpie', 'Postman', 'Bruno', 'Insomnia',
    'DevTools', 'Network パネル', 'Swagger UI', '障害切り分け', 'CORS', '再現', 'ログ',
  ],
  '/api/collaboration/backend-frontend': [
    'バックエンド', 'フロントエンド', 'BE', 'FE', '協業', '観点の違い', '契約駆動',
    'RESTful', 'OpenAPI 共有', '型生成', '並行開発', '責務分担', 'モック',
  ],
  '/api/collaboration/design-and-api': [
    'デザイン', '情報設計', 'IA', '情報アーキテクチャ', 'デザイナー', 'UX',
    'ローディング', 'エラー状態', '空状態', 'ページネーション', 'デザインシステム', 'API レスポンス',
  ],
  '/api/practice/react': [
    'React', 'fetch', 'useEffect', 'TanStack Query', 'React Query', 'useQuery',
    'openapi-typescript', 'openapi-fetch', 'AbortController', 'ローディング', 'エラー処理', '型安全',
  ],
  '/api/practice/nextjs': [
    'Next.js', 'App Router', 'Server Components', 'Route Handlers', 'Server Actions',
    'fetch', 'キャッシュ', 'revalidate', 'use client', 'データフェッチ',
  ],
  '/api/practice/vue': [
    'Vue', 'Composition API', 'ref', 'onMounted', 'VueUse', 'useFetch', 'Pinia',
    'TanStack Query Vue', '型生成', 'リアクティブ', 'ローディング', 'エラー処理',
  ],
  '/api/practice/nuxt': [
    'Nuxt', 'useFetch', 'useAsyncData', '$fetch', 'ofetch', 'server/api', 'Nitro',
    'SSR', 'データフェッチ', '型安全', 'BFF', '重複排除',
  ],
  '/api/advanced/beyond-rest': [
    'GraphQL', 'gRPC', 'REST 以外', 'クエリ言語', 'スキーマ', 'Protocol Buffers',
    'オーバーフェッチ', 'アンダーフェッチ', 'tRPC', 'WebSocket', '使い分け',
  ],
  '/api/advanced/summary': [
    'まとめ', 'チェックリスト', 'API 設計レビュー', 'ベストプラクティス', '設計原則',
    '一貫性', '次のステップ', '振り返り',
  ],

  // ===== vue-manual =====
  '/vue': [
    'このマニュアルについて', 'Vue', 'Nuxt', 'Composition API', 'Pinia', 'カリキュラム', '学習の進め方',
  ],
  '/vue/basics/setup': [
    '環境構築', 'create-vue', 'Vite', 'プロジェクト作成', 'pnpm', 'npm', 'ディレクトリ構成',
    'main.ts', 'App.vue', 'vue-tsc', 'TypeScript', 'SFC',
  ],
  '/vue/basics/template-syntax': [
    'テンプレート構文', 'ディレクティブ', 'v-if', 'v-for', 'v-bind', 'v-on', 'v-model',
    'マスタッシュ', '補間', 'イベント', '条件分岐', 'リスト', 'key',
  ],
  '/vue/basics/reactivity': [
    'リアクティビティ', 'ref', 'reactive', 'computed', '.value', 'リアクティブ', 'toRefs',
    'shallowRef', 'リアクティブの罠', '分割代入', 'watch',
  ],
  '/vue/basics/components': [
    'コンポーネント', 'SFC', 'template', 'script setup', 'style', '登録', 'slot', 'スロット',
    '親子', 'コンポーネント設計', '再利用',
  ],
  '/vue/basics/props-emits': [
    'Props', 'Emits', 'defineProps', 'defineEmits', 'defineModel', '親子通信', 'v-model',
    '型定義', 'デフォルト値', 'reactive props destructure', '双方向バインディング',
  ],
  '/vue/composition/script-setup': [
    'script setup', 'Composition API', 'TypeScript', 'defineProps', 'defineEmits',
    'lang ts', 'コンパイラマクロ', 'Options API との違い', 'setup',
  ],
  '/vue/composition/computed-watch': [
    'computed', 'watch', 'watchEffect', '算出プロパティ', '依存', 'キャッシュ',
    'watchEffect', 'onWatcherCleanup', '副作用', 'immediate', 'deep',
  ],
  '/vue/composition/lifecycle': [
    'ライフサイクル', 'onMounted', 'onUnmounted', 'onUpdated', 'onBeforeMount',
    'マウント', 'アンマウント', 'クリーンアップ', 'フック', 'SSR',
  ],
  '/vue/composition/composables': [
    'Composables', '再利用ロジック', 'use プレフィックス', 'カスタムフック', 'useMouse',
    'VueUse', 'ロジック分離', 'リアクティブ', '共通化',
  ],
  '/vue/composition/provide-inject': [
    'provide', 'inject', '依存性注入', 'Props ドリリング', '深いネスト', 'InjectionKey',
    '型安全', 'テーマ', 'グローバル状態', 'リアクティブ',
  ],
  '/vue/state-routing/router': [
    'Vue Router', 'ルーティング', 'router-link', 'router-view', 'useRoute', 'useRouter',
    '動的ルート', 'ネストルート', 'ナビゲーションガード', 'パラメータ', '遅延読み込み',
  ],
  '/vue/state-routing/pinia': [
    'Pinia', '状態管理', 'defineStore', 'store', 'state', 'getters', 'actions',
    'useStore', 'Vuex', 'グローバル状態', 'storeToRefs', '永続化',
  ],
  '/vue/styling/sfc-styling': [
    'SFC', 'scoped', 'style scoped', 'CSS Modules', 'Tailwind', ':deep', 'v-bind in css',
    'スタイリング', 'スコープ', 'UI ライブラリ', 'Vuetify', 'Nuxt UI',
  ],
  '/vue/nuxt-basics/what-is-nuxt': [
    'Nuxt', 'メタフレームワーク', 'SSR', 'create nuxt-app', 'nuxt.config', 'app ディレクトリ',
    'Nuxt 4', 'srcDir', 'auto import', '規約', 'Nitro',
  ],
  '/vue/nuxt-basics/routing-layouts': [
    'ファイルベースルーティング', 'pages', 'layouts', 'NuxtPage', 'NuxtLayout', '動的ルート',
    '[id]', 'definePageMeta', 'ネストレイアウト', 'navigateTo', 'NuxtLink',
  ],
  '/vue/nuxt-basics/data-fetching': [
    'useFetch', 'useAsyncData', '$fetch', 'ofetch', 'データ取得', 'SSR', '重複排除',
    'pending', 'error', 'refresh', 'lazy', 'getCachedData', 'ssr true',
  ],
  '/vue/nuxt-server/server-api': [
    'server/api', 'Nitro', 'defineEventHandler', 'BFF', 'API ルート', 'プロキシ', 'CORS 回避',
    'useRuntimeConfig', 'getQuery', 'readBody', 'h3', 'サーバールート',
  ],
  '/vue/nuxt-server/rendering-modes': [
    'レンダリングモード', 'SSR', 'SSG', 'ISR', 'CSR', 'SPA', 'プリレンダリング',
    'nuxt generate', 'routeRules', 'ハイブリッド', 'ssr false', 'hydration',
  ],
  '/vue/nuxt-server/middleware-plugins': [
    'ミドルウェア', 'プラグイン', 'モジュール', 'defineNuxtRouteMiddleware', 'defineNuxtPlugin',
    'ルートミドルウェア', '認証ガード', 'Nuxt モジュール', 'auto import', 'フック',
  ],
  '/vue/nuxt-server/deploy': [
    'デプロイ', 'Vercel', 'Netlify', 'Nitro プリセット', 'nuxt build', 'node-server',
    'static', 'エッジ', '環境変数', 'runtimeConfig', 'CI',
  ],
  '/vue/advanced/latest-features': [
    'Vue 3.5', 'Nuxt 4', '最新機能', 'reactive props destructure', 'defineModel', 'useId',
    'useTemplateRef', 'compatibilityVersion', 'まとめ', '次のステップ',
  ],

  // ===== infra-manual =====
  '/infra': [
    'このマニュアルについて', 'バックエンド', 'インフラ', 'DevOps', 'カリキュラム', '前提知識',
  ],
  '/infra/foundations/landscape': [
    'クラウド', 'インフラ', 'IaaS', 'PaaS', 'SaaS', 'オンプレミス', 'AWS', 'GCP', 'Azure',
    'リージョン', '責任共有モデル', 'マネージドサービス',
  ],
  '/infra/foundations/compute-models': [
    'サーバー', 'サーバーレス', 'エッジ', 'VM', 'コンテナ', 'FaaS', 'Lambda', 'コールドスタート',
    'エッジコンピューティング', '実行モデル', 'スケーリング',
  ],
  '/infra/foundations/choosing': [
    'アーキテクチャ', '選択軸', 'SSR', 'SSG', 'CSR', 'モノリス', 'マイクロサービス',
    'コスト', 'スケーラビリティ', '運用負荷', 'トレードオフ',
  ],
  '/infra/hosting/vercel': [
    'Vercel', 'Next.js', 'デプロイ', 'プレビューデプロイ', 'Edge Functions', 'Serverless Functions',
    '環境変数', 'ドメイン', 'ISR', 'ビルド', 'CI',
  ],
  '/infra/hosting/netlify': [
    'Netlify', 'デプロイ', 'Netlify Functions', 'Edge Functions', 'Forms', 'ビルド設定',
    'netlify.toml', 'リダイレクト', '環境変数',
  ],
  '/infra/hosting/cloudflare-pages': [
    'Cloudflare Pages', 'Workers', 'デプロイ', 'エッジ', 'wrangler', 'Functions',
    'KV', 'D1', 'R2', 'バインディング',
  ],
  '/infra/hosting/comparison': [
    'ホスティング比較', 'Vercel', 'Netlify', 'Cloudflare', '選び方', '料金', 'ベンダーロックイン',
    'パフォーマンス', '用途別',
  ],
  '/infra/edge/cdn-basics': [
    'CDN', 'キャッシュ', 'エッジ', 'オリジン', 'TTL', 'キャッシュ無効化', 'Cache-Control',
    'stale-while-revalidate', 'PoP', 'レイテンシ',
  ],
  '/infra/edge/cloudflare': [
    'Cloudflare', 'DNS', 'プロキシ', 'WAF', 'DDoS', 'SSL', 'CDN', 'Zero Trust',
    'ネットワーク', 'セキュリティ',
  ],
  '/infra/edge/edge-functions': [
    'エッジ関数', 'Edge Functions', 'Cloudflare Workers', 'V8 isolate', 'ミドルウェア',
    'エッジコンピューティング', 'WinterCG', '地理的分散', 'レイテンシ',
  ],
  '/infra/baas/what-is-baas': [
    'BaaS', 'Backend as a Service', 'mBaaS', '認証', 'データベース', 'ストレージ',
    'リアルタイム', 'サーバーレス', 'メリット', 'デメリット',
  ],
  '/infra/baas/supabase': [
    'Supabase', 'PostgreSQL', 'Auth', 'Row Level Security', 'RLS', 'Realtime', 'Storage',
    'Edge Functions', 'supabase-js', 'オープンソース',
  ],
  '/infra/baas/firebase': [
    'Firebase', 'Firestore', 'Realtime Database', 'Authentication', 'Cloud Functions',
    'Hosting', 'NoSQL', 'セキュリティルール', 'Google Cloud',
  ],
  '/infra/baas/comparison': [
    'Supabase', 'Firebase', '比較', 'SQL', 'NoSQL', 'RLS', 'セキュリティルール',
    '料金', 'ベンダーロックイン', '選び方',
  ],
  '/infra/database/relational': [
    'リレーショナルデータベース', 'PostgreSQL', 'RDB', 'SQL', 'テーブル', 'インデックス',
    'トランザクション', 'ACID', '正規化', 'JOIN', 'マイグレーション',
  ],
  '/infra/database/serverless-db': [
    'サーバーレス DB', 'Neon', 'PlanetScale', 'Turso', '接続管理', 'コネクションプール',
    'サーバーレス', 'エッジ', 'ブランチング', 'スケール',
  ],
  '/infra/database/orm': [
    'ORM', 'Prisma', 'Drizzle', '型安全', 'スキーマ', 'マイグレーション', 'クエリビルダー',
    'N+1', 'TypeScript', 'リレーション',
  ],
  '/infra/database/beyond-relational': [
    'KV', 'Key-Value', 'Redis', 'ベクトルデータベース', 'pgvector', 'オブジェクトストレージ',
    'S3', 'R2', 'NoSQL', '埋め込み', 'キャッシュ',
  ],
  '/infra/bff/what-is-bff': [
    'BFF', 'Backend for Frontend', 'API集約', 'プロキシ', 'BFFパターン', 'マイクロサービス',
    'オーケストレーション', 'フロントエンド最適化',
  ],
  '/infra/bff/auth': [
    '認証', '認可', 'JWT', 'セッション', 'OAuth', 'OpenID Connect', 'シークレット管理',
    '環境変数', 'トークン', 'Cookie', 'CSRF',
  ],
  '/infra/bff/api-gateway': [
    'API Gateway', 'ゲートウェイ', 'ルーティング', 'レート制限', '認証', 'バックエンド構成',
    'リバースプロキシ', 'マイクロサービス',
  ],
  '/infra/devops/cicd': [
    'CI/CD', '継続的インテグレーション', '継続的デリバリー', 'GitHub Actions', 'パイプライン',
    'ビルド', 'テスト', 'デプロイ', 'ワークフロー', '自動化',
  ],
  '/infra/devops/iac': [
    'IaC', 'Infrastructure as Code', 'Terraform', 'Pulumi', '宣言的', 'べき等',
    '状態管理', 'プロビジョニング', '再現性',
  ],
  '/infra/devops/containers': [
    'コンテナ', 'Docker', 'イメージ', 'Dockerfile', 'Kubernetes', 'オーケストレーション',
    '仮想化', '実行環境', 'コンテナレジストリ',
  ],
  '/infra/observability/monitoring': [
    'モニタリング', 'ログ', 'メトリクス', 'トレース', '可観測性', 'Observability',
    'アラート', 'Sentry', 'Datadog', '構造化ログ',
  ],
  '/infra/observability/sre': [
    'SRE', '信頼性', 'SLI', 'SLO', 'SLA', 'エラーバジェット', 'トイル',
    'インシデント', '可用性', 'ポストモーテム',
  ],
  '/infra/aws/overview': [
    'AWS', 'Amazon Web Services', 'マネジメントコンソール', 'リージョン', 'アベイラビリティゾーン',
    '主要サービス', 'EC2', 'S3', 'Lambda', 'RDS', 'IAM', 'グローバルインフラ',
  ],
  '/infra/aws/iam-account': [
    'IAM', 'アカウント設計', 'ルートユーザー', 'IAMユーザー', 'ロール', 'ポリシー',
    '最小権限', 'MFA', 'AWS Organizations', 'マルチアカウント', 'IAM Identity Center',
  ],
  '/infra/aws/network-vpc': [
    'VPC', 'ネットワーク', 'サブネット', 'パブリックサブネット', 'プライベートサブネット',
    'セキュリティグループ', 'ルートテーブル', 'インターネットゲートウェイ', 'NAT', 'CIDR',
  ],
  '/infra/aws/compute': [
    'コンピュート', 'EC2', 'ECS', 'Fargate', 'Lambda', 'Auto Scaling', 'ロードバランサー',
    'ALB', 'コンテナ', 'サーバーレス', 'AMI',
  ],
  '/infra/aws/storage-cdn': [
    'S3', 'オブジェクトストレージ', 'EBS', 'EFS', 'CloudFront', 'CDN', '静的サイトホスティング',
    'バケット', '署名付きURL', 'ストレージクラス', 'OAC',
  ],
  '/infra/aws/database': [
    'RDS', 'Aurora', 'DynamoDB', 'ElastiCache', 'リレーショナル', 'NoSQL', 'マネージドDB',
    'リードレプリカ', 'マルチAZ', 'バックアップ',
  ],
  '/infra/aws/cost-ops': [
    'コスト管理', 'Billing', 'Cost Explorer', 'Budgets', 'CloudWatch', 'Well-Architected',
    'タグ', '従量課金', '無料利用枠', 'コスト最適化', 'CloudTrail',
  ],

  // ===== devflow-manual =====
  '/devflow': [
    'このマニュアルについて', '開発フロー', 'チーム', 'DesignOps', 'カリキュラム', 'アジャイル',
  ],
  '/devflow/agile/what-is-agile': [
    'アジャイル', 'アジャイルソフトウェア開発宣言', 'ウォーターフォール', '反復', 'インクリメンタル',
    '価値', '原則', '適応', '顧客協調',
  ],
  '/devflow/agile/scrum': [
    'スクラム', 'スプリント', 'プロダクトオーナー', 'スクラムマスター', '開発者',
    'スクラムイベント', 'プロダクトバックログ', '透明性', '検査', '適応',
  ],
  '/devflow/agile/sprint': [
    'スプリント', 'スプリントプランニング', 'デイリースクラム', 'スプリントレビュー',
    'レトロスペクティブ', 'スプリントゴール', 'ベロシティ', 'バーンダウン',
  ],
  '/devflow/agile/kanban': [
    'カンバン', 'WIP制限', 'フロー効率', 'リードタイム', 'サイクルタイム', 'ボード',
    'プル型', '可視化', '継続的フロー',
  ],
  '/devflow/pm/backlog': [
    'バックログ', 'ユーザーストーリー', 'INVEST', '受け入れ基準', 'エピック',
    'バックログリファインメント', '優先順位', 'プロダクトオーナー',
  ],
  '/devflow/pm/estimation': [
    '見積もり', 'ストーリーポイント', 'プランニングポーカー', '相対見積もり', 'ベロシティ',
    'Tシャツサイズ', '不確実性', 'コーンオブアンサーティンティ',
  ],
  '/devflow/pm/roadmap': [
    'ロードマップ', '優先順位付け', 'RICE', 'MoSCoW', '価値', 'アウトカム',
    'マイルストーン', 'ナウネクストレイター', 'ステークホルダー',
  ],
  '/devflow/devops/culture': [
    'DevOps', '文化', 'CALMS', 'Culture', 'Automation', 'Lean', 'Measurement', 'Sharing',
    'サイロ', 'コラボレーション', '責任共有',
  ],
  '/devflow/devops/dora': [
    'DORA', 'Four Keys', 'デプロイ頻度', 'リードタイム', '変更失敗率', '平均復旧時間',
    'MTTR', '開発生産性', 'エリートパフォーマー', 'SPACE',
  ],
  '/devflow/devops/branching': [
    'ブランチ戦略', 'Git Flow', 'GitHub Flow', 'trunk-based', 'リリースフロー', 'フィーチャーフラグ',
    'マージ', 'デプロイ', '継続的デリバリー',
  ],
  '/devflow/review/why-review': [
    'コードレビュー', '目的', '品質', '知識共有', 'バス係数', '欠陥検出',
    '共同所有', 'フィードバック', 'メリット',
  ],
  '/devflow/review/pull-request': [
    'Pull Request', 'PR', 'マージリクエスト', 'ドラフト', 'レビュアー', 'PRサイズ',
    'セルフレビュー', 'テンプレート', 'CI', '小さなPR',
  ],
  '/devflow/review/perspectives': [
    'レビュー観点', 'チェックリスト', '正確性', '可読性', '設計', 'セキュリティ',
    'テスト', 'パフォーマンス', 'ノンブロッキング', '指摘',
  ],
  '/devflow/review/culture': [
    'レビュー文化', 'コミュニケーション', '心理的安全性', 'コンベンショナルコメント',
    'nit', '人ではなくコード', 'フィードバック', '建設的',
  ],
  '/devflow/designops/what-is-designops': [
    'DesignOps', 'デザインオペレーション', 'デザインシステム', 'デザイン負債', 'プロセス',
    'スケール', 'ワークフロー', 'ツール', 'ガバナンス',
  ],
  '/devflow/designops/design-review': [
    'デザインレビュー', 'クリティーク', 'フィードバック', 'デザイン批評', 'ヒューリスティック評価',
    'アクセシビリティ', '一貫性', '観点', 'デザイン QA',
  ],
  '/devflow/designops/handoff': [
    'ハンドオフ', 'デザインとエンジニア', '協業', 'Figma', 'デザイントークン', 'Dev Mode',
    'Storybook', 'デザインシステム', '実装ギャップ', 'Code Connect',
  ],
  '/devflow/team/documentation': [
    'ドキュメンテーション', 'ADR', 'Architecture Decision Record', '意思決定記録', 'README',
    'ランブック', 'ナレッジ共有', 'ドキュメント駆動',
  ],
  '/devflow/team/retrospective': [
    'ふりかえり', 'レトロスペクティブ', 'KPT', 'YWT', '継続的改善', 'カイゼン',
    'アクションアイテム', 'タイムライン', 'Fun Done Learn',
  ],
  '/devflow/team/incident': [
    'インシデント対応', 'ポストモーテム', '障害対応', '非難なきポストモーテム', 'RCA',
    '根本原因分析', 'インシデント指揮官', 'タイムライン', '再発防止',
  ],
  '/git/flow-automation/templates': [
    'Issue / PR テンプレート', 'なぜ入口を標準化するのか', 'Issue テンプレート', 'PR テンプレート',
    'テンプレート', 'template', 'templates', 'Issue Forms', 'ISSUE_TEMPLATE', 'PULL_REQUEST_TEMPLATE',
    'config.yml', 'blank_issues_enabled', 'contact_links', 'validations', 'チェックリスト',
    '入口の標準化', 'バグ報告', '機能リクエスト', 'コーディングチャレンジ',
  ],
  '/git/github-actions/secrets-permissions': [
    'トークン・シークレット・権限の実務', 'まず全体地図 どの認証をいつ使うか',
    'PAT', 'Personal Access Token', 'アクセストークン', 'token', 'トークン',
    'fine-grained', 'classic', 'secrets', 'シークレット', 'secret 登録',
    'GITHUB_TOKEN', 'permissions', '権限', '最小権限', 'Workflow permissions',
    '認証', 'SSH', 'HTTPS', 'gh auth', 'GitHub App', 'OIDC', 'Dependabot secret',
    '有効期限', '期限切れ', '403', 'fork の PR', 'よくあるハマり', 'コーディングチャレンジ',
  ],
  '/react/testing/overview': [
    'テストの全体像とテストピラミッド', 'なぜテストを書くのか', 'テストピラミッド',
    'test pyramid', '単体テスト', '統合テスト', 'E2E', '振る舞いをテストする',
    '実装詳細に依存しない', 'フレームワーク非依存', '疎結合', 'テスト戦略',
    'unit', 'integration', 'end-to-end', 'テストの ROI', 'どこまでテストするか',
  ],
  '/react/testing/vitest-unit': [
    'Vitest で単体テスト', 'Vitest', 'vitest', 'describe', 'it', 'test', 'expect',
    'アサーション', 'AAA パターン', 'Arrange Act Assert', '純粋関数のテスト',
    'カバレッジ', 'coverage', 'jsdom', 'モック', 'mock', 'vi.fn', 'test.each',
    '任意の TS/JS に効く', 'フレームワーク非依存', '単体テスト',
  ],
  '/react/testing/rtl-components': [
    'React コンポーネントのテスト', 'React Testing Library', 'RTL', 'testing-library',
    'render', 'screen', 'getByRole', 'getByText', 'userEvent', 'fireEvent',
    'ユーザー視点', '実装詳細に依存しないテスト', 'アクセシブルなクエリ',
    'クエリ優先順位', 'findBy', 'waitFor', '疎結合なテスト', 'コンポーネント単体テスト',
  ],
  '/react/testing/playwright-e2e': [
    'Playwright で E2E テスト', 'Playwright', 'playwright', 'E2E', 'end-to-end',
    'ブラウザ自動化', 'page.goto', 'locator', 'getByRole', 'expect', 'webServer',
    'playwright.config', 'axe-core', 'a11y 自動チェック', 'フレームワーク非依存',
    '任意の Web アプリを駆動', 'CI 連携', 'トレース', 'リトライ', 'フレーキーテスト',
  ],
  '/react/testing/snapshot-visual': [
    'スナップショットとビジュアルリグレッション', 'スナップショットテスト', 'snapshot',
    'toMatchSnapshot', 'toMatchInlineSnapshot', 'toHaveScreenshot', 'ビジュアルリグレッション',
    'visual regression', 'Chromatic', 'Storybook', 'いつ使うか いつ使わないか',
    'スナップショットの陳腐化', '差分検出', 'ピクセル比較', 'ベースライン更新',
  ],
};
