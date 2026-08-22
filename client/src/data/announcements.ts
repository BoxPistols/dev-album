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
    id: "2026-08-23-threejs-clock-deprecated",
    date: "2026-08-23",
    title: "Three.js のアニメーション: Clock が r183 で非推奨になった点を書き足した",
    description:
      "時間ベースのアニメーションで使う THREE.Clock を、公式ドキュメントが r183 で非推奨とし THREE.Timer を案内している。Timer は update() で内部状態を進めるため、1 フレーム内で getDelta() を何度呼んでも同じ値を返す。この違いを本文に追記した。",
    category: "fix",
    link: "/threejs/basics/animation",
  },
  {
    id: "2026-08-23-threejs-material-recommendation",
    date: "2026-08-23",
    title: "Three.js のマテリアル: 出典の無い「推奨」表記を公式の記述に置き換えた",
    description:
      "表とまとめに残っていた MeshStandardMaterial の「推奨」「最もリアル」を落とし、公式ドキュメントの記述（MeshLambertMaterial や MeshPhongMaterial より正確でリアルな見た目になる一方、計算コストは高くなる）に揃えた。MeshPhysicalMaterial は MeshStandardMaterial の拡張なので、「最もリアル」は成り立たない。",
    category: "fix",
    link: "/threejs/basics/material",
  },
  {
    id: "2026-08-23-palette-contrast",
    date: "2026-08-23",
    title: "Tailwind のパレット色どうしの配色を検査対象に加え、AA 未達を直した",
    description:
      "text-orange-600 と bg-orange-100 のような素のパレット色の組は、テーマトークンではないためこれまでどの検査にも掛かっていなかった。実測してみると 3.12:1 のように AA を割っているものが複数あり、AI・ML の頭文字バッジ、Git 入口のカードのアイコン、React の手順番号などを読める濃さに直した。以後は単体テストが同じ型の配色を落とす。",
    category: "fix",
    link: "/ai-ml/python-ml/data-libraries",
  },
  {
    id: "2026-08-23-storybook-a11y-contrast-fix",
    date: "2026-08-23",
    title: "サイドバーと LiveEditor の配色を AA まで上げ、story ごとに自動検査するようにした",
    description:
      "未解除の実績バッジは全体を薄くする表現をやめ、錠アイコンで区別するようにした（2.03:1 → 5.28:1）。連続日数の表示色はライトテーマで一段濃くしている（3.58:1 → 5.22:1）。教材で使うライブエディタも、非アクティブなファイルタブが読める濃さになった（3.01:1 → 5.20:1）。あわせて story ごとの a11y 検査をテストとして走らせ、コントラスト違反が入ると CI で落ちるようにした。",
    category: "fix",
    link: "/react/storybook/advanced",
  },
  {
    id: "2026-08-23-low-risk-claims-verified",
    date: "2026-08-23",
    title: "low リスクの主張 121 件の照合を再実行し、取り残しを直した",
    description:
      "Claude Code のインストール確認手順から、古くなったバージョン番号の例を外した。表示される版は更新のたびに変わるので、例を書かずに「バージョン番号が表示されれば完了」とだけ案内する。あわせて、照合結果の出典のうち、取得のたびに値が変わるもの（配布物の最新版と npm の直近ダウンロード数）を、期間や版を固定した URL に差し替え、後からでも同じ引用を確認できるようにした。",
    category: "fix",
    link: "/git/ai-agent/claude-code-setup",
  },
  {
    id: "2026-08-23-dracula-preview-theme",
    date: "2026-08-23",
    title: "Dracula テーマでプレビューがライトのまま描かれる問題を修正",
    description:
      "テーマを Dracula にしても、教材内のプレビュー（コードの実行結果）だけがライト配色で描かれていた。プレビューの明暗判定が Dark しか見ていなかったのが原因で、Dracula もダークとして扱うようにした。あわせて、ダーク配色で文字が背景に沈んでいたサンプル（トレーニングの表・カード・カルーセル、MUI のグリッドとテーマ切替）を直し、3 テーマでプレビュー内の文字と背景のコントラストを機械的に検査するテストを追加した。",
    category: "fix",
    link: "/react/css-layout/flexbox",
  },
  {
    id: "2026-08-23-multi-ai-coexistence-sources",
    date: "2026-08-23",
    title: "マルチ AI ツールの共存戦略: 出典未確認だった 4 点を一次情報で確認・修正",
    description:
      "Gemini CLI（.gemini/settings.json）と Gemini Code Assist on GitHub（.gemini/config.yaml）を別製品として書き分けた。Cursor のスキル置き場 .cursor/skills/ と、互換で .claude/skills/ も読む挙動を公式ドキュメントで確認した。/deep-research は Claude Code にバンドルされたワークフローであることを確認した。公開仕様の無い .agents/rules/ は本文から外し、共通ルールの正本は AGENTS.md と .claude/rules/ に改めた。根拠はページ末尾の出典欄から辿れる。",
    category: "fix",
    link: "/claude-code/multi-ai/multi-ai-coexistence",
  },
  {
    id: "2026-08-23-workflow-permissions-wording",
    date: "2026-08-23",
    title: "workflow の書き込み権限の記述を実装と照合するようにした",
    description:
      "「トークン・シークレット・権限の実務」の実例で、書き込み権限を持つ workflow が labeler と stale の 2 つであることと、stale が Issue と PR の両方に書き込む理由を書いた。チャット利用枠ページの層（匿名 / BYOK）と合わせて、この記述が実装の現在値とずれたらテストで落ちるようにした。",
    category: "fix",
    link: "/git/github-actions/secrets-permissions",
  },
  {
    id: "2026-08-23-claude-code-url-and-progress-migration",
    date: "2026-08-23",
    title: "Claude Code マニュアルの URL 変更と学習記録の引き継ぎ",
    description:
      "マニュアルの URL を /claude-mux から /claude-code に改めた。旧 URL は自動で転送する。完了ページ・ブックマーク・ページメモはブラウザ（localStorage）に保存しているため、次に開いたときに新しい URL へ自動で写し替える。以前に削除した tmux 系ページの記録だけは写す先が無いので、この機会に整理する。表示がおかしいときは、ブラウザの開発者ツールでこのサイトの localStorage を消すと初期状態に戻る。",
    category: "fix",
    link: "/claude-code",
  },
  {
    id: "2026-08-23-learning-how-to-learn",
    date: "2026-08-23",
    title: "新マニュアル: 学び方 — 初めての領域との向き合い方",
    description:
      "個別の技術ではなく、初めての領域に入るときの手順そのものを扱う 10 ページを追加した。全体像 → 用語 → 最小の実行 → 切り分けという順序、一次情報と二次・三次の見分け方、公式から変化を追う場所、Google が公式に文書化している検索演算子だけを使う理由（inurl: や AROUND() は文書化されていない）、AI への聞き方（前提の渡し方・ELI5 による粒度指定・出典の要求・反証させる）、AI が間違える 6 つの型と機械的な確かめ方、詰まったときの切り分けと記録の残し方。他のマニュアルへ入る前段なので、一覧の先頭に置いている。",
    category: "feature",
    link: "/learning",
  },
  {
    id: "2026-08-23-claude-file-map",
    date: "2026-08-23",
    title: "新ページ: AI 向けファイルの早見表と、Claude Code マニュアルの章立て見直し",
    description:
      "CLAUDE.md / .claude/rules/ / AGENTS.md / ARCHITECTURE.md / DESIGN.md / settings.json / Skills を 1 つの表に並べ、誰が読むか・いつコンテキストに載るか・どこまで効くかで見比べられるようにした。取り違えやすい 3 点（AGENTS.md は Claude Code が読まない、@import で分けてもコンテキストは減らない、CLAUDE.md は強制ではない）と、実際に読まれたかを /context で確かめる手順も入れている。あわせて章立てを組み替え、CLAUDE.md・Skills・コマンド・Hooks・Subagents・プラグインを「Claude Code の構成要素」1 章にまとめ（Hooks の詳細だけ発展編に離れていた）、ファイル系のページを「AI 向けファイルの使い分け」1 章に集約した。ページの URL は変えていない。",
    category: "feature",
    link: "/claude-code/multi-ai/file-map",
  },
  {
    id: "2026-08-22-browser-verification",
    date: "2026-08-22",
    title: "新ページ: ブラウザと画面での検証",
    description:
      "テストが通ることと UI が意図どおり描画されることは別、という前ページの続きとして、Claude 自身に見た目を確かめさせる手段を追加した。Claude in Chrome（--chrome、コンソールと DOM を直接読む、前提となるプランと認証方式の制約）と computer use（ビルトイン MCP サーバー、macOS の research preview）を扱い、MCP → Bash → Chrome → computer use という公式の道具選択順、スクリーンショットをディスクに残して証拠にする方法、外部コンテンツを読むことによる信頼境界の注意まで含めている。",
    category: "feature",
    link: "/claude-code/best-practices/browser-verification",
  },
  {
    id: "2026-08-22-agent-teams-cross-session",
    date: "2026-08-22",
    title: "Agent Teams ページにセッション間メッセージングを追記",
    description:
      "自分で立ち上げた独立セッション同士がメッセージをやり取りできる機能（ListAgents / SendMessage）を追記した。送れるのはテキストのみで会話履歴やファイルは渡らないこと、発見の受け渡し・並列 worktree の調整・長時間処理の報告・マシンをまたぐ連絡という使いどころ、そしてセッション再開 / Agent Teams / agent view / Remote Control / channels との使い分けを整理している。",
    category: "update",
    link: "/claude-code/ide-agent-teams/agent-orchestration",
  },
  {
    id: "2026-08-22-project-rules",
    date: "2026-08-22",
    title: "新ページ: CLAUDE.md と .claude/rules/",
    description:
      "プロジェクト指示を「いつ読み込まれるか」で整理するページを追加した。常時ロードの CLAUDE.md、トピック別に分割する .claude/rules/、paths フロントマターによる条件付きロード（マッチするファイルを読んだときだけ載る）、シンボリックリンクでの複数プロジェクト共有、~/.claude/rules/ のユーザーレベルルールを扱う。glob のブレース展開の予算と [ のエスケープという実際に踏む落とし穴、そしてルールは強制ではなく Hooks / Permissions で担保するという線引きも明記した。",
    category: "feature",
    link: "/claude-code/claude-core/project-rules",
  },
  {
    id: "2026-08-22-explore-plan-code-commit",
    date: "2026-08-22",
    title: "新ページ: 探索 → 計画 → コード → コミット",
    description:
      "公式が推奨する日常ワークフローの基本形を、Claude Code コア機能の最初のページとして追加した。プランモードへの入り方（Shift+Tab / --permission-mode plan / /plan プレフィックス）、計画承認時の 3 つの選択肢、Ctrl+G での計画直接編集、検証手段をセットで渡す実装指示、計画フェーズを飛ばしてよい判断基準までを一通り体験できる。",
    category: "feature",
    link: "/claude-code/claude-core/explore-plan-code-commit",
  },
  {
    id: "2026-08-22-permission-modes",
    date: "2026-08-22",
    title: "新ページ: パーミッションモード",
    description:
      "default / acceptEdits / plan / auto / dontAsk / bypassPermissions の 6 モードを「何が確認なしで実行されるか」の軸で整理した。Shift+Tab の循環順、auto モードの分類器の仕組みと利用条件、settings.json の permissions ルール（allow / ask / deny）との重なり方を扱う。",
    category: "feature",
    link: "/claude-code/claude-core/permission-modes",
  },
  {
    id: "2026-08-22-skills-deep-dive",
    date: "2026-08-22",
    title: "新ページ: Skills 深掘り",
    description:
      "スキルの置き場所と同名解決の優先順位、呼び出し 2 経路の制御（disable-model-invocation / user-invocable）、$ARGUMENTS による引数、複数ファイル構成、context: fork でのサブエージェント実行、他の拡張機能との使い分け、トラブルシューティングまでを 1 ページにまとめた。",
    category: "feature",
    link: "/claude-code/agent-extensions/skills-deep-dive",
  },
  {
    id: "2026-08-22-verification-and-trust",
    date: "2026-08-22",
    title: "新ページ: 検証スキル — 無監督実行を信頼する",
    description:
      "Claude に自分で回せるチェック（テスト・ビルド・スクリーンショット比較）を渡し、完了報告は証拠で受け取るための技術を追加した。チェックの効かせ方の 4 段階（プロンプト内 / /goal / Stop hook / 敵対的レビュー）、レビュアーの指摘を全部追いかけない判断、/rewind と /clear での仕切り直しを扱う。",
    category: "feature",
    link: "/claude-code/best-practices/verification-and-trust",
  },
  {
    id: "2026-08-22-claude-code-fact-check",
    date: "2026-08-22",
    title: "Claude Code マニュアルを公式ドキュメントと実機 CLI で照合し、古い記述を直した",
    description:
      "code.claude.com/docs の現行リファレンスと実機 v2.1.239 で 12 ページを照合した。モデル完全名の例を claude-sonnet-5 に更新し、非推奨になった @modelcontextprotocol/server-github の例を現行の GitHub リモート MCP（HTTP）とファイルシステムサーバに差し替えた。SSE トランスポートが公式に非推奨である点、/agents の対話ウィザードが v2.1.198 で廃止された点、プラグイン管理コマンドが /plugin である点、Agent Teams の iterm2 モードに it2 CLI が必要な点も反映している。effort・Hooks・MCP Tool Search・Serena の各記述は現行仕様と一致することを確認した。",
    category: "fix",
    link: "/claude-code/claude-intro/claude-code-intro",
  },
  {
    id: "2026-08-20-slack-notification-pause-restore",
    date: "2026-08-20",
    title: "Slack 通知連携に、一括作業のあいだだけ止めて戻す手順を足した",
    description:
      "古い Issue の一括クローズや依存更新 PR の連続マージで通知が溢れる場面向けに、unsubscribe で止めて subscribe で戻す手順を STEP 4 として追加した。止めるときはイベント種別とラベルフィルタの 2 行が要る（種別を外しても +label: は残る）ことを実機で確認したので、その落とし穴と、subscribe list features の出力での見分け方を書いている。購読はチャンネル単位なので停止すると全員に届かなくなる点、自分だけ静かにしたいなら Slack のミュートを使う点も先に置いた。あわせて目的から引く早見表と運用前チェックリストを足し、コマンド表に signout と subscribe list features、各コマンドの効く範囲（チャンネル / 自分のアカウント）を追記している。",
    category: "update",
    link: "/git/flow-automation/notifications",
  },
  {
    id: "2026-08-16-storybook-version-alignment",
    date: "2026-08-16",
    title: "Storybook マニュアルの前提バージョンを揃え、動かない設定例を直した",
    description:
      "npx storybook@latest init で入る版と設定例がずれており、そのとおりに進めると失敗する箇所があった。Storybook 9 で削除された @storybook/addon-essentials を addons から外し、Docs は @storybook/addon-docs として別途入れる形に直した。storybook/test への import 変更、backgrounds と viewport の parameters が options と initialGlobals を使う新形式になった点、@storybook/addon-vitest への改名、MDX の blocks の移動も反映している。再発を防ぐため、マニュアルの入口に前提バージョンを明記した。",
    category: "fix",
    link: "/react/storybook/setup",
  },
  {
    id: "2026-08-16-audit-self-review",
    date: "2026-08-16",
    title: "照合作業そのものを見直し、自分が入れた誤りを直した",
    description:
      "誤りを直す過程で持ち込んでしまった記述を洗い出して訂正した。Kanban Guide に無い定義を同ガイドに帰属させていた点、Glacier の取り出し時間で通常経路の代表値が消えていた点、SUS のグラフだけ出典に無い区分になっていた点、裏づけの取れない記述を落とす作業の中で /rewind に未確認の説明を足していた点など。あわせて low リスク層の未確定な主張の処理漏れを埋め、本文だけ直して Quiz や図が古いまま残っていた箇所を揃えた。",
    category: "fix",
    link: "/devflow/agile/kanban",
  },
  {
    id: "2026-08-16-cmux-reverified",
    date: "2026-08-16",
    title: "cmux のページを実機 0.64.20 で照合し直した",
    description:
      "Claude Code の hook は cmux の Claude ラッパーが自動注入する方式に変わっており、cmux claude-hook コマンドは無くなっていた。~/.claude/settings.json を手で編集する手順を載せていたので削除し、他のエージェント向けの cmux hooks setup / <agent> install に置き換えた。分割やワークスペース選択のショートカット、ビルトインブラウザの操作、ライセンス表記（GPL-3.0-or-later）も実機の出力とショートカット定義に合わせて直している。アプリ未起動で確認できない UI の挙動は断定を外した。",
    category: "fix",
    link: "/claude-code/cmux/cmux-setup",
  },
  {
    id: "2026-08-16-responsive-breakpoints-source",
    date: "2026-08-16",
    title: "ワイヤーフレームのブレークポイントに、どの体系の値かを明記した",
    description:
      "区切りの値は CSS の仕様が定めているものではなく、フレームワークごとに異なる。掲載していた 768px / 1024px は Tailwind CSS の md（48rem）と lg（64rem）に一致するため、公式ドキュメントを出典として明示し、Bootstrap は別の値を採ることも添えた。",
    category: "update",
    link: "/ux-design/ia-wireframe/wireframe",
  },
  {
    id: "2026-08-16-drop-unsourced-claims",
    date: "2026-08-16",
    title: "裏づけの取れなかった主張を本文から落とした",
    description:
      "一次情報に当たっても確認できなかった記述を、断定を弱めるのではなく落とす方針で整理した。推測で埋めた一文は読者から見て確認済みの記述と区別が付かないためで、「一般に」「多くの場合」で薄めて残す書き方は採っていない。落としたのは「最も広く使われている」といった普及度や最上級の主張、原典に到達できなかった年号や分類、現行ドキュメントに記載のない UI 操作など。代わりに、出典で確認できる範囲だけを残している。",
    category: "update",
    link: "/ux-design/research/user-research",
  },
  {
    id: "2026-08-16-low-risk-audit",
    date: "2026-08-16",
    title: "残っていた low リスクの主張も照合し、コードの期待出力の誤りを直した",
    description:
      "high・medium に続いて low リスク 121 件を一次情報と照合した。コードを実行して確認した結果、決定木の精度は 0.97 ではなく 0.93、np.std の出力は 5.85 ではなく 5.885575587824865 と、掲載していた期待出力が再現しないものが見つかった。nano は Ctrl+X → Y のあとファイル名確認の Enter を押すまで保存されない点、macOS の Cursor はバージョン情報が Help メニューに出ない点も実機で確かめて直している。",
    category: "fix",
    link: "/ai-ml/ml-fundamentals/supervised",
  },
  {
    id: "2026-08-16-git-snapshot-model",
    date: "2026-08-16",
    title: "Git マニュアルの「差分を保存する」という説明を訂正した",
    description:
      "コミットはスナップショットであり、ブランチはコミットを指す軽量なポインタである、という Pro Git の記述に合わせて 3 ページを直した。引数なしの git diff が指すのは作業ツリーとインデックスの差分で、直前のコミットとの差分ではない点も併せて明記している。user.name / user.email を設定しなくても commit 自体は成功し、ホスト名から推測した値が記録されることも実機で確認して反映した。",
    category: "fix",
    link: "/git/workflow/branch",
  },
  {
    id: "2026-08-16-react-measured-values",
    date: "2026-08-16",
    title: "React マニュアルの数値・挙動の記述を実測値に合わせた",
    description:
      "React.memo の比較は === ではなく Object.is、Server Component と Client Component の間で関数を渡せる向きが逆、といった挙動の誤りを直した。lodash と moment のサイズは minified 値を gzip として書いていたので両方を併記し、placeholder のコントラストはエンジンごとに異なる実測値（WebKit 2.35:1、Chromium / Firefox 4.61:1）に置き換えている。Tailwind v4 の sr-only、section が region になる条件、flex の折り返し条件も現行仕様に合わせた。",
    category: "fix",
    link: "/react/hooks-deep/memo-callback",
  },
  {
    id: "2026-08-16-claude-code-verified-behavior",
    date: "2026-08-16",
    title: "Claude Code マニュアルのコマンド仕様を実機で確認して更新した",
    description:
      "実機 2.1.233 で確認し、/doctor の f キー（v2.1.205 より前の挙動）、/fork を /branch のエイリアスとする記述、サブエージェント起動を Task ツールとする記述を現行仕様に直した。MCP のツールが deferred として登録される条件について、MCPSetup と MCPPractical が別のことを書いていた食い違いも解消している。",
    category: "fix",
    link: "/claude-code/reference/claude-cheatsheet",
  },
  {
    id: "2026-08-16-infra-devflow-versioned-values",
    date: "2026-08-16",
    title: "インフラ / 開発フローの版で変わる値に、どの版かを明記した",
    description:
      "DORA の Four Keys は 2024 年に deployment rework rate が加わって 5 指標になっているため、指標数とベンチマークの数値を 2024 年版で取り直した。Design Tokens は W3C 形式ではなく DTCG 形式、WinterCG は WinterTC への改称、ADR の原典は Title を含む 5 項目、という帰属と名称の誤りも直している。Lambda の課金対象、S3 バケット名の一意性の範囲、Glacier の 3 クラスも公式の記述に合わせた。",
    category: "fix",
    link: "/devflow/devops/dora",
  },
  {
    id: "2026-08-16-api-license-and-standards",
    date: "2026-08-16",
    title: "API / AI・ML マニュアルの標準化状況とライセンス表記を実態に合わせた",
    description:
      "Idempotency-Key の IETF ドラフトは 2026-04-18 に期限切れでアーカイブ済みのため「標準化を進めている」という現在形の記述を改めた。Llama は Meta 独自のコミュニティライセンスで公開されたオープンウェイトであってオープンソースではない、TensorFlow 2 は Eager 実行が既定、PATCH は RFC 5789 が安全でも冪等でもないと明記している、といった点を直している。",
    category: "fix",
    link: "/api/rest-design/idempotency",
  },
  {
    id: "2026-08-16-medium-claim-audit",
    date: "2026-08-16",
    title: "medium リスクの主張 933 件を一次情報と照合し、142 件を修正した",
    description:
      "高リスク 466 件に続いて、残る medium 933 件を一次情報と照合した。CONFIRMED 695 / REFUTED 149 / UNDETERMINED 89 で、反証率は高リスクの半分だが件数はほぼ同じだった。判定に書いた引用が原文に実在するかを機械照合する検査も追加し、pnpm check:verdicts で回せるようにしている。判定の全記録は docs/audits/2026-08-16-medium-verdicts.json にある。",
    category: "fix",
    link: "/git/workflow/branch",
  },
  {
    id: "2026-08-16-claim-audit",
    date: "2026-08-16",
    title: "全 342 ページの事実主張を一次情報と照合し、152 件を修正した",
    description:
      "外部の一次情報で真偽が確定する主張を全ページから抽出し、高リスクに分類した 466 件をベンダー公式ドキュメント・仕様書・公式リポジトリと照合した。3 分の 1 にあたる 152 件が食い違っており、削除済み API を使ったコード例、デフォルト値が逆の説明、古くなった設定キー名などを修正した。一次情報に当たっても確定しなかった 34 件は本文から削除している。判定の全記録は docs/audits/2026-08-16-claim-audit.md にある。",
    category: "fix",
    link: "/claude-code/multi-ai/agent-docs",
  },
  {
    id: "2026-08-16-design-md-spec",
    date: "2026-08-16",
    title: "Google Labs の DESIGN.md を扱うページを追加",
    description:
      "Stitch から切り出されたビジュアルアイデンティティ記述フォーマットを、公式仕様と @google/design.md@0.4.0 の実挙動で解説した。8 セクションの順序制約、コンポーネントに書ける 8 プロパティ、11 個の lint ルールに加え、クォートしない数値が lint 無警告・exit 0 のまま export から消える挙動を再現手順つきで載せている。",
    category: "feature",
    link: "/claude-code/multi-ai/design-md",
  },
  {
    id: "2026-08-16-agent-docs-rename",
    date: "2026-08-16",
    title: "3 層ドキュメントの第 3 層を ARCHITECTURE.md に改め、公式記述で裏を取り直した",
    description:
      "DESIGN.md は Google Labs の公開フォーマット名として実在し内容も別物のため、アーキテクチャ決定記録の層を ARCHITECTURE.md に改名した。あわせて「Claude Code は AGENTS.md を自動では読まない」「@import ではコンテキストは減らない」「compact 後の再読込指示は不要」の 3 点を公式ドキュメントの記述に沿って訂正している。",
    category: "fix",
    link: "/claude-code/multi-ai/agent-docs",
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
    link: "/claude-code/ai-coding-agents/choosing-tools",
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
    link: "/claude-code/claude-intro/claude-code-intro",
  },
  {
    id: "2026-07-03-tmux-section-retired",
    date: "2026-07-03",
    title: "tmux セクションを終了し、AI エージェント中心の構成に再編",
    description:
      "Claude Code & 開発環境マニュアルから tmux 関連 17 ページを削除し、AI コーディングエージェントの比較・使い分けに紙面を再配分した。旧 URL は自動的にマニュアルトップへリダイレクトされる。",
    category: "release",
    link: "/claude-code",
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
    link: "/claude-code/cmux/cmux-setup",
  },
  {
    id: "2026-04-26-cmux-pages-added",
    date: "2026-04-26",
    title: "cmux 教材を 5 ページ追加",
    description:
      "Intro / Setup / AgentTeams / BrowserAPI / Worktrees。ターミナル環境の使い分け、Claude Code との連携、git worktree との組み合わせを扱う。",
    category: "feature",
    link: "/claude-code/cmux/cmux-intro",
  },
  {
    id: "2026-04-26-harness-engineering",
    date: "2026-04-26",
    title: "ハーネスエンジニアリングのページを追加",
    description:
      "Claude Code を支える「ハーネス」の概念と設計指針。コンテキストエンジニアリング・DESIGN.md と合わせて 3 ページ追加。",
    category: "feature",
    link: "/claude-code/best-practices/harness-engineering",
  },
  {
    id: "2026-04-26-context-engineering",
    date: "2026-04-26",
    title: "コンテキストエンジニアリングのページを追加",
    description:
      "AGENTS.md / CLAUDE.md / プロンプト設計の使い分け、コンテキスト圧縮の判断軸を整理。",
    category: "feature",
    link: "/claude-code/claude-core/context-engineering",
  },
  {
    id: "2026-04-26-design-md",
    date: "2026-04-26",
    title: "CLAUDE.md / AGENTS.md / DESIGN.md の整理",
    description:
      "3 つのマークダウン設計ファイルの責務分担と Multi-AI 環境での使い分けを解説。",
    category: "feature",
    link: "/claude-code/multi-ai/design-md",
  },
];
