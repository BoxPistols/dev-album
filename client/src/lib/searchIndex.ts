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
  '/claude-mux/getting-started/why-claude-code': ['ターミナルファーストのAIエージェント', '他のAIコーディングツールとの違い', 'エージェンティック開発の実践', 'tmux', 'Copilot', 'Cursor'],
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
  '/claude-mux/tmux-intro/why-tmux': ['エンジニアにとってのtmuxの価値', 'AIコーディングとの組み合わせ', '生産性の向上', 'このマニュアルで習得できること', 'セッション永続化'],
  '/claude-mux/tmux-intro/iterm-vs-tmux': ['根本的な違い', '主要な違いの詳細解説', 'なぜエンジニアがtmuxを学ぶべきか', 'iTerm2'],
  '/claude-mux/tmux-intro/prerequisites': ['必要な前提知識', '初心者向けのヒント', 'ターミナルの動作確認', 'OS環境の確認', 'シェル', 'zsh', 'bash'],
  '/claude-mux/tmux-setup/install-tmux': ['macOS でのインストール', 'Windows WSL2 でのインストール', 'Homebrew', 'apt'],
  '/claude-mux/tmux-setup/verify-install': ['バージョン確認', 'セッション作成', '動作確認'],
  '/claude-mux/tmux-basics/core-concepts': ['セッション', 'ウィンドウ', 'ペイン', 'サーバー', 'クライアント', '階層構造'],
  '/claude-mux/tmux-basics/first-session': ['最初のセッション', 'attach', 'detach', 'new-session', 'kill-session'],
  '/claude-mux/tmux-basics/prefix-key': ['プリフィックスキー', 'Ctrl+b', 'キーバインド', 'ショートカット'],
  '/claude-mux/tmux-basics/windows-panes': ['ウィンドウとペインの操作', '画面分割', 'split-window', 'select-pane', 'resize-pane'],
  '/claude-mux/tmux-customize/tmux-config': ['設定ファイルの場所', 'まず設定すべき3つの基本', '設定の反映', 'まとめ: 最初の.tmux.conf', 'マウス操作', 'base-index', '256色'],
  '/claude-mux/tmux-customize/productivity-config': ['キーバインドの変更方法', '必須カスタマイズ3選', 'Vimユーザー向け設定', 'bind-key', 'prefix'],
  '/claude-mux/tmux-customize/plugins': ['TPM', 'Tmux Plugin Manager', '導入ステップ', 'おすすめプラグイン', 'Dracula テーマ'],
  '/claude-mux/integration/tmux-integration': ['tmux を利用する技術的な利点', 'MCP連携', '推奨ペインレイアウト', '運用の基本サイクル', 'AI Cockpit'],
  '/claude-mux/integration/tmuxp-automation': ['宣言的な環境管理', 'MCPサーバとの組み合わせ', '自動化のメリット', 'tmuxp', 'YAML'],
  '/claude-mux/integration/practical-workflow': ['統合アーキテクチャの全体像', 'シナリオ 1: 新機能の実装', 'シナリオ 2: 本番バグの調査・修正', 'シナリオ 3: スペック駆動開発', '再現可能な環境の構築', 'ワークフローの要点'],
  '/claude-mux/reference/session-management': ['tmuxの弱点：再起動', 'tmux-resurrect の導入', '使い方：保存と復元', 'tmux-continuum による完全自動化', '永続化'],
  '/claude-mux/reference/troubleshooting': ['よくある問題', 'FAQ', 'トラブルシューティング'],
  '/claude-mux/reference/claude-cheatsheet': ['スラッシュコマンド', 'コア操作', 'セッション管理', '設定・ワークフロー', 'CLI 起動オプション', 'キーボードショートカット', 'CLAUDE.md の構成', 'パーミッションモード'],
  '/claude-mux/reference/tmux-cheatsheet': ['セッション操作', 'ウィンドウ操作', 'ペイン操作', 'コピーモード', 'tmux.conf 主要設定', 'カスタムキーバインド', 'コマンドラインモード'],
  '/claude-mux/best-practices/effective-workflows': ['検証可能な指示を与える', 'Explore → Plan → Implement → Commit', '具体的なコンテキストを提供する', 'セッション管理', 'Fast Mode の活用', 'よくあるアンチパターン', 'ワークフロー設計'],
  '/claude-mux/best-practices/spec-driven-dev': ['SDD', 'Spec-Driven Development', '仕様駆動開発', 'TDD との違い', 'SDD のワークフロー', 'CLAUDE.md と仕様ファイルの連携'],
  '/claude-mux/best-practices/testing-debugging': ['テスト駆動の開発フロー', 'Writer/Reviewer パターン', 'エラーの根本原因を特定するプロンプティング', 'Subagents を使ったコードレビュー', 'スクリーンショットベースの UI デバッグ', 'ファンアウト: 大規模移行での並列処理'],
  '/claude-mux/hooks-advanced/hooks-guide': ['Hooks とは', 'Hook イベント一覧', '3つの Hook タイプ', 'Matcher によるフィルタリング', '入出力の仕様', '設定ファイルの配置スコープ', 'PreToolUse', 'PostToolUse', 'command', 'prompt', 'agent'],
  '/claude-mux/hooks-advanced/hooks-recipes': ['デスクトップ通知', 'ファイル編集後の自動フォーマット', '保護ファイルへの編集ブロック', 'コンパクション後のコンテキスト再注入', 'ツール使用の監査ログ', 'Prompt Hook: タスク完了チェック', 'Agent Hook: テスト実行による検証'],
  '/claude-mux/ci-cd/github-actions': ['claude-code-action の概要', 'セットアップ手順', 'トリガーイベント', '主要パラメータ', 'セキュリティと権限', '実践パターン', 'GitHub Actions'],
  '/claude-mux/ci-cd/headless-mode': ['パイプモード', '自動化スクリプト', '権限の自動承認', 'サンドボックス環境', 'SDK によるプログラム的な利用', 'ヘッドレス実行の主要オプション', '-p', '--dangerously-skip-permissions'],
  '/claude-mux/ide-agent-teams/ide-integration': ['VS Code 連携', 'JetBrains 連携', 'ターミナル統合のセットアップ', 'デスクトップアプリ', '実践的な使い分け', 'IDE 共通の操作ヒント'],
  '/claude-mux/ide-agent-teams/agent-orchestration': ['マルチエージェントの概要', 'tmux でのマルチエージェント構成', 'Git ワークツリーによる分離', 'Subagents とマルチインスタンスの違い', 'エージェント間の情報共有', 'マルチエージェントのベストプラクティス'],
  '/claude-mux/ide-agent-teams/plugins-ecosystem': ['プラグインの概要', 'プラグインの管理', 'プラグインの発見', 'カスタムスラッシュコマンド', 'MCP エコシステムとの連携', 'プラグイン開発の基本'],
  '/claude-mux/multi-ai/multi-ai-coexistence': ['なぜマルチ AI 戦略が必要か', '主要 AI コーディングツールの比較', 'ハイブリッドアーキテクチャの設計', '機能分担パターン', 'スキルの共通化', '段階的導入ガイド'],
  '/claude-mux/multi-ai/single-source-of-truth': ['なぜ SSOT が必要か', '階層的ルール管理', 'SSOT 運用のベストプラクティス', 'シングルソースオブトゥルース'],
};
