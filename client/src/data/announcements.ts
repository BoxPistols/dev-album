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
    id: "2026-08-16-claim-audit",
    date: "2026-08-16",
    title: "全 342 ページの事実主張を一次情報と照合し、152 件を修正した",
    description:
      "外部の一次情報で真偽が確定する主張を全ページから抽出し、高リスクに分類した 466 件をベンダー公式ドキュメント・仕様書・公式リポジトリと照合した。3 分の 1 にあたる 152 件が食い違っており、削除済み API を使ったコード例、デフォルト値が逆の説明、古くなった設定キー名などを修正した。一次情報に当たっても確定しなかった 34 件は本文から削除している。判定の全記録は docs/audits/2026-08-16-claim-audit.md にある。",
    category: "fix",
    link: "/claude-mux/multi-ai/agent-docs",
  },
  {
    id: "2026-08-16-design-md-spec",
    date: "2026-08-16",
    title: "Google Labs の DESIGN.md を扱うページを追加",
    description:
      "Stitch から切り出されたビジュアルアイデンティティ記述フォーマットを、公式仕様と @google/design.md@0.4.0 の実挙動で解説した。8 セクションの順序制約、コンポーネントに書ける 8 プロパティ、11 個の lint ルールに加え、クォートしない数値が lint 無警告・exit 0 のまま export から消える挙動を再現手順つきで載せている。",
    category: "feature",
    link: "/claude-mux/multi-ai/design-md",
  },
  {
    id: "2026-08-16-agent-docs-rename",
    date: "2026-08-16",
    title: "3 層ドキュメントの第 3 層を ARCHITECTURE.md に改め、公式記述で裏を取り直した",
    description:
      "DESIGN.md は Google Labs の公開フォーマット名として実在し内容も別物のため、アーキテクチャ決定記録の層を ARCHITECTURE.md に改名した。あわせて「Claude Code は AGENTS.md を自動では読まない」「@import ではコンテキストは減らない」「compact 後の再読込指示は不要」の 3 点を公式ドキュメントの記述に沿って訂正している。",
    category: "fix",
    link: "/claude-mux/multi-ai/agent-docs",
  },
  {
    id: "2026-08-11-git-slack-notifications",
    date: "2026-08-11",
    title: "Git 編のフロー自動化に「Slack 通知連携」ページを追加",
    description:
      "GitHub 公式 Slack アプリの購読コマンドとフィルタを、既定で有効なイベント（issues / pulls / commits / releases / deployments）と無効なイベント（reviews / comments / branches / workflows / discussions）の区別まで含めて整理した。開発・QA・PM の役割別チャンネル設定例に加え、チートシートに出回っている -label 除外や /github mute が公式アプリには存在しないことも明示している。",
    category: "feature",
    link: "/git/flow-automation/notifications",
  },
  {
    id: "2026-07-26-manual-brand-color-contrast",
    date: "2026-07-26",
    title: "マニュアル別ブランドカラーのコントラストを全 8 マニュアル × 3 テーマで是正",
    description:
      "マニュアルごとに変わる primary 色が、ステップ番号バッジ（bg-primary/20 に text-primary）などの自己色ティントの上で WCAG AA 4.5:1 に届かない箇所があった。ティントの上限を bg-primary/10 に揃え、届かなかった 7 トークンを色相を保ったまま調整した。あわせて本文中のリンクを hover 時だけの下線から常時下線に変更し、色に依存せずリンクと分かるようにした。",
    category: "fix",
    link: "/ux-design/for-designers/design-tokens-for-designers",
  },
  {
    id: "2026-07-24-react-testing-overview",
    date: "2026-07-24",
    title: "React 編に「テスト戦略」セクションを新設（テストの全体像）",
    description:
      "テストを特定フレームワークに依存しない実践として学ぶ新セクションの入口。テストピラミッド（単体 / 統合 / E2E）と「振る舞いをテストする（実装詳細に依存しない）」という原則を軸に、なぜテストが移植可能なスキルになるのかを整理した。このアプリ自身がロジックと E2E は持つがコンポーネントテストは持たない、という現状の判断も題材にしている。",
    category: "feature",
    link: "/react/testing/overview",
  },
  {
    id: "2026-07-24-react-testing-vitest-unit",
    date: "2026-07-24",
    title: "テスト戦略編に「Vitest で単体テスト」ページを追加",
    description:
      "純粋関数を対象にした単体テストの基本（describe / it / expect、AAA パターン、カバレッジ）を、このリポジトリ自身の lib/*.test.ts を実例に解説。Vitest は React を必要とせず任意の TS/JS に対して走る、という非依存性を前面に置いた。",
    category: "feature",
    link: "/react/testing/vitest-unit",
  },
  {
    id: "2026-07-24-react-testing-rtl-components",
    date: "2026-07-24",
    title: "テスト戦略編に「React コンポーネントのテスト（RTL）」ページを追加",
    description:
      "React Testing Library を、テスト戦略の中で唯一の React 結合点として扱う。getByRole などアクセシブルなクエリで「実装ではなくユーザーに見える振る舞い」を検証する RTL の思想そのものが、疎結合なテストの具体例になることを示した。",
    category: "feature",
    link: "/react/testing/rtl-components",
  },
  {
    id: "2026-07-24-react-testing-playwright-e2e",
    date: "2026-07-24",
    title: "テスト戦略編に「Playwright で E2E テスト」ページを追加",
    description:
      "ブラウザを実際に操作する E2E テストを、フレームワーク非依存の手法として解説。このリポジトリの e2e/*.spec.ts と axe-core による a11y 自動チェックを実例に扱い、E2E は現状 CI に組み込まれていない点も明示した。",
    category: "feature",
    link: "/react/testing/playwright-e2e",
  },
  {
    id: "2026-07-24-react-testing-snapshot-visual",
    date: "2026-07-24",
    title: "テスト戦略編に「スナップショットとビジュアルリグレッション」ページを追加",
    description:
      "Vitest の toMatchSnapshot と Playwright の toHaveScreenshot、そして Storybook + Chromatic によるビジュアルリグレッションを整理。スナップショットが陳腐化しやすい性質を踏まえ「いつ使い、いつ使わないか」の判断軸を中心に据えた。",
    category: "feature",
    link: "/react/testing/snapshot-visual",
  },
  {
    id: "2026-07-23-git-actions-secrets-permissions",
    date: "2026-07-23",
    title: "GitHub Actions 編に「トークン・シークレット・権限の実務」ページを追加",
    description:
      "初学者が最も詰まる認証・権限まわりを 1 枚に集約。どの認証（SSH / HTTPS+PAT / gh / GITHUB_TOKEN / PAT / GitHub App / OIDC）をいつ使うかの全体地図、Fine-grained PAT の発行手順、シークレットの登録とスコープ（repository / environment / organization、Dependabot は別枠）、GITHUB_TOKEN の最小権限、そして 403・HTTPS のパスワード・fork の secret・期限切れなどのよくあるハマり集をまとめた。シークレット利用ページの手前に配置。",
    category: "feature",
    link: "/git/github-actions/secrets-permissions",
  },
  {
    id: "2026-07-23-git-flow-issue-pr-templates",
    date: "2026-07-23",
    title: "Git フロー自動化編に「Issue / PR テンプレート」ページを追加",
    description:
      "開発フロー自動化とガバナンス編の最初に、Issue と PR の入口を標準化するテンプレートの解説ページを追加。Issue Forms（YAML）による必須入力・ドロップダウン、config.yml での白紙起票の無効化、PULL_REQUEST_TEMPLATE.md のチェックリスト設計を、このリポジトリ自身の .github 設定を実例として扱う。ラベル自動化やアサインの前提となる「入口の型」を最初に学べる。",
    category: "feature",
    link: "/git/flow-automation/templates",
  },
  {
    id: "2026-07-21-github-actions-reference",
    date: "2026-07-21",
    title: "GitHub Actions リファレンス（パラメータ一覧）ページを追加",
    description:
      "トリガーイベント（on）・コンテキスト・式の関数・よく使う公式アクション・permissions スコープ・ランナーラベルと課金倍率・gh CLI コマンドを、検索して当てはめる早見表としてまとめた実践リファレンスを GitHub Actions / CI/CD 編の最後に追加。読み終えると Git フローの中級者として日常的に参照できる一冊になる。",
    category: "feature",
    link: "/git/github-actions/reference",
  },
  {
    id: "2026-07-21-git-flow-automation-section",
    date: "2026-07-21",
    title: "Git マニュアルに「開発フロー自動化とガバナンス」編を新設（全6ページ）",
    description:
      "GitHub を中心にした Git フロー全体のエコシステム設計を、「なぜ自動化するのか」という背景から解説。自動テストと自動修正（整形・Dependabot・CodeQL・AI 修正）、ラベルと分類の自動化、CODEOWNERS によるアサインとレビューの自動割り当て、GitHub Projects 連携、そして意図せぬマージを防ぐマージガバナンス（ブランチ保護 / Ruleset・自己承認防止・auto-merge）までを6ページで扱う。CI/CD 編に続く実践編として、各ページにコーディングチャレンジ・クイズ・参照リンクを備える。",
    category: "feature",
    link: "/git/flow-automation/why",
  },
  {
    id: "2026-07-21-github-actions-cicd-section",
    date: "2026-07-21",
    title: "Git マニュアルに「GitHub Actions / CI/CD」編を新設（全7ページ）",
    description:
      "最初のワークフロー YAML から、トリガー・ジョブ制御、Node/React の CI パイプライン、シークレットと環境・デプロイ（CD）、再利用ワークフローと最適化・トラブルシュート、パラメータ一覧リファレンスまでを、YAML を書きながら一通り体験できる7ページを追加。各ページに config/terminal プレビュー付きのコーディングチャレンジとクイズ、公式ドキュメントへの参照リンクを備える。",
    category: "feature",
    link: "/git/github-actions/intro",
  },
  {
    id: "2026-07-05-preview-dark-contrast-fix",
    date: "2026-07-05",
    title: "ライブプレビューのダークテーマ表示崩れを全ページ一括修正",
    description:
      "プレビュー内で固定色の文字とテーマ連動の背景（またはその逆）が混在し、ダークテーマで文字が背景に沈んで読めなくなる箇所を、React マニュアル全体で洗い出して修正した。MUI カスタマイズ・状態管理・アクセシビリティ・Storybook・CSS 設計・コンポーネント駆動開発など 20 ページ以上のプレビューが、ライト／ダーク双方で正しく読めるようになった。",
    category: "fix",
    link: "/react/mui/customization",
  },
  {
    id: "2026-07-04-mui-live-previews",
    date: "2026-07-04",
    title: "MUI マニュアルの UI 例をすべてライブプレビュー化（デザイナー向け）",
    description:
      "静的なコードだけでは UI が見えずデザイナーに伝わらないという指摘を受け、Grid・Stack・TextField・Select・Snackbar・Dialog・AppBar・Drawer・ダッシュボードなどのコンポーネント例を、実際に描画される（そして Snackbar / Dialog / Drawer はクリックで開く）ライブプレビューに置き換えた。コードを読まなくても完成形の UI と挙動を確認できる。",
    category: "update",
    link: "/react/mui/components",
  },
  {
    id: "2026-07-03-ai-coding-agents-section",
    date: "2026-07-03",
    title: "「AI コーディングエージェント」セクションを新設（Gemini CLI / Codex / Copilot / Amazon Q）",
    description:
      "Claude Code 以外の主要 AI コーディングツール 4 つと、ユースケース別の選び方・使い分けを解説する 5 ページを追加。各ページは公式ドキュメントの一次情報のみを根拠に、インストール手順・料金体系・Claude Code との特性の違いを扱う。",
    category: "feature",
    link: "/claude-mux/ai-coding-agents/choosing-tools",
  },
  {
    id: "2026-07-03-designer-tokens-section",
    date: "2026-07-03",
    title: "デザイナー向け「トークンとコンポーネント」セクションを新設",
    description:
      "コードを書いたことがないデザイナーを対象に、デザイントークン入門・コンポーネント思考・AI 時代のデザイン共通言語の 3 ページを UX デザインマニュアルに追加。Figma Variables との対応や、トークン語彙で AI に指示するプロンプトの書き方まで扱う。",
    category: "feature",
    link: "/ux-design/for-designers/design-tokens-for-designers",
  },
  {
    id: "2026-07-03-claude-code-fact-check",
    date: "2026-07-03",
    title: "Claude Code ガイドを公式ドキュメントと全面照合",
    description:
      "Claude Code 関連 13 ページを公式リファレンス 15 ページと突き合わせ、廃止済み機能（.claudeignore、claude config set 等）や誤った記述（thinking トークンの課金、スラッシュコマンドのプレフィックス、MCP スコープの保存先等）を現行仕様に修正した。",
    category: "fix",
    link: "/claude-mux/claude-intro/claude-code-intro",
  },
  {
    id: "2026-07-03-tmux-section-retired",
    date: "2026-07-03",
    title: "tmux セクションを終了し、AI エージェント中心の構成に再編",
    description:
      "Claude Code & 開発環境マニュアルから tmux 関連 17 ページを削除し、AI コーディングエージェントの比較・使い分けに紙面を再配分した。旧 URL は自動的にマニュアルトップへリダイレクトされる。",
    category: "release",
    link: "/claude-mux",
  },
  {
    id: "2026-07-03-a11y-and-preview-hardening",
    date: "2026-07-03",
    title: "アクセシビリティ改善とプレビュー基盤の安定化",
    description:
      "axe-core による自動検査を導入し、コードエディタのラベル・コントラスト不足（muted-foreground トークン等）・キーボード操作の問題を修正。ライブプレビューのライブラリ読み込みを CDN 依存からセルフホストに切り替え、オフラインや社内ネットワークでも安定動作するようにした。",
    category: "update",
    link: "/react/accessibility/semantic-aria",
  },
  {
    id: "2026-07-03-live-preview-real-libraries",
    date: "2026-07-03",
    title: "ライブプレビューが MUI / Tailwind / styled-components / Emotion の実ライブラリで動作するように",
    description:
      "プレビュー基盤を拡張し、コード例が対象ライブラリ本体（CDN 版）をブラウザ内で実行するようになった。これまで見た目をインライン CSS で再現していた例はすべて実コードに置き換え、掲載コードをそのままコピーして実プロジェクトで使える状態にした。",
    category: "release",
    link: "/react/mui/intro",
  },
  {
    id: "2026-07-03-mui-pages-real-code",
    date: "2026-07-03",
    title: "MUI マニュアルのコード例を実 MUI コンポーネントに刷新",
    description:
      "MUI 入門・コンポーネント活用・テーマカスタマイズの全ライブプレビューを、実際の Button / Typography / Alert / Tabs / Card / createTheme を使うコードに書き換えた。リップルエフェクトやテーマ切替など MUI 本来の挙動をプレビューで確認できる。",
    category: "update",
    link: "/react/mui/intro",
  },
  {
    id: "2026-07-03-tailwind-pages-real-classes",
    date: "2026-07-03",
    title: "Tailwind CSS マニュアルのコード例を実ユーティリティクラスに刷新",
    description:
      "Tailwind 入門・レスポンシブとダークモード・shadcn/ui の全ライブプレビューを、実際にコンパイルされる Tailwind クラスベースのコードに書き換えた。dark: バリアントやレスポンシブの切り替わりを実挙動で確認できる。",
    category: "update",
    link: "/react/tailwind/intro",
  },
  {
    id: "2026-07-03-css-in-js-pages-real-code",
    date: "2026-07-03",
    title: "styled-components / Emotion / CSS Modules ページの正確性を改善",
    description:
      "styled-components と Emotion のライブプレビューを実ライブラリで動作させ、css prop や transient props の実挙動を確認できるようにした。ビルド時変換が必要な CSS Modules は、プレビューの制約を明示する正確な説明に改めた。",
    category: "fix",
    link: "/react/css-basics/styled-components",
  },
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
      "Intro / Setup / AgentTeams / BrowserAPI / Worktrees。ターミナル環境の使い分け、Claude Code との連携、git worktree との組み合わせを扱う。",
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
