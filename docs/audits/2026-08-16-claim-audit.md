# 教材の事実主張 監査（2026-08-16）

`pnpm test` や `pnpm build` では検出できない種類の誤りを、一次情報との照合で洗い出した記録。

## やったこと

1. 全 342 ページから「外部の一次情報に当たれば真偽が確定する主張」を抽出（1520 件）
2. うち高リスクに分類した 466 件を、ベンダー公式ドキュメント・仕様書・公式リポジトリと照合
3. 判定は CONFIRMED / REFUTED / UNDETERMINED の 3 値。CONFIRMED には逐語引用を必須にした

`UNDETERMINED`（一次情報に当たっても確定しない）を選択肢に置き、棄権を推奨した。
二択にすると判定できない項目にも必ずどちらかを答えることになり、それは根拠のない推測になる。
実際、分母が定義されていない統計値などがここに落ちた。

## 結果

| 判定 | 件数 | 扱い |
|---|---|---|
| CONFIRMED | 280 | そのまま。逐語引用を `sources.ts` に登録 |
| REFUTED | 152 | 一次情報に合わせて記述を修正 |
| UNDETERMINED | 34 | 本文から削除（断定を弱めて残さない） |
| **計** | **466** | |

高リスク主張の 33% が一次情報と食い違っていた。

誤りの型は大きく 4 つ。

- **コードがそのまま動かない**: 削除済み API を使った例（`request.ip` / `request.geo` / `experimental.dynamicIO`）
- **逆のことを教えている**: 「React Compiler はデフォルト有効」「Middleware は Edge Runtime 固定」など
- **古くなった値・名称**: `ubuntu-latest` の実体、GitHub Actions の課金単位、設定キー名
- **存在しないもの**: GitHub Pages の Vite テンプレート、Codex の `codex.md`

## 要修正（REFUTED）

### `claude-mux/ide-agent-teams/PluginsEcosystem.tsx`

- **記述**: プラグインは、スラッシュコマンド・サブエージェント・MCP サーバー・Hooks をバンドルした軽量パッケージ。Agent Skills オープンスタンダードに準拠しており、CLI と VS Code 拡張の両方で管理できる。一方でインストールしたプラグインはもう一方でも自動的に利用可能になる。
  - **一次情報**: 「Agent Skills オープンスタンダードに準拠」の帰属先が誤り。オープンスタンダードに準拠しているのは **skill**（`SKILL.md` を含むフォルダという形式）であって、プラグインのパッケージ形式ではない。プラグインは `.claude-plugin/plugin.json` マニフェストを持つ Claude Code 固有の形式で、その中の `skills/` が Agent Skills 標準に従う。agentskills.io の規格自体もスラッシュコマンド・サブエージェント・MCP サーバー・Hooks のバンドルを定義していない。他 2 点は正しい: プラグインの構成要素は公式に「Plugins extend Claude Code with skills, agents, hooks, and MCP servers.」（デスクトップ版ドキュメントでは LSP 設定も含む）で、CLI と VS C
  - 出典: https://code.claude.com/docs/en/skills
- **記述**: VS Code 拡張でインストールしたプラグインは CLI でも利用でき、逆も同様。プラグインの設定はグローバルに管理されるため、どちらの環境で操作しても同じ状態になる。
  - **一次情報**: 前半（VS Code 拡張と CLI の相互利用）は正しいが、後半の「グローバルに管理される」が誤り。インストール時にスコープを選ぶ設計で、同じ vs-code ドキュメントの直前に「* **Install for you**: available in all your projects (user scope) / * **Install for this project**: shared with project collaborators (project scope) / * **Install locally**: only for you, only in this repository (local scope)」と 3 つの選択肢が明記されている。有効状態は選んだスコープに対応する settings ファイルの `enabledPlugins` に記録される（settings ドキュメントの scope 表:
  - 出典: https://code.claude.com/docs/en/vs-code
- **記述**: // ~/.claude/plugins/installed_plugins.json { "version": 2, "plugins": { "plugin-name": { "source": "npm:plugin-name", "version": "1.0.0" } } }
  - **一次情報**: パス（~/.claude/plugins/installed_plugins.json）とトップレベルの `version: 2` / `plugins` キーは正しいが、中身が違う。v2 の `plugins` は「プラグイン ID → **インストールエントリの配列**」で、値は配列でありオブジェクト単体ではない。キーは `plugin@marketplace` 形式が必須（スキーマのエラーメッセージが "Plugin ID must be in format: plugin@marketplace"）。エントリのフィールドは scope（"managed"|"user"|"project"|"local"、必須）/ projectPath? / installPath（必須）/ version? / installedAt? / lastUpdated? / gitCommitSha? / resolvedVersion?
- **記述**: プラグインのルートに PLUGIN.md を配置し、メタデータを記述する。各機能は対応するサブディレクトリに配置する。
  - **一次情報**: メタデータファイルは `PLUGIN.md` ではなく `.claude-plugin/plugin.json`（プラグインルート直下の `.claude-plugin/` ディレクトリ内に置く JSON）。同ドキュメントの File locations reference 表でも「| **Manifest** | `.claude-plugin/plugin.json` | Plugin metadata and configuration (optional) |」となっている。後半の「各機能は対応するサブディレクトリに配置する」は正しいが、教材の図にある `subagents/` も誤りで、正しくは `agents/`（表の「| **Agents** | `agents/` | Subagent Markdown files |」）。
  - 出典: https://code.claude.com/docs/en/plugins-reference
- **記述**: # 使用例 /project:explain src/lib/navigation.ts
  - **一次情報**: 現行の呼び出しは `/explain src/lib/navigation.ts`。`.claude/commands/explain.md` はファイル名がそのままコマンド名になる（同ドキュメントの表に「| File under `.claude/commands/` | File name without extension | `.claude/commands/deploy.md` → `/deploy` |」）。`/project:` プレフィックスは現行仕様には存在しない。名前空間が付くのはプラグインが提供するスキルだけで、その形式は `/plugin-name:skill-name`。
  - 出典: https://code.claude.com/docs/en/slash-commands
- **記述**: // .claude/settings.json（プロジェクトスコープ） { "mcpServers": {
  - **一次情報**: プロジェクトスコープの MCP サーバー設定を書く先は `.claude/settings.json` ではなく、プロジェクトルートの `.mcp.json`。トップレベルキーが `mcpServers` である点と、その中の command / args / env の形は正しいので、コメント行のパスを `// .mcp.json（プロジェクトスコープ、プロジェクトルート）` に直せばよい。ユーザー / ローカルスコープは `~/.claude.json`。なお同マニュアルの MCPSetup.tsx が `.mcp.json` と説明しているほうが正しい。
  - 出典: https://code.claude.com/docs/en/mcp
- **記述**: // hooks/settings.json { "hooks": { "PreToolUse": [ { "matcher": "Bash", "command": "echo 'Tool execution starting...'" } ],
  - **一次情報**: ファイル名とスキーマの両方が誤り。(1) ファイルは `hooks/settings.json` ではなく `hooks/hooks.json`（プラグインルート直下、または plugin.json にインライン）。(2) matcher オブジェクトの直下に `command` を書くフラットな形は無効で、matcher オブジェクトの中にさらに `hooks` 配列を置き、その各要素に `type`（"command" など）と `command` を書く。正しい形は {"hooks":{"PreToolUse":[{"matcher":"Bash","hooks":[{"type":"command","command":"echo 'Tool execution starting...'"}]}]}}。なお `settings.json` はプラグインルート直下に置ける別物として存在するが、対応キーは `agent` と
  - 出典: https://code.claude.com/docs/en/plugins-reference

### `claude-mux/claude-intro/SlashCommands.tsx`

- **記述**: /branch [name] 現在の会話の分岐ポイントを作成。分岐後も元セッションは /resume から戻れる。/fork は別コマンド（会話を引き継いだ background subagent を起動）。
  - **一次情報**: /branch に関する記述（分岐ポイントの作成、元セッションへ /resume で戻れる、/fork は別コマンド）は正しい。誤りは /fork の説明。現行版（v2.1.212 以降、agent view が有効な既定状態）の /fork は「background subagent」ではなく、会話を複製した **background session**（agent view で管理される独立セッション）を起動し、呼び出し元はその場で作業を続ける。「forked subagent を起動する」のは v2.1.161〜v2.1.211、または agent view を無効にしている場合のフォールバック挙動。なお「結果がこの会話に戻ってくる subagent に側タスクを渡す」のは /fork ではなく /subtask。
  - 出典: https://code.claude.com/docs/en/commands
- **記述**: /rewind 会話・コードを以前のポイントへ復元、または途中以降を要約。Esc×2 でも起動。restore code / conversation / both / summarize from here の 4 アクション。エイリアス: /checkpoint, /undo。
  - **一次情報**: 説明・Esc×2 起動・エイリアス（/checkpoint, /undo）は正しいが「4 アクション」が誤り。rewind メニューの選択肢は 6 つ: Restore code and conversation / Restore conversation / Restore code / Summarize from here / Summarize up to here / Never mind。claim は Summarize up to here と Never mind を落としている。さらに「2 つのコード復元オプションは、選択したチェックポイントに復元対象のファイル変更が記録されている場合のみ表示される」（原文: "The two code restore options appear only when the selected checkpoint has tracked file changes to r
  - 出典: https://code.claude.com/docs/en/checkpointing
- **記述**: /terminal-setup Shift+Enter 等のキーバインドをターミナルへインストール。VS Code / Cursor / Windsurf / Alacritty / Zed のみ表示。
  - **一次情報**: Shift+Enter 等のキーバインドを設定する点は正しいが、列挙が古い。(1) Windsurf は Devin Desktop にリネームされている（CHANGELOG: "Renamed Windsurf to Devin Desktop in the `/ide` menu, `/terminal-setup`, and `/scroll-speed`, following the editor's rebrand"）。(2) 公式の書き方は "Only visible in terminals that need it, like ..." で、列挙は例示であり閉じた集合ではない。実際 CHANGELOG には "Added `/terminal-setup` support for Kitty, Alacritty, Zed, and Warp terminals" / "/terminal-setup comma
  - 出典: https://code.claude.com/docs/en/commands
- **記述**: /add-dir <path> 現セッションのファイルアクセス対象ディレクトリを追加。.claude/skills/ は読み込まれるが他の .claude/ 設定は対象外。
  - **一次情報**: 前半（現セッションのファイルアクセス対象ディレクトリを追加）は正しい。後半が誤り。読み込まれる例外は skills だけではない。公式の表では `--add-dir` ディレクトリから次が読み込まれる: `.claude/skills/`（Yes, with live reload）、`.claude/commands/`（Yes。同名ならプロジェクト側が優先）、`.claude/agents/`（Yes）、`.claude/settings.json` / `settings.local.json`（`enabledPlugins` と `extraKnownMarketplaces` キーのみ）、CLAUDE.md・`.claude/rules/`・CLAUDE.local.md（`CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` を設定した場合のみ）。正しくは「大半の `.cl
  - 出典: https://code.claude.com/docs/en/permissions#additional-directories-grant-file-access-not-configuration
- **記述**: 対応モデル: Fable 5 / Opus 4.8 / 4.7 / 4.6 / Sonnet 4.6 など（既定は high、Fable 5・Opus 4.7 以降は xhigh が既定）
  - **一次情報**: 既定 effort の記述が誤り。xhigh が既定なのは Opus 4.7 だけで、Fable 5 も Opus 4.8 も Opus 5 も既定は high（原文: "The default effort is `high` on every model that supports effort, except Opus 4.7, which defaults to `xhigh`."）。「Fable 5・Opus 4.7 以降は xhigh が既定」は成り立たない。モデル列挙も現行表では Opus 5 と Sonnet 5 が抜けている。また Opus 4.6 / Sonnet 4.6 は xhigh 非対応（low/medium/high/max のみ）で、xhigh を指定すると high にフォールバックする。なお「初回に Fable 5 / Opus 4.8 / Opus 4.7 を使うと、そのモデルの既定 eff
  - 出典: https://code.claude.com/docs/en/model-config#adjust-effort-level
- **記述**: 1 ターンだけ深く考えさせたい場合は、level を上げずプロンプトに「ultrathink」を含める（API には effort 値を送らずプロンプトレベルで指示）。
  - **一次情報**: 主旨（session の effort レベルを上げずに、そのターンだけ深い推論を要求する。Claude Code がキーワードを認識して in-context の指示を追加する）は正しいが、括弧内が誤り。公式は「API に送られる effort レベルは変更されない（unchanged）」と書いており、effort 値を送らないわけではない。正しくは「effort 値は変わらないまま送られ、追加の指示がプロンプト側に入る」。あわせて、think / think hard / think more は通常のプロンプトテキストとして扱われキーワードとして認識されない点も書き添えると誤解が減る。
  - 出典: https://code.claude.com/docs/en/model-config#use-ultrathink-for-one-off-deep-reasoning

### `git/ai-agent/Overview.tsx`

- **記述**: 各ツールには無料枠があります。 1つのツールの無料枠を使い切ったら別のツールに切り替える 「ローテーション戦略」で、ほぼ無料〜最小限のコストで運用できます。
  - **一次情報**: 表に挙げた 6 ツールのうち、少なくとも Claude Code には無料枠がない。Anthropic の公式ドキュメントは Claude Code の利用に Pro / Max / Team / Enterprise / Console のいずれかのアカウントを要求し、無料の Claude.ai プランでは Claude Code を使えないと明記している（Console はプリペイドのクレジット購入が前提: https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage 「Credits must be purchased prior to using the API」）。また Warp の Free プラン（$0/month）に含まれるのは「Reload credits at pay-as-you-go rates」であ
  - 出典: https://code.claude.com/docs/en/setup
- **記述**: 完全無料パターン: Gemini CLI（無料枠大）+ Cursor 無料枠 + Antigravity（プレビュー無料）を組み合わせれば月0円。
  - **一次情報**: Antigravity はすでに Generally Available（一般提供）であり、無料なのは「プレビュー期間中だから」ではなく、恒常的な個人向け $0/month プランがあるため。同プランの内容は「Unlimited Tab completions」「Unlimited Command requests」「Basic weekly rate limits」で、上位に Google AI Pro / Google AI Ultra / Organization plan（via Google Cloud）の有料プランが並ぶ。加えて Antigravity はブラウザ完結のクラウド IDE ではなくダウンロード型のデスクトップ製品（antigravity.google に「Download for Apple Silicon」「Download for Intel」）で、Overview の表の「クラウド IDE / ブ
  - 出典: https://antigravity.google/pricing
- **記述**: ブラウザ（OS不問）
  - **一次情報**: Antigravity は OS ごとにインストーラを配布するデスクトップアプリなので、対応 OS 欄は「Mac / Win / Linux」が正しい。公式ダウンロードページは macOS（Apple Silicon / Intel、最低 macOS 12 Monterey、X86 非対応）、Windows（x64 / ARM64、最低 Windows 10 64bit）、Linux（x64 / ARM64、glibc >= 2.28, glibcxx >= 3.4.25）の 3 OS 分のビルドを列挙している。「ブラウザ（OS不問）」ではない。
  - 出典: https://antigravity.google/download
- **記述**: ブラウザ上で動く開発環境。インストール不要で始められるのが利点。 複数の AI エージェントを同時に動かせるものもあります。
  - **一次情報**: 「複数の AI エージェントを同時に動かせる」は正しいが、「ブラウザ上で動く」「インストール不要」は誤り。Antigravity は OS 別インストーラをダウンロードして入れるスタンドアロンのデスクトップアプリで、公式の導入手順も Download → Installation → Creating a Project の順に進む。エージェントはローカルのフォルダ上で動作する（Local Mode: "The agent operates directly in your active folders."）。したがって Antigravity を「クラウド IDE 型」の例として挙げる分類自体が成り立たない。並列実行の根拠なら公式の "Your command center to manage multiple local agents in parallel."（local が付く点に注意）を使う。
  - 出典: https://antigravity.google/docs/getting-started
- **記述**: 月50回のプレミアムリクエスト + 補完
  - **一次情報**: 現行の Cursor 無料プラン（Hobby）は「クレジットカード不要 / 制限付きのエージェントリクエスト（Limited Agent requests）/ Composer へのアクセス」であり、「月 50 回のプレミアムリクエスト」という回数表記も「補完」という独立項目も掲載されていない。Cursor は課金体系を利用量（利用プール）ベースへ移行しており、公式ドキュメントの有料プランは Start（インド限定）/ Pro / Pro Plus / Ultra で、いずれも回数ではなく「含まれる利用枠（$ 建て）」で説明されている。表の「無料枠」欄は「制限付きのエージェントリクエスト（回数非公開）」等に改めるのが正確。
  - 出典: https://cursor.com/en-US/pricing
- **記述**: 月75回のAIリクエスト
  - **一次情報**: 現行の Warp 無料プランに「月75回の AI リクエスト」という枠は存在しない。料金体系はリクエスト回数制からクレジット制（pay-as-you-go）に変わっており、Free プランには Warp Agent 用の AI 利用枠が同梱されない。AI を使うには有料プランへのアップグレード、アドオンクレジットの購入、または BYOK（自前 API キー / 独自推論エンドポイント）が必要。
  - 出典: https://docs.warp.dev/support-and-community/plans-and-billing/plans-pricing-refunds/

### `git/ai-agent/SubTools.tsx`

- **記述**: 上記を全て無料枠で回せば月0円。Claude Code に $5（約750円）だけ課金しても月750円。 どちらにしても月1,000円以下で、本格的な AI コーディング環境が手に入ります。
  - **一次情報**: ローテーション表の 1 番目に置かれた Claude Code に無料枠はないため、「上記を全て無料枠で回せば月0円」は成立しない。Claude Code は Pro / Max / Team / Enterprise / Console のいずれかのアカウントを要し、Console 経路も事前購入したクレジットを消費する従量課金である（https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage: 「Credits must be purchased prior to using the API, and your credits will be applied to your usage according to our current pricing」）。同じ表の Warp も Free プラン（$0/month）に月
  - 出典: https://code.claude.com/docs/en/setup
- **記述**: Google が提供するブラウザで動く AI 開発環境です。 インストール不要で、ブラウザさえあればどの PC からでもアクセスできます。 複数の AI エージェントを同時に動かせる「Manager View」が特徴です。
  - **一次情報**: 「ブラウザで動く」「インストール不要」「どの PC からでもアクセスできる」はいずれも誤り。Antigravity は macOS / Windows / Linux 向けにインストーラを配布するデスクトップアプリで、Antigravity 2.0 / Antigravity CLI / Antigravity IDE / Antigravity SDK の 4 サーフェスとも各 PC へのインストールが必要。並列エージェント管理の UI 名も「Manager View」ではなく、公式表記は Agent Manager（Antigravity 2.0 の前身）で、現行はスタンドアロンの Antigravity 2.0 がその役割を持つ（トップページの IDE 説明でも "agent manager"）。「Manager View」という語は公式サイト・ドキュメントの取得ページ全件で 0 件だった。
  - 出典: https://antigravity.google/docs/overview
- **記述**: 現在パブリックプレビュー中のため、個人利用は無料です。 Gemini 3 モデルが使えるほか、Claude や GPT も選択可能です。
  - **一次情報**: 「パブリックプレビュー中」が誤り。料金ページは個人向けプランに "Generally Available" のラベルを付け、見出しで "Google Antigravity is now available!" と announce している（プレビューではなく一般提供）。個人利用が無料である点自体は正しく、"For Individuals" は "$0/month"（"Experience Antigravity without a subscription plan"）。モデルは Gemini 3.7 Flash / 3.6 Flash / 3.5 Flash / 3.1 Pro に加え Claude Sonnet 4.6 (thinking) / Claude Opus 4.6 (thinking) / GPT-OSS-120b が無料枠でも選択可能。ただし選べる OpenAI 系は open-weight の GPT-O
  - 出典: https://antigravity.google/pricing
- **記述**: Antigravity はブラウザで完結するため、PC に何もインストールする必要がありません。 出先や別の PC からでもすぐに作業を再開できるのが強みです。
  - **一次情報**: ブラウザ完結ではなくインストールが必須。公式の Getting Started は「antigravity.google/download で OS を選んでダウンロード」→「Installation」→「Creating a Project でローカルフォルダ / Git リポジトリを追加」という手順で、エージェントはそのローカルフォルダ上で動く。実行中はマシンのスリープを抑止する仕様であることからも、処理はローカル PC 上で走る。別の PC で作業を再開するにはその PC にも Antigravity をインストールする必要がある。教材の手順（サイトにアクセス → Google ログイン → プロジェクトを開く）は、ダウンロードとインストールの工程が抜けている。
  - 出典: https://antigravity.google/docs/faq
- **記述**: 無料プランでは月75回のAIリクエストが使えます（初月は150回）。 ターミナルの基本機能（コマンド実行、タブ管理など）は全て無料で制限なく使えます。
  - **一次情報**: 月75回・初月150回という AI リクエスト枠は現行の Warp には存在しない。現在の Free プランは Warp Agent 用の AI 利用枠を含まず、クレジット購入か BYOK が必要。ターミナル部分については pricing ページが Free に 'Includes core terminal features' と 'State-of-the-art modern terminal' と記載しており基本機能が無料である点は整合するが、同じ Free 列に 'Limited Warp Drive and collaboration feature access' 'Limited cloud conversation storage' と明記されているため「全て無料で制限なく」という全称は成り立たない。
  - 出典: https://docs.warp.dev/support-and-community/plans-and-billing/plans-pricing-refunds/

### `claude-mux/hooks-advanced/HooksGuide.tsx`

- **記述**: Hook のアクションは3種類のタイプから選択します。用途に応じて使い分けます。
  - **一次情報**: 3 種類ではなく 5 種類。`type` フィールドが取る値は `"command"`, `"http"`, `"mcp_tool"`, `"prompt"`, `"agent"` の 5 つ（Common fields テーブルの `type` 行に明記）。うち `agent` は experimental（"Agent hooks are experimental and may change."）。また SessionStart と Setup は `command` と `mcp_tool` しかサポートしない（"`SessionStart` and `Setup` support `command` and `mcp_tool` hooks. They don't support `http`, `prompt`, or `agent` hooks."）ので、5 種類がどのイベントでも使えるわけではない点も併記が要る。
  - 出典: https://code.claude.com/docs/en/hooks
- **記述**: exit 0: 許可（処理を続行） / exit 2: ブロック（操作を中止） / stdout: Claude への注入テキスト
  - **一次情報**: 3 項目のうち 2 項目が誤り。(1) exit 0 は「許可」ではなく「成功／判断なし」。原文は「the hook has no decision to report」「staying silent doesn't approve it」で、通常の permission flow にそのまま流れる。許可を明示するには JSON の `permissionDecision` を使う。(2) stdout は常に Claude へ注入されるわけではなく、既定では debug log に書かれてトランスクリプトに出ない。プレーンテキスト stdout がコンテキストとして Claude に渡るのは `UserPromptSubmit` / `UserPromptExpansion` / `SessionStart` の 3 イベントのみ。(3) exit 2 = ブロックは「ブロックできるイベント」に限った話で、正しくは「Exit 
  - 出典: https://code.claude.com/docs/en/hooks
- **記述**: exit code 2 は PreToolUse でのみ「ブロック」として機能します。PostToolUse や他のイベントでは exit code 2 はエラーとして扱われます。
  - **一次情報**: 「PreToolUse でのみブロックする」は誤り。公式の "Exit code 2 behavior per event" テーブルで Can block? = Yes のイベントは PreToolUse, UserPromptSubmit, UserPromptExpansion, Stop, SubagentStop, TeammateIdle, TaskCreated, TaskCompleted, ConfigChange, PostToolBatch, PreCompact, Elicitation, ElicitationResult, WorktreeCreate の 14 件ある。後半の PostToolUse についての記述も正確ではなく、PostToolUse は「エラー扱い」ではなく「Shows stderr to Claude; the tool already ran」で、公式は PostToolUs
  - 出典: https://code.claude.com/docs/en/hooks
- **記述**: { "type": "command", "command": "prettier --write $CLAUDE_FILE_PATH" }
  - **一次情報**: $CLAUDE_FILE_PATH という環境変数は存在しない。公式の Hooks reference が hook プロセスに export されると明記している変数は CLAUDE_PROJECT_DIR / CLAUDE_PLUGIN_ROOT / CLAUDE_PLUGIN_DATA（ほかに CLAUDE_EFFORT, CLAUDE_CODE_REMOTE, CLAUDE_CODE_BRIDGE_SESSION_ID, CLAUDE_PLUGIN_OPTION_<KEY>, SessionStart 限定の CLAUDE_ENV_FILE）で、CLAUDE_FILE_PATH は docs 全文（llms-full.txt, 7.4MB）にも 1 件も出現しない。command hook は「Your script receives the event's JSON input on stdin」であり、ファイルパスは
  - 出典: https://code.claude.com/docs/en/hooks

### `claude-mux/ide-agent-teams/AgentOrchestration.tsx`

- **記述**: Agent Teams は、複数の Claude Code インスタンスを協調動作させる公式機能。2026年2月5日に Opus 4.6 と同時にリリースされた。最新版の Claude Code で利用できる。
  - **一次情報**: リリース日（2026-02-05、Opus 4.6 と同時）は正しいが、「最新版の Claude Code で利用できる」は誤り。Agent teams は現在も experimental で既定は無効。settings.json または環境変数で `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` を設定しないと、セッション開始時にチームは作られず Claude はチームメイトを spawn も提案もしない。初出時も「research preview」と表記されている。また非対話モード（`-p` / Agent SDK）ではチームメイトは spawn されない。
  - 出典: https://code.claude.com/docs/en/agent-teams
- **記述**: 全チームメイトがメインターミナル内で動作する。Shift+Up / Shift+Down でチームメイト間を切り替えて、各メイトの進捗をリアルタイムに確認できる。追加ツール不要で使える。
  - **一次情報**: キーバインドが誤り。現行の in-process モードでは、agent panel 上で **修飾キーなしの上下矢印キー**でチームメイトを選択し、**Enter** でそのトランスクリプトを開いて直接メッセージを送る（停止は選択中に `x`、タスクリスト表示は Ctrl+T）。Shift+Up / Shift+Down は古い仕様で、CHANGELOG 2.1.47 で「Simplified teammate navigation to use only Shift+Down (with wrapping) instead of both Shift+Up and Shift+Down.」と Shift+Down のみに整理され、現行ドキュメントでは矢印キー単体になっている。「メインターミナル内で全員動作」「追加ツール不要」「in-process が既定」の 3 点は正しい。
  - 出典: https://code.claude.com/docs/en/agent-teams
- **記述**: macOS で cmux を使う場合、cmux claude-teams でチームメイトを cmux のネイティブ split として起動できる。tmux も iTerm2 も介さず、サイドバーのメタデータと通知リングで状態を可視化できる。
  - **一次情報**: 「tmux も iTerm2 も介さず」が実際の仕組みと食い違う。cmux claude-teams は tmux shim（~/.cmuxterm/claude-teams-bin/tmux）を作り、TMUX / TMUX_PANE を偽装して Claude Code に「tmux の中にいる」と思わせ、Claude が発行する tmux コマンドを cmux の socket API 呼び出しへ翻訳する。つまり実体としての tmux / iTerm2 のインストールは不要だが、tmux 互換レイヤーを経由する。また teammate mode は auto に設定される。ドキュメントの表記は「notifications」で、「通知リング」という語は使われていない。「cmux claude-teams でチームメイトがネイティブ cmux split として現れる」「サイドバーのメタデータ」は正しい。
  - 出典: https://cmux.com/docs/agent-integrations/claude-code-teams
- **記述**: 親セッションのコンテキストを継承
  - **一次情報**: 通常の subagent は親セッションのコンテキストを継承しない。独立した新しいコンテキストウィンドウで開始し、会話履歴・既に呼んだスキル・既読ファイルは見えない（Claude が要約した委任メッセージだけを受け取る）。Agent Teams のドキュメントの比較表でも subagents の Context 欄は「Own context window; results return to the caller」と書かれており、teammates との違いはコンテキストの継承有無ではなく「結果が呼び出し元に返るだけか、互いに直接通信できるか」。例外は `subagent_type: "fork"` の fork で、これだけが会話全体を継承する。
  - 出典: https://code.claude.com/docs/en/sub-agents

### `git/ai-agent/ClaudeCodeSetup.tsx`

- **記述**: Claude Code は Node.js（v18 以上）が必要です。 このマニュアルの「環境準備」で既にインストール済みの方はそのままでOKです。
  - **一次情報**: 2 点で現状と食い違う。(1) npm 経由でインストールする場合の要件は Node.js 18 以上ではなく 22 以上（v2.1.198 以降）。npm レジストリ実測でも @anthropic-ai/claude-code の最新 2.1.233 は engines {"node": ">=22.0.0"}（>=18.0.0 から引き上げられたのは 2026-08-03 公開の 2.1.221 前後）。(2) そもそも現在の Claude Code は Node.js を必須としない。公式の「System requirements」に Node.js の項目は無く（OS / Hardware / Network / Shell / Location のみ）、推奨インストールはネイティブインストーラ（curl -fsSL https://claude.ai/install.sh | bash）で、npm 版も「the pac
  - 出典: https://code.claude.com/docs/en/setup
- **記述**: AIエージェント「Claude Code」をインストールして、ターミナルからAIと対話できる環境を作ります。 まずは無料プランで始めましょう。
  - **一次情報**: Claude Code は無料プラン（無料の Claude.ai プラン）では利用できない。Pro / Max / Team / Enterprise / Console のいずれかのアカウントが必要で、代わりに Amazon Bedrock / Google Cloud の Agent Platform / Microsoft Foundry といったサードパーティ API プロバイダ経由で使うこともできる。「まずは無料プランで始めましょう」は成立しないので、有料プラン契約または Console のクレジット購入が前提であることを書く必要がある。
  - 出典: https://code.claude.com/docs/en/setup
- **記述**: 無料プランでも十分な機能を体験できる
  - **一次情報**: 無料プランでは Claude Code の機能を一切使えない（アクセス自体が含まれない）。「無料で開始可能／無料プランでも十分な機能を体験できる」ではなく、Pro・Max・Team・Enterprise・Console のいずれかのアカウントが必要である旨に書き換える必要がある。
  - 出典: https://code.claude.com/docs/en/setup
- **記述**: Claude Code は Anthropic のAPIを利用します。新規登録すると無料クレジットが付与されるため、 まずは無料で始められます。クレジットが尽きた場合でも、 使った分だけ課金される従量課金制です（最初は $5 程度のクレジット追加で十分使えます）。
  - **一次情報**: Claude API / Console の課金は「後払いの従量課金」ではなく前払いの usage credits 制で、API を使う前にクレジットを購入する必要がある。クレジットが尽きたら API も Workbench も呼べなくなる（残高が下限を割った時に自動購入する auto-reload は設定可能）。また Claude Code はそもそも無料プランでは使えず、Pro / Max / Team / Enterprise / Console のいずれかのアカウントが必要（https://code.claude.com/docs/en/setup: 「Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free Claude.ai plan does not include Claude Code access.」）。新規
  - 出典: https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage

### `react/nextjs-advanced/Next15Features.tsx`

- **記述**: 開発サーバー起動が最大 76% 高速化
  - **一次情報**: 公式の数値は「最大 76.7%」。76% は切り捨てで、一次情報の数値と一致しない。また この数値は一般的な値ではなく vercel.com という大規模 Next.js アプリでの計測値（"For example, with `vercel.com`, a large Next.js app, we've seen:" に続く 3 項目の 1 つ）なので、条件も併記するのが正確。
  - 出典: https://nextjs.org/blog/turbopack-for-development-stable
- **記述**: HMR（Hot Module Replacement）が最大 96% 高速化
  - **一次情報**: 公式の数値は「最大 96.3%」で、対象は「code updates with Fast Refresh」。96% は切り捨てで一次情報と一致しない。こちらも vercel.com での計測値。
  - 出典: https://nextjs.org/blog/turbopack-for-development-stable
- **記述**: 以前はデフォルトで <code className="text-sm bg-muted px-1.5 py-0.5 rounded">force-cache</code>（キャッシュ優先）でしたが、Next.js 15 からは <code className="text-sm bg-muted px-1.5 py-0.
  - **一次情報**: 前半（Next.js 14 までの既定が force-cache）と「Next.js 15 で fetch が既定ではキャッシュされなくなった」ことは正しいが、15 以降の既定値は `no-store` ではない。公式ドキュメントは既定を `auto no cache` と呼び、`no-store` とは挙動が異なる: 既定は Request-time API を使わないルートなら `next build` 時に一度だけ取得して静的プリレンダされるのに対し、`no-store` を明示するとその場合でも毎リクエスト取得する。正しくは「既定でキャッシュされなくなった（既定は `auto no cache`）。キャッシュしたい fetch には `cache: 'force-cache'` を明示する」。
  - 出典: https://nextjs.org/docs/app/api-reference/functions/fetch
- **記述**: await logAccess({ path: request.nextUrl.pathname, method: request.method, ip: request.ip, });
  - **一次情報**: `request.ip` は Next.js 15 で削除済みのため、このコードは Next.js 15 以降では使えない（TypeScript ではプロパティ不在の型エラーになる）。Vercel なら `@vercel/functions` の `ipAddress(request)` を使う（例: `import { ipAddress } from '@vercel/functions'` → `const ip = ipAddress(request)`）。それ以外のホスティングでは `x-forwarded-for` 等のヘッダをホスティング側の仕様に合わせて読む。一括変換は `npx @next/codemod@latest next-request-geo-ip .`。
  - 出典: https://nextjs.org/docs/app/guides/upgrading/version-15

### `react/nextjs-advanced/Next15Ppr.tsx`

- **記述**: PPR は Next.js 15 時点ではまだ実験的（experimental）な機能です。本番利用は可能ですが、API が将来変更される可能性があります。
  - **一次情報**: 「実験的である」「API が将来変更されうる」は正しいが、「本番利用は可能」は公式の案内と食い違う。Next.js 15 当時の公式 PPR ドキュメントは「It is not ready for production use.（本番利用の準備ができていない）」と明記し、さらに「only available on canary」＝安定版 15 では使えず canary チャンネル限定だとしていた。加えて Next.js 16 では experimental.ppr フラグ自体が削除され、トップレベルの cacheComponents に置き換わっている。
  - 出典: http://web.archive.org/web/20241206112702/https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering
- **記述**: Next.js 16 は、React Compiler のデフォルト有効化や Node.js ランタイムの改善など、パフォーマンスと開発者体験のさらなる向上が予定されています。
  - **一次情報**: 2 点が誤り。(1) Next.js 16 は「予定」ではなく既にリリース済み（公式ブログ https://nextjs.org/blog/next-16 の publishedAt は October 21st 2025）。(2) React Compiler はデフォルト有効ではない。`reactCompiler` オプションが experimental から stable に昇格しただけで、明示的に `reactCompiler: true` を書き `babel-plugin-react-compiler` を別途インストールした場合のみ有効になる。また Next.js 16 の主要変更として公式が挙げているのは Cache Components / Turbopack のデフォルト化・ファイルシステムキャッシュ / DevTools MCP / middleware.ts → proxy.ts / ルーティング刷新 /
  - 出典: https://nextjs.org/blog/next-16
- **記述**: // React Compiler はデフォルトで有効 // 無効にしたい場合のみ設定 // reactCompiler: false,
  - **一次情報**: デフォルトは無効。有効化する側が `reactCompiler: true` を書き、あわせて `babel-plugin-react-compiler` を devDependency としてインストールする必要がある。`reactCompiler: false` を書く必要は無い（未指定が既定でオフ）。公式は「The `reactCompiler` configuration option has been promoted from `experimental` to stable. It is not enabled by default as we continue gathering build performance data across different application types.」としている。なお `reactCompiler` はオブジェクトも受け取り、`{ compilationMode: '
  - 出典: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
- **記述**: title: 'Next.js 16 RC ブログ', url: 'https://nextjs.org/blog/next-15-3',
  - **一次情報**: https://nextjs.org/blog/next-15-3 は「Next.js 15.3」(2025-04-09) の記事であり、Next.js 16 RC の記事ではない。Next.js 16 の発表記事は https://nextjs.org/blog/next-16（HTTP 200）。/blog/next-16-rc は存在しない（HTTP 404）。タイトルを『Next.js 15.3 ブログ』にするか、URL を https://nextjs.org/blog/next-16 に差し替える必要がある。
  - 出典: https://nextjs.org/blog/next-15-3

### `claude-mux/best-practices/EffectiveWorkflows.tsx`

- **記述**: チェックポイント / Claude Code は自動的にチェックポイントを作成。git diff で変更前の状態に戻れる。
  - **一次情報**: 前半（Claude Code が自動でチェックポイントを作成する）は正しい。後半が誤り。復元は `git diff` ではなく `/rewind`（またはプロンプト入力が空の状態で `Esc` を 2 回）で rewind メニューを開き、"Restore code" / "Restore code and conversation" を選ぶ。`git diff` は差分を表示するコマンドであって復元コマンドではない。なお一次情報は、bash コマンドによるファイル変更とサブエージェントの編集はチェックポイントで復元できず、その場合は git で戻すよう案内している（"Use git to revert them."）。
  - 出典: https://code.claude.com/docs/en/checkpointing
- **記述**: Shift+Tab でパーミッションモードを切り替える際に、Fast Mode（Haiku）を選択できます。単純なタスクには高速・低コストのモデルを使い、複雑な設計にはデフォルトの Sonnet を使う、という切り替えが効率的です。
  - **一次情報**: 2 点とも誤り。(1) Shift+Tab が切り替えるのはパーミッションモードのみで、その循環は `default`（表示は Manual）→ `acceptEdits` → `plan`（環境により `bypassPermissions` → `auto`）。Fast Mode はこの循環に含まれず、`/fast` コマンド、`Option+O`（macOS）/ `Alt+O`（Windows・Linux）、または設定の `"fastMode": true` で切り替える。(2) Fast Mode は Haiku ではない。Opus を高速な API 構成で動かすもので、Opus 5 / Opus 4.8 のみ対応、Sonnet・Haiku では利用できない。低コストでもなく「a higher cost per token」と明記されている（Opus 5 / 4.8 で入出力 $10/$50 per MTok）。低コストな
  - 出典: https://code.claude.com/docs/en/fast-mode
- **記述**: セッション中に Shift+Tab を押すとモード選択メニューが表示されます。Fast Mode は同じ Claude Opus モデルを高速出力モードで使用するため、モデル自体は変わりません。
  - **一次情報**: 後半は正しいが前半が誤り。Shift+Tab は「メニューを表示」するのではなくパーミッションモードを順に巡回するキーで、対象は default（表示上は Manual）/ acceptEdits / plan /（利用可能なら）bypassPermissions / auto の 5 つ。Fast Mode はこの巡回に含まれず、`/fast`（または macOS の Option+O / Windows・Linux の Alt+O、あるいは settings.json の "fastMode": true）で切り替える。なお同ページ 233 行目の「Fast Mode（Haiku）」も誤りで、Fast Mode は Opus 5 / Opus 4.8 のみ対応、Haiku では利用できない（"It is not available on Sonnet, Haiku, or other models."）。
  - 出典: https://code.claude.com/docs/en/interactive-mode

### `claude-mux/cmux/CmuxSetup.tsx`

- **記述**: 新規ワークスペース Cmd+Shift+N / 右ペイン分割 Cmd+Shift+D / 下ペイン分割 Cmd+Shift+J / 未読通知にジャンプ Cmd+Shift+U / 通知パネル Cmd+Shift+I / ビルトインブラウザ Opt+Cmd+D / ワークスペース切替 Cmd+1 〜 Cmd+9
  - **一次情報**: 正しい既定値は次の通り。新規ワークスペース = Cmd+N（Cmd+Shift+N は新規ウィンドウ）。右ペイン分割 = Cmd+D。下ペイン分割 = Cmd+Shift+D（Cmd+Shift+J は既定に存在しない）。未読通知にジャンプ = Cmd+Shift+U（この 1 件のみ claim と一致）。通知パネル = Cmd+I。ビルトインブラウザを split で開く = Cmd+Shift+L（Opt+Cmd+D は「Split Browser Right」に割り当てられている別アクション）。ワークスペース切替 = Cmd+1〜Cmd+8 が 1〜8 番、Cmd+9 は「最後のワークスペース」へジャンプ。
  - 出典: https://github.com/manaflow-ai/cmux#keyboard-shortcuts
- **記述**: cmux は libghostty ベースのため、クリップボードに保持した画像（スクリーンショット等）を Claude Code のプロンプト欄に Cmd+V で直接貼り付けることができない。iTerm2 では OSC 1337 などの独自プロトコルで画像転送が可能だが、Ghostty 系はテキスト中心の設計でこれをサ
  - **一次情報**: cmux は 0.62.0（2026-03-12）でターミナルへの Cmd+V によるクリップボード画像ペーストに対応済み。実装はクリップボード画像を Mac 上の一時ファイルに書き出し、そのシェルエスケープ済みパスをターミナル入力として注入する方式で、ソースコメントが明示的に「the running TUI (e.g. Claude Code) attaches the image from the path」と述べている。したがって「Claude Code のプロンプト欄に Cmd+V で直接貼り付けることができない」は誤り。なお、これは iTerm2 の OSC 1337 のような画像転送プロトコルではなくパス注入によるものである点、および Ghostty/libghostty 側は kitty graphics protocol を実装している（docs/ghostty-fork.md にハンドリング記述あり）点も、cl
  - 出典: https://github.com/manaflow-ai/cmux/blob/main/CHANGELOG.md
- **記述**: # Homebrew リンクが効いていない場合（CLI が見つからない） $ which cmux cmux not found # → 対処: brew link --overwrite cmux もしくは brew reinstall --cask cmux
  - **一次情報**: `brew link` は formula 専用で、cask には使えない。cmux は cask（homebrew/cask、formula は存在しない）として配布されており、CLI は cask の binary artifact（$APPDIR/cmux.app/Contents/Resources/bin/cmux → $HOMEBREW_PREFIX/bin/cmux）として貼られる。実機で `brew link --overwrite --dry-run cmux` を実行すると `Error: No such keg: /opt/homebrew/Cellar/cmux` で失敗する。後半の `brew reinstall --cask cmux` は正しい（manpage の reinstall は「formula or cask」を取り、`--cask` オプションを持つ）。前半のコマンドを削除するか `br
  - 出典: https://docs.brew.sh/Manpage

### `git/react/Setup.tsx`

- **記述**: 「Learn React」というテキストが表示されれば、成功です。
  - **一次情報**: 「Learn React」は Create React App のテンプレート由来の文言で、Vite の react テンプレートには存在しない。Setup.tsx は直前で `npm create vite@latest my-react-app -- --template react` を指示しているため、起動後の画面に出るのは「Get started」「Edit src/App.jsx and save to test HMR」「Count is 0」「Learn more」等。確認文は「Get started」等の実際の文言に差し替えるか、「Vite + React のスターター画面が表示されれば成功」といった版に依存しない書き方にする。
  - 出典: https://github.com/vitejs/vite/blob/main/packages/create-vite/template-react/src/App.jsx
- **記述**: my-react-app/ ├── node_modules/ # インストールされたライブラリ ├── public/ # 静的ファイル（HTML など） │ └── index.html # メインの HTML ファイル ├── src/ # React コンポーネント（ここを編集） │ ├── App.js # 
  - **一次情報**: Vite の react テンプレートの実構成は次のとおり。index.html は public/ ではなく**プロジェクトルート**に置かれる（`<script type="module" src="/src/main.jsx">` を読む）。public/ に入っているのは favicon.svg と icons.svg のみ。src/ は App.jsx / App.css / index.css / main.jsx / assets/ で、`src/App.js` と `src/index.js` は存在しない。加えて vite.config.js がルートにあるが図に無い。図示するなら: my-react-app/ ├── node_modules/ ├── public/ # 静的ファイル（favicon.svg, icons.svg） ├── src/ │ ├── App.jsx # メインコンポーネント │ 
  - 出典: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react
- **記述**: サーバーが起動すると、自動的にブラウザが開いて、React アプリが表示されます。
  - **一次情報**: Vite の dev サーバーは既定ではブラウザを自動起動しない。ブラウザを開くのは server.open が真のときだけで（同ファイル: `if (!isRestart && config.server.open) server.openBrowser()`）、既定値は false。`npm create vite` の React テンプレートの scripts も `"dev": "vite"` で --open を付けていない。自動で開かせたい場合は `npm run dev -- --open` を実行するか vite.config に `server: { open: true }` を書く。既定の挙動としては「ターミナルに表示された Local の URL（例: http://localhost:5173/）を自分でブラウザで開く」と書くのが正しい。
  - 出典: https://raw.githubusercontent.com/vitejs/vite/main/packages/vite/src/node/server/index.ts

### `react/css-basics/StyledComponents.tsx`

- **記述**: v6 では CSSOM（insertRule）ではなく テキストノードベースの注入に変更されました。React の Concurrent Mode との互換性が向上しています。
  - **一次情報**: v6.0.0 は注入方式を変更していない。v5.3.11 と v6.0.0 の makeTag / defaultOptions は同一で、どちらも defaultOptions が `useCSSOMInjection: !DISABLE_SPEEDY`（本番ビルドでは CSSOM insertRule、開発ビルドでは TextTag）。TextTag を既定にする分岐は v5 の時点で既に存在しており v6 の変更点ではない。さらに変化の方向はむしろ逆で、v6 系の現行コード（main / packages/styled-components/package.json version 6.4.1）では TextTag そのものが削除され、ブラウザビルドは常に CSSOMTag（insertRule）を使う。v6.0.0 のリリースノートにも style injection / insertRule / CSSOM / tex
  - 出典: https://github.com/styled-components/styled-components/blob/v6.0.0/packages/styled-components/src/sheet/Tag.ts
- **記述**: v6 は Node.js 16 以上、React 18 以上を要求します。 古い環境では v5 を継続使用する必要があります。
  - **一次情報**: Node.js 16 以上は正しい（v6 移行ガイドに「Minimum Node support raised to v16+」「we now support v16 as the oldest runtime that's still receiving security patches」、package.json も engines: {"node": ">= 16"}）。しかし React 18 以上という部分が誤り。v6 の peer 要件は React 16.8 以上。styled-components@6.0.0 および最新 6.5.3 の package.json peerDependencies はいずれも "react": ">= 16.8.0", "react-dom": ">= 16.8.0"。したがって React 17 環境でも v5 に留まる必要はない。
  - 出典: https://raw.githubusercontent.com/styled-components/styled-components-website/main/sections/faqs/browser-support.mdx
- **記述**: にオブジェクトを直接渡す書き方が非推奨になり、 関数形式（.attrs((props) => ({ ... }))）が推奨されます。
  - **一次情報**: v6 でもオブジェクト形式 `.attrs({ ... })` は現行 API として公式ドキュメントに明記されており、非推奨ではない（「Pass either an object or a factory function」）。非推奨化→削除されたのは「オブジェクトの値に関数を書くサブ関数形式」`.attrs({ prop: props => {} })` で、これは v4 で deprecated、v5 で削除済み。v6 の .attrs に関する実際の変更点は次の 2 点: (1) 「.attrs() provides optional props」— attrs が値を与える props がコンポーネントの型上で自動的に optional になる、(2) 「Immutable attrs callback props」— `.attrs(props => ...)` のコールバックが受け取る props がイミュータブル
  - 出典: https://styled-components.com/docs/api#attrs

### `BugReport.tsx`

- **記述**: インターネット接続を確認してください。プレビューは外部 CDN から React を読み込みます。
  - **一次情報**: プレビューは外部 CDN から React を読み込んでいない。React / React DOM の UMD は client/public/vendor/ にセルフホストされ、同一オリジンの絶対パス（/vendor/react-18.3.1.production.min.js 等）で解決される。さらにプレビュー iframe の CSP が script-src 'self' 'unsafe-inline' かつ connect-src 'none' のため、外部 CDN からのスクリプト読み込みはそもそも不可能。「React is not defined」の対処法としてインターネット接続を挙げるのは誤りで、実際の原因はトランスパイル失敗やコンポーネント名検出失敗など別の要因。
- **記述**: ページをリロード（F5 / Cmd+R）してみてください。CDN からの読み込みに時間がかかる場合があります。
  - **一次情報**: プレビューのライブラリは CDN ではなく同一オリジンの /vendor/ から配信されるセルフホスト資産なので、「CDN からの読み込みに時間がかかる」という原因説明は成立しない。リロードを促す案内自体は無害だが、理由の記述を実装に合わせて修正する必要がある（例:「プレビュー用ライブラリは同一オリジンの /vendor/ から読み込まれるため、初回読み込みやキャッシュ未生成時は表示まで少し時間がかかることがあります」等）。

### `ai-ml/lmops/LlmBasics.tsx`

- **記述**: Claude は最大 200K トークンのコンテキストウィンドウに対応しており、長い文書全体を入力に含めることが可能です。
  - **一次情報**: 現行の Claude の最大コンテキストウィンドウは 200K ではなく 1M トークン。Claude Opus 5 / Opus 4.8 / 4.7 / 4.6、Claude Sonnet 5 / Sonnet 4.6、Claude Fable 5 / Mythos 5 が 1M トークンに対応し、ベータヘッダーなしで 1M が既定値（公式ドキュメント: 「For every model with a 1M-token context window, 1M is the default: you don't need a beta header」）。200k トークンなのは Claude Haiku 4.5 や Claude Sonnet 4.5 など一部モデルに限られる（「Other Claude models, including Claude Sonnet 4.5, have a 200k-token context w
  - 出典: https://platform.claude.com/docs/en/build-with-claude/context-windows
- **記述**: model="claude-sonnet-4-20250514"
  - **一次情報**: claude-sonnet-4-20250514 は 2026-06-15 に retire 済みで、現在このモデル ID へのリクエストは失敗する（公式ドキュメント: 「**Retired:** The model is no longer available for use. Requests to retired models will fail.」）。公式の推奨代替は claude-sonnet-4-6、最新世代を使うなら claude-sonnet-5。教材のサンプルコードは有効な ID（例: claude-sonnet-5）に差し替える必要がある。
  - 出典: https://platform.claude.com/docs/en/about-claude/model-deprecations

### `api/build/Auth.tsx`

- **記述**: RFC 7235 は 401 応答に WWW-Authenticate ヘッダー（どの認証方式が必要かを示す）を付けるべき（SHOULD）と 定めています。
  - **一次情報**: 規範レベルが誤り。RFC 7235 §3.1 は SHOULD ではなく MUST（「MUST send a WWW-Authenticate header field ... containing at least one challenge」）と定めている。§4.1 も「A server generating a 401 (Unauthorized) response MUST send a WWW-Authenticate header field containing at least one challenge.」。加えて RFC 7235 自体が 2022 年の RFC 9110（HTTP Semantics, STD 97）に obsolete されており（RFC 9110 ヘッダ「Obsoletes: 2818, 7230, 7231, 7232, 7233, 7235, 7538, 7615, 7694」）、現
  - 出典: https://www.rfc-editor.org/rfc/rfc7235#section-3.1
- **記述**: また PyJWT は HMAC 鍵が 32 バイト未満だと InsecureKeyLengthWarning を出します（RFC 7518 §3.2: HS256 は鍵長 32 バイト以上が推奨）。
  - **一次情報**: 括弧内の RFC 7518 §3.2 の規範レベルが誤り。「推奨」ではなく MUST（要件）である。RFC 7518 §3.2 は「A key of the same size as the hash output (for instance, 256 bits for "HS256") or larger MUST be used with this algorithm.」と規定し、原文でも "This requirement" と呼んでいる。節番号 3.2 と 256 ビット = 32 バイトという数値自体は正しい。前半の PyJWT の挙動は正確で、jwt/warnings.py に class InsecureKeyLengthWarning(UserWarning) が実在し、jwt/algorithms.py の HMACAlgorithm.check_key_length が `min_length = self.
  - 出典: https://www.rfc-editor.org/rfc/rfc7518#section-3.2

### `api/rest-design/ErrorHandling.tsx`

- **記述**: FastAPI の既定 401（トークン無し、実測）— { "detail": "invalid or missing token" }
  - **一次情報**: FastAPI の「既定」と呼べるのは `{"detail": <文字列>}` という形までで、"invalid or missing token" はアプリ側が `HTTPException(401, detail="invalid or missing token")` のように渡した文字列。detail を省略した場合の FastAPI/Starlette 既定本文は HTTP reason phrase が入った `{"detail": "Unauthorized"}` になる。見出しを「FastAPI の既定 401」ではなく「サンプルアプリの 401（既定の detail 形式）」等に改め、フレームワーク既定を示すなら `{"detail": "Unauthorized"}` を併記するのが正確。
  - 出典: https://github.com/encode/starlette/blob/master/starlette/exceptions.py
- **記述**: 対比: FastAPI 既定は content-type: application/json + { "detail": "not found" }。problem+json は media type と標準フィールドを持つ点が違います。出典: FastAPI + Nuxt sandbox で実測。
  - **一次情報**: 前半の「content-type: application/json」と「detail キー 1 本の JSON」は FastAPI 既定として正しいが、値の "not found" は既定ではなくアプリが渡した detail。detail を省略した FastAPI 既定の 404 本文は HTTP reason phrase の `{"detail": "Not Found"}`（大文字始まり）。「FastAPI 既定は content-type: application/json + `{"detail": "Not Found"}`（detail を渡せば任意の文字列に変わる）」と書けば実測と一致する。
  - 出典: https://github.com/fastapi/fastapi/blob/master/fastapi/exception_handlers.py

### `claude-mux/cicd-headless/HeadlessMode.tsx`

- **記述**: --allowedTools "tool1,tool2" / 指定ツールのみ許可 / 限定的な自動化、settings.json の allowedTools / 設定ファイルで許可を永続化 / プロジェクト設定
  - **一次情報**: CLI フラグ `--allowedTools "tool1,tool2"` は実在するが、2 点誤りがある。(1) settings.json に `allowedTools` というキーは存在しない。設定ファイルで許可を永続化する正しいキーは `permissions.allow`（ほかに deny / ask / defaultMode / disableBypassPermissionsMode / disableAutoMode / additionalDirectories）。(2) `--allowedTools` は「指定ツールのみ許可（利用可能ツールの制限）」ではなく「許可プロンプトなしで実行できるツールの指定」。利用可能なツール自体を絞るのは `--tools`。
  - 出典: https://code.claude.com/docs/en/cli-reference
- **記述**: import { claude } from "@anthropic-ai/claude-code"; // 基本的な呼び出し const result = await claude({ prompt: "src/index.ts のバグを修正して", options: { maxTurns: 5, allowedTo
  - **一次情報**: パッケージ名と関数名の両方が誤り。TypeScript の Agent SDK は `@anthropic-ai/claude-agent-sdk` で、エントリ関数は `claude()` ではなく `query()`。`@anthropic-ai/claude-code` は CLI 配布用パッケージで、npm レジストリ上の metadata が main / types / exports すべて null、`bin` に claude のみを持つため、そもそも `import` してモジュールとして使えない。正しくは `import { query } from "@anthropic-ai/claude-agent-sdk";` + `query({ prompt, options: { maxTurns, allowedTools } })`（options の `maxTurns` / `allowedTools
  - 出典: https://code.claude.com/docs/en/agent-sdk/typescript

### `claude-mux/hooks-advanced/HooksRecipes.tsx`

- **記述**: PreToolUse で exit 2 を返すと、ツールの実行がブロックされ、stdout の内容がブロック理由として Claude に通知されます。Claude はブロック理由を踏まえて別のアプローチを試みます。
  - **一次情報**: 「PreToolUse で exit 2 を返すとツール実行がブロックされる」は正しいが、ブロック理由として Claude に渡るのは stdout ではなく stderr。公式は「The blocking message is the reason from your JSON's blocking decision when it makes one, and your stderr text otherwise.」「A hook that blocks by exiting 2 routes the same way as "deny": Claude sees the stderr message as the denial reason.」と明記している（stdout は JSON output の読み取り経路であって、プレーンテキストのブロック理由の経路ではない）。この誤りは説明文だけでなく同ファイルのコード例にも波
  - 出典: https://code.claude.com/docs/en/hooks#exit-code-2
- **記述**: { "type": "agent", "prompt": "以下の手順で変更を検証してください:\n1. git diff --name-only で変更されたファイルを特定\n2. 変更されたファイルに関連するテストを実行\n3. テストが失敗する場合は原因を報告（修正はしない）", "tools": ["Bash"
  - **一次情報**: `"type": "agent"` と `"prompt"` は実在する（agent hook は公式に存在し、prompt は必須）。しかし `"tools"` は agent hook の設定キーとして存在しない。公式の Agent hook configuration 表が挙げるのは type / prompt / model / timeout のみで、common fields は type / if / timeout / statusMessage / once。`"tools"` は Hooks reference 全文（3436 行）に 1 件も出現せず、docs 全文で `"tools"` が出るのは `claude --agents` CLI フラグでのサブエージェント定義（別機能）だけ。使えるツールは設定ではなく仕様側で決まっており、公式は「The subagent can use tools like 
  - 出典: https://code.claude.com/docs/en/hooks#agent-based-hooks

### `claude-mux/mcp/MCPPractical.tsx`

- **記述**: $ claude mcp add serena -- uvx \ --from git+https://github.com/oraios/serena \ serena start-mcp-server --context claude-code --project "$(pwd)"
  - **一次情報**: `start-mcp-server --context claude-code --project "$(pwd)"` の部分は現行公式と完全一致だが、起動方法（`uvx --from git+https://github.com/oraios/serena`）が現行の一次情報から消えている。現在の公式手順は (1) `uv tool install -p 3.13 serena-agent` で serena をインストール、(2) `serena init` で初期化、(3) Claude Code へは `serena setup claude-code` の 1 コマンド、または手動なら per-project が `claude mcp add serena -- serena start-mcp-server --context claude-code --project "$(pwd)"`、global が `cl
  - 出典: https://github.com/oraios/serena/blob/main/docs/02-usage/030_clients.md
- **記述**: ツール数が多い場合、Claude CodeはTool Searchを自動的に使用します。全ツールを事前にロードせず、必要なときだけオンデマンドで検索・取得するため、コンテキストを節約できます。
  - **一次情報**: 「ツール数が多い場合」という条件が誤り。Tool Search はツール数に関係なく既定で有効（"Tool search is enabled by default"）で、MCP ツールは常に遅延ロードされる。ツール数・サイズに応じて切り替わる閾値モードは既定ではなくオプトインの `ENABLE_TOOL_SEARCH=auto` であり、しかも判定基準は「ツール数」ではなく「ツール定義の合計がコンテキストウィンドウの 10% に達するか」。正しくは「Claude Code は既定で Tool Search を使い、MCP ツールを事前ロードせずオンデマンドで検索・取得するためコンテキストを節約できる」。なお既定から外れて全ツール事前ロードになる例外は、`ENABLE_TOOL_SEARCH=false`、`ANTHROPIC_BASE_URL` がファーストパーティ以外を指す場合、Azure ホストの Microsoft Fo
  - 出典: https://code.claude.com/docs/en/mcp

### `claude-mux/mcp/MCPSetup.tsx`

- **記述**: "figma": { "type": "stdio", "command": "npx", "args": ["-y", "@anthropic/mcp-server-figma"] }
  - **一次情報**: @anthropic/mcp-server-figma は npm に存在しない。GET https://registry.npmjs.org/@anthropic%2fmcp-server-figma が 404 を返し、さらに `@anthropic` スコープ自体に公開パッケージが 1 件も無い（scope 検索の total が 0）。Anthropic の公開スコープは `@anthropic-ai`（例: @anthropic-ai/claude-code）。したがって `npx -y @anthropic/mcp-server-figma` は必ず失敗する。実在する Figma 向け MCP サーバは公式の Figma リモート MCP（HTTP 接続）か、サードパーティの npm パッケージ（例: figma-developer-mcp 0.13.2）。
  - 出典: https://registry.npmjs.org/@anthropic%2fmcp-server-figma
- **記述**: MCPは「クライアント（Claude Code）」「サーバ（MCPサーバ）」「ホスト（あなたのPC）」の三者間で通信を行います。
  - **一次情報**: ホストは「あなたの PC」（マシン）ではなく、Claude Code や Claude Desktop のような AI アプリケーション本体（ホストプロセス）を指す。したがって Claude Code は「クライアント」ではなく「ホスト」であり、クライアントはそのホストが MCP サーバ 1 つにつき 1 つ生成する内部コンポーネント（サーバと 1:1 の接続を維持する）。正しくは「ホスト（Claude Code などの AI アプリ）」「クライアント（ホストがサーバごとに 1 つ作る接続コンポーネント）」「サーバ（MCP サーバ）」の 3 者。
  - 出典: https://modelcontextprotocol.io/docs/learn/architecture

### `claude-mux/multi-ai-architecture/DesignMd.tsx`

- **記述**: README のルール表は broken-ref を「error / 解決しないトークン参照」と説明している。しかし colors の中に accent: "{colors.nope}}" と書いて 0.4.0 で試すと、lint の findings に broken-ref は現れず errors は 0、expo
  - **一次情報**: ページに書かれた閉じ波括弧 2 つの `accent: "{colors.nope}}"` を 0.4.0 の lint に当てると errors は 0 ではなく 1（"summary": { "errors": 1, "warnings": 0, "infos": 3 }、終了コード 1）。出るのは broken-ref ではなく rule フィールドを持たない色値バリデーションのエラーで、message は quote のとおり。閉じ波括弧 1 つの正しい参照記法 `accent: "{colors.nope}"` にした場合は主張どおりで、findings に broken-ref は現れず errors 0・終了コード 0、export の @theme にも --color-accent は出ない。また broken-ref 自体は死んでおらず、components 配下（`components.btn.backgr
  - 出典: https://www.npmjs.com/package/@google/design.md/v/0.4.0
- **記述**: CLI は UI を生成しない。サブコマンドは lint diff export spec の 4 つで、出力は既定で JSON。
  - **一次情報**: サブコマンドが lint / diff / export / spec の 4 つである点は正しい（`USAGE design.md lint|diff|export|spec`）。しかし「出力は既定で JSON」は 4 つ全体には当てはまらない。既定が JSON なのは lint と diff だけで、両者の help はいずれも `--format="json" Output format: json or text` と表示する。`spec` の既定は markdown（`--format="markdown" Output format (markdown, json).`）で、ページ自身のコード例 `npx @google/design.md spec --rules` も markdown を出力する。`export` に至っては既定値が無く `--format (required)` で、選べるのは css-tai
  - 出典: https://registry.npmjs.org/@google/design.md

### `claude-mux/multi-ai-architecture/MultiAICoexistence.tsx`

- **記述**: OpenAI Codex / AGENTS.md codex.md
  - **一次情報**: 現行の OpenAI Codex が読む指示ファイルは AGENTS.md 系のみで、codex.md は読まれない。公式ドキュメントの探索順は「1. Global scope: `~/.codex` で `AGENTS.override.md` があればそれ、なければ `AGENTS.md`」「2. Project scope: プロジェクトルートから cwd まで各ディレクトリで `AGENTS.override.md` → `AGENTS.md` → `project_doc_fallback_filenames` の順に探す」。設定ファイルは別途 `~/.codex/config.toml`。codex.md は 2025 年 4 月時点の Codex CLI README にあった旧名（当時の README 232-233 行: "2. `codex.md` at repo root - shared project 
  - 出典: https://learn.chatgpt.com/docs/agent-configuration/agents-md
- **記述**: # .gemini/config.yaml pull_request_opened: code_review: enabled: true language: ja
  - **一次情報**: ファイル位置（リポジトリルートの `.gemini/config.yaml`）だけは正しいが、YAML の構造とキーが公式スキーマと合わない。(1) 入れ子が逆で、`pull_request_opened` は `code_review` の**子**（`code_review.pull_request_opened`）。(2) `enabled` というキーは存在しない。オン/オフは `code_review.disable`（boolean）と、`pull_request_opened` 配下の `help` / `summary` / `code_review` / `include_drafts`（いずれも boolean）で表す。(3) `language` と `focus` は config.yaml スキーマに存在しない。日本語でのレビューや観点の指定は `.gemini/styleguide.md`（同じ `.
  - 出典: https://docs.cloud.google.com/gemini/docs/code-review/customize-repo-review

### `claude-mux/multi-ai-architecture/SingleSourceOfTruth.tsx`

- **記述**: // Claude Code は AGENTS.md を自動認識
  - **一次情報**: Claude Code は AGENTS.md を自動では読まない。読ませるには CLAUDE.md に `@AGENTS.md` と書いて import するか、`ln -s AGENTS.md CLAUDE.md` でシンボリックリンクを張る（Windows はシンボリックリンク作成に管理者権限か開発者モードが要るため import が推奨）。自動で AGENTS.md に触れるのは限定的な経路だけで、公式ドキュメントは「Running /init reads Cursor rules ... With `CLAUDE_CODE_NEW_INIT=1` set, `/init` also reads `AGENTS.md` ...」と、環境変数を立てた `/init` 実行時の読み込みに限っている。ほかに `/import` コマンドが AGENTS.md 等を CLAUDE.md へ 1 回コピーする（v2.1.213 以
  - 出典: https://code.claude.com/docs/en/memory
- **記述**: // VS Code settings.json { "github.copilot.chat.useAgentsMdFile": true }
  - **一次情報**: 設定 ID は `github.copilot.` プレフィックスなしの `chat.useAgentsMdFile`。settings.json には `{ "chat.useAgentsMdFile": true }` と書く。サブフォルダの AGENTS.md も拾わせたい場合の実験的設定は `chat.useNestedAgentsMdFiles`。なお AGENTS.md 対応は既定で有効なので、この設定は主に無効化に使う（v1.104 リリースノート: "Support for `AGENTS.md` files is enabled by default and can be controlled with the `setting(chat.useAgentsMdFile)` setting."）。
  - 出典: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/chat/common/promptSyntax/config/config.ts

### `git/advanced/VSCode.tsx`

- **記述**: VSCode の拡張機能マーケットプレイスから「Remote - WSL」を検索してインストールします。
  - **一次情報**: 拡張機能の現行名は「WSL」（発行元 Microsoft、Unique Identifier: ms-vscode-remote.remote-wsl）。「Remote - WSL」は旧名で、公式ドキュメント・Marketplace のどちらにも現在は出てこない。手順は「拡張機能マーケットプレイスから『WSL』を検索してインストールします」に直す（識別子で確実に入れるなら code --install-extension ms-vscode-remote.remote-wsl）。
  - 出典: https://code.visualstudio.com/docs/remote/wsl
- **記述**: Remote - WSL (Windows のみ)
  - **一次情報**: 拡張機能の現在の表示名は「WSL」（識別子 ms-vscode-remote.remote-wsl）。旧称の「Remote - WSL」は公式ドキュメントから既に消えており、Marketplace のページタイトルも「WSL」。Windows 専用である点は正しいので、表記は「WSL（Windows のみ）」とし、必要なら「旧称 Remote - WSL」と補足するのが妥当。
  - 出典: https://code.visualstudio.com/docs/remote/wsl

### `git/github-actions/Reference.tsx`

- **記述**: actions/add-to-project@v1
  - **一次情報**: actions/add-to-project に `v1` という浮動メジャータグは存在しない。タグは v0.0.1〜v0.6.1、v1.0.0 / v1.0.1 / v1.0.2、v2 / v2.0.0 の計 18 件だけで、`v1` という名前のタグもブランチも無い（`releases/v1` ブランチはあるが `@v1` では解決しない）。このまま `uses: actions/add-to-project@v1` と書くと ref を解決できずジョブが失敗する。現行の書き方は `actions/add-to-project@v2`（最新リリース v2.0.0、2026-05-04）。v1 系を使いたい場合は `@v1.0.2` のようにパッチ版まで指定する。
  - 出典: https://api.github.com/repos/actions/add-to-project/git/ref/tags/v1
- **記述**: ubuntu-latest（22.04 相当）
  - **一次情報**: ubuntu-latest は Ubuntu 24.04 を指す（22.04 ではない）。ubuntu-22.04 は明示指定でのみ使える別ラベル。2026-08 時点で ubuntu-26.04 が public preview として併存する。表記は「ubuntu-latest（24.04 相当）」が正しい。
  - 出典: https://github.com/actions/runner-images/blob/main/README.md

### `git/github-actions/SecretsCd.tsx`

- **記述**: ログに出た秘密情報は、Actions が自動でマスク（***）します。 ただしこれは「登録した値と完全一致する文字列」に対してだけです。
  - **一次情報**: 「登録した値と完全一致する文字列に対してだけ」は両方向に誤り。(1) 対象は登録済みシークレットだけではない ─ 公式は「シークレットとして登録していないが機微と認識される情報」も自動的に伏せ字化すると明記し、Secrets reference に 32-byte / 64-byte Azure keys、Azure AD client app passwords、Azure Cache keys、Azure Container Registry keys、Azure Function host keys、Azure Search keys、Database connection strings 等の一覧がある。(2) 逆に、登録済みシークレットでも「値が変形されうる経路が複数あるため伏せ字化は保証されない」「ランナーは現在のジョブ内で使われたシークレットしか伏せ字化できない」とされ、完全一致していればマスクされるとも言い切れな
  - 出典: https://docs.github.com/en/actions/concepts/security/secrets
- **記述**: ワークフローには GITHUB_TOKEN という一時トークンが 自動で渡されます。これでコメント投稿やリリース作成などができますが、 既定の権限は広めです。
  - **一次情報**: 前半（各ジョブ開始時に GITHUB_TOKEN が自動生成・付与される）は正しいが、「既定の権限は広め」は現行仕様と食い違う。エンタープライズ／Organization の作成時期で既定が分かれ、公式は「Created on or after February 2, 2023 – Defaults to read-only access for all scopes.」「Created before February 2, 2023 – Defaults to read and write access for all scopes.」と明記する。個人アカウントの新規リポジトリは既定で contents と packages の read のみ。したがって 2023-02-02 以降に作られた組織・リポジトリでは既定は read-only であり、同リポジトリの Reference.tsx の記述（2023 年 2 月以降は既
  - 出典: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository

### `git/github-actions/SecretsPermissions.tsx`

- **記述**: classic トークンは repo のような粗いスコープで、 1 つで多くの操作ができてしまい強力すぎます。fine-grained は リポジトリと権限を個別に絞れ、期限も必須です。
  - **一次情報**: 「期限も必須です」は誤り。fine-grained personal access token は無期限（Infinite lifetimes）を選択でき、組織またはエンタープライズが最大有効期間ポリシーを設定している場合にのみブロックされる。トークン作成 URL のクエリパラメータ仕様でも `expires_in` は "Integer between 1 and 366, or `none`" / "Days until expiration or `none` for non-expiring. If not provided, the default is 30 days" と定義されており、無期限が許容されている。したがって同ページ内の「無期限も選べます」という記述の方が現行仕様と一致する。なお claim の前半（classic は粗いスコープで強力すぎる／fine-grained はリポジトリと権限を個別に絞れる）
  - 出典: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
- **記述**: 登録場所は リポジトリの Settings → Secrets and variables → Actions → New repository secret。名前（大文字英数と _）と値を 入れて保存します。
  - **一次情報**: 登録場所（Settings → Secrets and variables → Actions → New repository secret）は正しい。誤りは名前の規則。使えるのは英数字（小文字 [a-z] も可）と _ で、小文字で入力しても GitHub 側が大文字で保存し参照は大文字小文字を区別しない。加えて「数字で始められない」「GITHUB_ で始められない」という制約があり、これらを書かないと登録時に弾かれる原因が読者に分からない。「名前（英数字と _、数字始まり・GITHUB_ 始まりは不可。大文字で保存される）」が正確。
  - 出典: https://docs.github.com/en/actions/reference/secrets-reference

### `git/github/FirstRepo.tsx`

- **記述**: リポジトリ名は英数字、ハイフン、アンダースコアのみ使用可能です。
  - **一次情報**: リポジトリ名に使えるのは ASCII の英字・数字と `.` `-` `_` の 3 記号。ピリオドも使用できる。加えて 100 文字以内という長さ制限がある。
  - 出典: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- **記述**: テンプレートから「Vite」を選び、デフォルトのビルド手順を使う
  - **一次情報**: GitHub Pages の Source に GitHub Actions を選んだときに提示されるワークフローテンプレートは Astro / Gatsby / Hugo / Jekyll / GitHub Pages Jekyll / mdBook / Next.js / NuxtJS / Static HTML の 9 種で、「Vite」テンプレートは存在しない。Vite アプリを公開する場合は Static HTML テンプレートを起点にビルド手順（actions/checkout → ビルド → actions/upload-pages-artifact → actions/deploy-pages）を自分で書くか、カスタムワークフローを作る。
  - 出典: https://github.com/actions/starter-workflows/tree/main/pages

### `git/react/Modify.tsx`

- **記述**: Cursor の左パネルで、「src/App.js」をクリックして開いてください。
  - **一次情報**: Vite の react テンプレートが生成するのは `src/App.jsx` で、`src/App.js` は存在しない。前ページ（Setup.tsx）が `npm create vite@latest my-react-app -- --template react` を指示している以上、本文・git コマンド例・チャレンジのすべてを `src/App.jsx` に統一する必要がある（Modify.tsx:246 の「modified: src/App.js」、286 の `git add src/App.js`、440-441 のチャレンジ内 `git ___ src/App.js` も同様）。
  - 出典: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react/src
- **記述**: import logo from './logo.svg'; import './App.css'; function App() { return ( <div className="App"> <header className="App-header"> <img src={logo} className="Ap
  - **一次情報**: この編集前コードは Create React App の cra-template（packages/cra-template/template/src/App.js）そのもので、Vite の react テンプレートには `src/logo.svg` も `App` / `App-header` / `App-logo` クラスも存在しない。Vite 版の実際の冒頭は `import { useState } from 'react'` / `import reactLogo from './assets/react.svg'` / `import viteLogo from './assets/vite.svg'` / `import heroImg from './assets/hero.png'` / `import './App.css'` で、ロゴは `src/assets/` 配下にある。編集例は Vite テンプ
  - 出典: https://github.com/vitejs/vite/blob/main/packages/create-vite/template-react/src/App.jsx

### `react/cdd-flow/DesignCodeSync.tsx`

- **記述**: は、 Figma Variables を JSON 形式で export し、GitHub リポジトリに直接 push できるプラグインです。 Figma 上でトークンを変更すると、自動的に Pull Request が作成されます。
  - **一次情報**: GitHub を sync provider として JSON を push できるのは正しいが、「Figma 上でトークンを変更すると自動的に Pull Request が作成される」は誤り。push 自体がユーザーの明示操作（コミットメッセージを入力して Push changes を選択）であり、PR も自動生成されない。push 完了後にプラグインが Create a Pull Request を提案することがあり、そのボタンを押すと sync provider の Web ページがブラウザで開いて、そこで利用者が PR を作成する。押さずに閉じて複数のコミットをまとめてから PR にすることもできる。
  - 出典: https://docs.tokens.studio/token-storage/remote-push-pull-changes
- **記述**: Token Studio の Pro プランでは、GitHub リポジトリとの直接連携がサポートされています。 無料プランの場合は手動で JSON を export する必要があります。
  - **一次情報**: GitHub 連携（Git sync provider）自体は Pro 限定ではない。無料ライセンスでもプラグインの GitHub sync は使え、公式ドキュメントは単一 JSON ファイル（File path）での保存を「無料版を使っている場合」の選択肢として明示している。Pro Licence が必要なのはフォルダ＝複数ファイル同期（および Themes、ブランチ切り替え）で、無料ライセンスは既存フォルダに対して read-only になる。したがって「無料プランは手動で JSON を export する必要がある」は誤り。加えて、現在の tokens.studio/pricing に「Pro」という名称のプランは存在せず、Starter Plus（€17/mo）/ Essential（€169/mo）/ Organization（€499/mo）/ Enterprise の 4 プラン構成である。
  - 出典: https://docs.tokens.studio/token-storage/remote/sync-git-github

### `react/css-basics/CssPatterns.tsx`

- **記述**: CSS ネスティングは、2024年に全モダンブラウザでサポートされた新機能です。
  - **一次情報**: 全モダンブラウザで揃ったのは 2024 年ではなく 2023 年。Chrome 112（stable 2023-04-04）と Safari 16.5 が先行実装し、Firefox は 117（2023 年 8 月 29 日リリース）で対応。型セレクタを & なしでネストできる緩和構文まで含めても Chrome 120（stable 2023-12-05）と Safari 17.2（2023 年 12 月 11 日）で完了しており、いずれも 2023 年内。
  - 出典: https://www.mozilla.org/en-US/firefox/117.0/releasenotes/
- **記述**: @layer vendor { /* サードパーティライブラリの CSS を @import で読み込み */ @import url('react-datepicker/dist/react-datepicker.css'); }
  - **一次情報**: @layer のブロック内に @import は書けない（ブラウザに無視される）。レイヤーに入れて読み込むには、スタイルシート先頭で layer() 付きの @import を使う: `@import url('react-datepicker/dist/react-datepicker.css') layer(vendor);`。なお仕様が例外にしている「empty @layer definitions」は `@layer vendor, base;` のようなレイヤー宣言文のことで、`@layer vendor { ... }` のブロックは該当しない。
  - 出典: https://www.w3.org/TR/css-cascade-5/

### `react/css-basics/EmotionPage.tsx`

- **記述**: v6 で対応（限定的）
  - **一次情報**: styled-components の css prop は v6 ではなく v4 から提供されている。公式 API リファレンスの当該見出しは `<h3 id="css-prop"><code>css</code> prop <small>v4</small>` とバージョンバッジ v4 付きで出力されている。したがって表の記載は「v4 で対応（Babel / SWC プラグインが必要）」が正しい。「限定的」という但し書き自体は、上記のとおりプラグイン導入が前提である点で妥当。
  - 出典: https://styled-components.com/docs/api#css-prop
- **記述**: extractCritical が必要
  - **一次情報**: Emotion 10 / 11 では SSR に extractCritical は必須ではない。@emotion/react と @emotion/styled だけを使っているなら追加設定なしで renderToString / renderToNodeStream をそのまま呼べる（default approach、公式が「It's strongly recommended that you use the default approach unless you need nth child or similar selectors.」として推奨）。nth-child 等のセレクタが必要な advanced approach では createEmotionServer から extractCriticalToChunks + constructStyleTagsFromChunks を取り出して使うのが公式の例で、ext
  - 出典: https://raw.githubusercontent.com/emotion-js/emotion/main/docs/ssr.mdx

### `react/design-tokens/TokensPractice.tsx`

- **記述**: --color-primary: var(--color-primary);
  - **一次情報**: @theme（inline なし）で他の変数を参照してはいけない。しかも同名の自己参照 `--color-primary: var(--color-primary)` は、Tailwind がその宣言をそのまま `:root, :host` に出力するため、CSS 仕様上の循環参照になる。参照元は別名にし、inline を付ける。例: `:root { --brand-primary: #2563EB; }` + `@theme inline { --color-primary: var(--brand-primary); }`（この形なら `.bg-primary { background-color: var(--brand-primary) }` が生成される）。
  - 出典: https://tailwindcss.com/docs/theme
- **記述**: Material Design では、要素の「高さ（Elevation）」を 0dp から 24dp のスケールで表現します。
  - **一次情報**: 現行の Material Design 3 は elevation を「レベル 0〜5」で表し、対応する DP Height は 0dp / 1dp / 3dp / 6dp / 8dp / 12dp（M3 Elevation tokens ページの Component elevation 表）。上限は 12dp で 24dp は存在しない。0dp〜24dp のスケールは Material Design 2 のもので、M2 サイトは「Material 2 is no longer maintained. Upgrade to Material 3」と表示されるアーカイブ版（M2 の Default elevations 表で最大値が Dialog の 24）。教材で 0–24dp を使うなら「Material Design 2 では」と版を明示する必要がある。
  - 出典: https://m3.material.io/styles/elevation/tokens

### `react/hooks-deep/MemoCallback.tsx`

- **記述**: React 19 以降で利用可能: 既に Meta 社内（Instagram など）で使われており、 段階的にオープンソースとして公開されている
  - **一次情報**: 「React 19 以降で利用可能」が誤り。React Compiler は React 17 / 18 / 19 をサポートする。React 17・18 では `target` オプション（'17' / '18'）を指定し `react-compiler-runtime` パッケージを追加すればよい（React 19 は既定で追加ランタイム不要）。なお Meta 社内（Instagram / Quest Store / Facebook / Threads）での本番利用と、オープンソース公開自体は公式に確認できる。
  - 出典: https://react.dev/reference/react-compiler/target
- **記述**: React Compiler は React 19 以降で利用可能で、既にオープンソースとして公開されています。babel-plugin-react-compiler をインストールすることで導入できます。
  - **一次情報**: 「React 19 以降で利用可能」が誤り。React Compiler は React 17 / 18 / 19 に対応する（17・18 は `target` オプションと `react-compiler-runtime` パッケージが必要）。パッケージ名 `babel-plugin-react-compiler` とオープンソース公開済みである点は正しい。
  - 出典: https://react.dev/reference/react-compiler/target

### `react/nextjs-practice/Middleware.tsx`

- **記述**: ミドルウェアは Edge Runtime で実行されます。 Node.js のすべての API が使えるわけではありません。
  - **一次情報**: Middleware が Edge Runtime 固定だったのは Next.js 15.2 より前。Version history に「`v15.2.0` | Middleware can now use the Node.js runtime (experimental)」「`v15.5.0` | Middleware can now use the Node.js runtime (stable)」「`v16.0.0` | Middleware is deprecated and renamed to Proxy. Proxy defaults to the Node.js runtime」とあり、15.5 以降は Node.js ランタイムが stable、16 では `middleware` 自体が `proxy` に改称され既定が Node.js ランタイムになった（`npx @next/codemod@canary
  - 出典: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- **記述**: // 地域ベースのリダイレクト const country = request.geo?.country || 'JP';
  - **一次情報**: `NextRequest` の `geo`（および `ip`）は Next.js 15 で削除済み。よって `request.geo?.country` は常に undefined になり、この例は常にフォールバックの 'JP' を返す。Vercel なら `@vercel/functions` の `geolocation(request)` / `ipAddress(request)` を使う（公式ガイドのサンプル: `import { geolocation } from '@vercel/functions'` → `const { city } = geolocation(request)`）。他のホスティングではプロバイダが付与するヘッダを読む。
  - 出典: https://nextjs.org/docs/app/guides/upgrading/version-15

### `react/react19/React19Upgrade.tsx`

- **記述**: # forwardRef の解除 npx codemod@latest react/19/replace-reactdom-render
  - **一次情報**: レシピ名が用途と食い違っている。forwardRef を外す codemod は `react/19/remove-forward-ref`（`npx codemod react/19/remove-forward-ref --target <path>`）。`react/19/replace-reactdom-render` は ReactDOM.render() を createRoot(node).render() に置き換えるもので、forwardRef とは無関係。
  - 出典: https://github.com/reactjs/react-codemod
- **記述**: React 18 で非推奨だった createRoot().render() の第2引数（コールバック）が React 19 で完全に削除されました。
  - **一次情報**: 対象 API と削除されたバージョンの両方が誤り。コールバックは `createRoot().render()` の第 2 引数ではなく、旧 `ReactDOM.render(element, container, callback)` の第 3 引数。しかも削除は React 19 ではなく React 18 の時点で行われている（`createRoot().render()` は当初からコールバック引数を持たない）。React 19 で削除されたのは `ReactDOM.render` / `ReactDOM.hydrate` / `unmountComponentAtNode` / `ReactDOM.findDOMNode` などの API 本体。移行先は useEffect。
  - 出典: https://react.dev/blog/2022/03/08/react-18-upgrade-guide

### `react/storybook/SbAdvanced.tsx`

- **記述**: Storybook 8 は Vite をデフォルトのビルドツールとして採用。起動時間とリビルド速度が大幅に改善されました。Webpack も引き続きサポートされますが、新規プロジェクトでは Vite が推奨です。
  - **一次情報**: Storybook 8 は Vite をデフォルトのビルダーにしていない。v8 のドキュメントは Webpack builder を「the default builder for Storybook」と明記しており、どのビルダーが使われるかは init 時に選ばれる framework パッケージ（@storybook/react-vite か @storybook/react-webpack5 か等）で決まる。CLI は既存プロジェクトを検出して選ぶ。Storybook 8 の変更点は「Vite サポートの再設計と Vite 5 対応」であり、公式リリース記事に「Vite が既定」「新規プロジェクトには Vite を推奨」という記述は無い（記事にあるのは Vite が新規 Storybook プロジェクトの約半数を占めるという利用実績の話）。
  - 出典: https://storybook.js.org/docs/8/builders/webpack
- **記述**: Lazy compilation を活用する / Storybook 8 + Vite では、表示中のストーリーだけをコンパイルする Lazy compilation がデフォルトで有効です。ストーリー数が多くても起動時間への影響を最小限に抑えます。
  - **一次情報**: lazy compilation は Vite ビルダーの機能ではなく Webpack の実験的機能で、Storybook では Webpack builder のオプション lazyCompilation として明示的にオプトインするもの（既定は無効）。v8 の Vite builder ドキュメントには lazy compilation の記載が一切無い。Vite は開発時に素の ESM をリクエスト時変換する仕組みで速いが、それを Storybook が「Lazy compilation」という名前で既定有効にしている、という事実は確認できない。
  - 出典: https://storybook.js.org/docs/8/builders/webpack

### `ux-design/evaluation/UsabilityTesting.tsx`

- **記述**: ターゲットユーザーに近い人を集める。Jakob Nielsen の研究によると、5人のテストで約80%のユーザビリティ問題を発見できる。
  - **一次情報**: Nielsen 本人の記事が挙げる値は 85% であり「約 80%」ではない。同記事が示す Nielsen・Landauer のモデル N(1-(1-L)^n) に典型値 L=31% を入れると n=5 で 84.36% となり、記事の 85% と整合する（80% にはならない）。記事は残りについても「Also, the second study with 5 users will discover most of the remaining 15% of the original usability problems that were not found in the first round of testing.」と 15% を前提に書いている。加えて前提条件として「The formula only holds for comparable users who will be using the site in fairl
  - 出典: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- **記述**: 参加者数と問題発見率の関係（Nielsen/Landauer モデル）
  - **一次情報**: キャプションで「Nielsen/Landauer モデル」と明示しているのに、5 点のうち 3 点がモデル値と一致しない。L=31% で 1-(1-0.31)^n を計算すると n=1..5 は 31.00 / 52.39 / 67.15 / 77.33 / 84.36（%）。ページの値は 31 / 52 / 68 / 75 / 80 で、n=3 は 68→67、n=4 は 75→77、n=5 は 80→84 がモデル値。モデル名を掲げて図示するなら 31 / 52 / 67 / 77 / 84 に直す（NN/g 記事本文の「5 人で 85%」とも整合する）。
  - 出典: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/

### `PolicyChatQuota.tsx`

- **記述**: IP アドレス自体は 1 日のリセット後に消去されます
  - **一次情報**: 実装では IP アドレスをそもそも保存していないので「1 日のリセット後に消去される」という説明自体が成り立たない。sessionKey() が IP と User-Agent を SHA-256 でハッシュして先頭 32 桁だけを返し、Redis に入るキーは chat:<tier>:<sid>:<day>:requests / :tokens のように sid（ハッシュ）と日付のみで構成される。生 IP は extractClientIp() の戻り値としてリクエスト処理中のメモリ上に存在するだけで永続化されない。さらにキーの TTL は KEY_TTL_SECONDS = 172800 秒 = 48 時間で、consumeQuota() が毎リクエスト redis.expire(key, KEY_TTL_SECONDS) を呼ぶため最終アクセス時点から都度 48 時間へ延長される。UTC 0 時のリセットはキーの day 
  - 出典: https://raw.githubusercontent.com/BoxPistols/dev-album/main/api/lib/quota.ts

### `ai-ml/lmops/LmopsWorkflow.tsx`

- **記述**: from langchain_community.vectorstores import Chroma from langchain_community.embeddings import HuggingFaceEmbeddings
  - **一次情報**: どちらの import も非推奨。`from langchain_chroma import Chroma`（pip install langchain-chroma）と `from langchain_huggingface import HuggingFaceEmbeddings`（pip install langchain-huggingface）に置き換える。実行しても即エラーにはならないが LangChainDeprecationWarning が出る。
  - 出典: https://raw.githubusercontent.com/langchain-ai/langchain-community/main/libs/community/langchain_community/vectorstores/chroma.py

### `ai-ml/python-ml/PythonSetup.tsx`

- **記述**: セッションは一定時間で切断される（無料枠: 約90分）
  - **一次情報**: 公式 FAQ は idle timeout の具体値を公表していない（「Colab does not publish these limits」と明記し、時期によって変動するとしている）。無料枠について公式が示している唯一の数値は最大実行時間で、「In the version of Colab that is free of charge notebooks can run for at most 12 hours, depending on availability and your usage patterns.」。「約90分」は公式の記述ではないので、数値を出すなら「アイドル時に切断されることがあり、具体的な時間は公表されていない」と書くのが正確。
  - 出典: https://research.google.com/colaboratory/faq.html

### `api/build/MockServer.tsx`

- **記述**: Prism は、対象のパスに example が定義されていればそれを優先して返し、 example がなければ スキーマから値を動的に生成して返して返します。 つまり契約さえあれば、データを 1 件も書かなくてもモックは成立します。
  - **一次情報**: 「example があればそれを優先する」は正しいが、「example がなければスキーマから値を動的に生成する」は既定の挙動ではない。Prism の既定は static generation strategy で、example が無い場合はスキーマを辿って静的な値（default 値 → examples 配列の先頭 → nullable なら null → format 指定があればその format に応じた固定値 → いずれも無ければ string は 'string'、number は 0）を組み立てる。ランダム値を生成する dynamic モードは `prism mock -d api.oas3.yaml` か、リクエストに `Prefer: dynamic=true` を付けたときだけ有効になる。なお「契約さえあれば、データを 1 件も書かなくてもモックは成立する」という結論自体は static モードでも成り立
  - 出典: https://github.com/stoplightio/prism/blob/master/docs/guides/01-mocking.md

### `api/openapi/SwaggerUi.tsx`

- **記述**: # OpenAPI ファイルから 1 枚の静的 HTML を生成 npx @redocly/cli build-docs openapi.json -o docs/index.html # プレビュー用にローカルサーバで開く（実行機能はない） npx @redocly/cli preview-docs openapi.
  - **一次情報**: build-docs と -o は現行 CLI でも有効だが、preview-docs は現行の @redocly/cli（2.x）には存在しない。実際に `npx -y @redocly/cli@latest preview-docs openapi.json` を実行すると exit 1 で `Unknown arguments: preview-docs, openapi.json` になる（検証時のバージョン 2.46.1）。preview-docs は CLI 1.x のコマンドで、公式ドキュメントも /docs/cli/v1/commands/preview-docs（アーカイブ、Last updated 1 year ago）へリダイレクトされる。現行 2.x での代替は `preview`。1.x の挙動をそのまま使うなら `npx @redocly/cli@1 preview-docs openapi.json
  - 出典: https://redocly.com/docs/cli/commands

### `api/openapi/WhatIsOpenApi.tsx`

- **記述**: 元々この仕様は「Swagger 仕様」と呼ばれていました。 2015 年に仕様が OpenAPI Initiative（Linux Foundation 傘下）に寄贈され、 バージョン 3.0 から名称が「OpenAPI Specification」に改称されました。 つまり 2.0 までが Swagger、3.0 以
  - **一次情報**: 寄贈が 2015 年（SmartBear Software による）で OpenAPI Initiative が Linux Foundation のプロジェクトである点は正しいが、「バージョン 3.0 から改称」「2.0 までが Swagger、3.0 以降が OpenAPI」は誤り。改称は既存の 2.0 仕様そのものに遡って適用された。2.0 は現在 OAI の公式サイトで「OpenAPI Specification v2.0」として公開されており、バージョン境界で名前が切り替わるわけではない。3.0.0 のリリースは 2017 年で、改称（2016 年公表）とは別の出来事。
  - 出典: https://spec.openapis.org/oas/v2.0.html

### `claude-mux/agent-extensions/Subagents.tsx`

- **記述**: Claude Codeは Agent ツールを使用してサブエージェントを動的に生成します。各サブエージェントは独自のコンテキストウィンドウで実行されるため、メインの会話コンテキストを消費しません。
  - **一次情報**: 「Agent ツールで生成される」「各サブエージェントは独自のコンテキストウィンドウで実行される」までは正しいが、「メインの会話コンテキストを消費しません」は言い過ぎ。一次情報は、サブエージェントの作業（ファイル読み込み・検索結果・ログ）はメイン文脈に入らない一方で、最終的な要約はメインのコンテキストへ返ると明記している（sub-agents: "the subagent does that work in its own context and returns only the summary"、context-window: "Only the subagent's final text response comes back to your context, plus a small metadata trailer with token counts and duration."）。正しくは「途中の作業はメイン文脈を消費
  - 出典: https://code.claude.com/docs/en/sub-agents

### `claude-mux/ai-coding-agents/OpenAiCodex.tsx`

- **記述**: 公式の料金ページでは、Plus プラン（月額 $20）で 5 時間あたりおよそ 15〜80 メッセージ（既定モデル利用時）が目安と されている。Pro プランはその 5 倍・20 倍のティアがある。
  - **一次情報**: Plus が月額 $20 であること、Pro が「Choose 5x or 20x higher rate limits than Plus.」（$100/月 の 5x ティアと $200/月 の 20x ティア）であることは料金ページどおり。ただし「15〜80 メッセージ（既定モデル利用時）」は誤り。料金ページの上限はモデル別に列挙されており、15-80 は GPT-5.5 の行の値。現在 Plus の説明で前面に出ているのは GPT-5.6 ファミリ（「The GPT-5.6 model family, including Sol, Terra, and Luna」）で、その Plus 行は Sol 10-100 / Terra 25-200 / Luna 250-2,000。加えて料金ページ自体は「既定モデル」を一切明示していない（全文で default はプライバシー文脈の 3 箇所のみ）ので、「既定モデル利用時」という
  - 出典: https://learn.chatgpt.com/docs/pricing

### `claude-mux/best-practices/HarnessEngineering.tsx`

- **記述**: Verify / hooks（25 lifecycle）/ Bash テスト実行 / Plan Mode
  - **一次情報**: hook のライフサイクルイベントは 25 ではなく、公式 Hooks リファレンスの「Hook lifecycle」表が列挙するのは 31 件（2026-08-16 時点、上記 quote の一覧）。イベント数はバージョンで増減するため、教材に固定値を書かず「公式リファレンスの Hook lifecycle 表を参照」とするのが安全。
  - 出典: https://code.claude.com/docs/en/hooks

### `claude-mux/cicd-headless/GitHubActions.tsx`

- **記述**: anthropic_api_key / Anthropic API キー（必須）、direct_prompt / 直接プロンプトを指定して実行（レビュー指示など）、allowed_tools / 許可するツールのカンマ区切りリスト、disallowed_tools / 禁止するツールのカンマ区切りリスト、max_tur
  - **一次情報**: v1 で実在する入力は anthropic_api_key（"Anthropic API key (required for direct API, not needed for Bedrock/Vertex/Foundry)" — Bedrock/Vertex/Foundry 利用時は不要なので「必須」も不正確）と、prompt / claude_args / settings 等。direct_prompt・allowed_tools・disallowed_tools・max_turns・custom_instructions・timeout_minutes は v1 の action.yml に存在せず、いずれも廃止済み。置き換え先は direct_prompt → prompt、custom_instructions → claude_args: --append-system-prompt、max_turns → cl
  - 出典: https://github.com/anthropics/claude-code-action/blob/main/docs/migration-guide.md

### `claude-mux/claude-core/SecurityPermissions.tsx`

- **記述**: default / acceptEdits / plan / auto（分類器モデルが各操作を安全確認しつつ、ルーチンの確認プロンプトを省略。長時間タスク向け（research preview）） / dontAsk（事前に許可されたツール以外は自動拒否。CI/CD環境向け） / bypassPermissions
  - **一次情報**: 6 つのモード名（default / acceptEdits / plan / auto / dontAsk / bypassPermissions）と、auto の「分類器モデルが確認しルーチンのプロンプトを省略」「長時間タスク向け」、dontAsk の「事前許可ツール以外は自動拒否」「CI 向け」はすべて正しい。誤りは auto に付した「（research preview）」の一語。現行ドキュメントに research preview / beta の記載はなく、逆に auto mode は Pro / Max / Team プランで「built-in starting mode（組み込みの既定開始モード）」と明記されている。この括弧書きを削除し、必要なら「Pro / Max / Team プランでは既定の開始モード」に置き換えるべき。
  - 出典: https://code.claude.com/docs/en/permission-modes

### `claude-mux/claude-core/TokenOptimization.tsx`

- **記述**: # 自動コンパクションの発動閾値（1-100%）を変更。低い値ほど早めに圧縮 $ export CLAUDE_CODE_AUTOCOMPACT_PCT_OVERRIDE=80
  - **一次情報**: 環境変数名が誤り。正しくは `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`（`CODE_` は入らない）。`CLAUDE_CODE_AUTOCOMPACT_PCT_OVERRIDE` はドキュメントに存在せず、設定しても無視される。「1-100%」「低い値ほど早く圧縮」は正しいが、追加で 2 点の注記が必要：(1) 閾値を上げることはできず、既定値を上回る値（例示の 80）は無視される、(2) 「モデルのコンテキスト上限より前にコンパクションするセッション」でのみ有効。正しい例は `export CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50`。
  - 出典: https://code.claude.com/docs/en/env-vars

### `claude-mux/cmux/CmuxAgentTeams.tsx`

- **記述**: Claude Code の teammate モードは、1 つの親セッションから複数の子セッション（teammate）を起動して、 タスクを並列に進めるための仕組み。レビュー担当・実装担当・テスト担当のようにロールを分けて運用する。
  - **一次情報**: 公式ドキュメントに「teammate モード」という機能名は存在しない。該当する機能名は「agent teams（エージェントチーム）」で、専用ページは https://code.claude.com/docs/en/agent-teams 。並列実行の説明自体（1 セッションが team lead となり複数の teammate を起動する／役割を分けて運用する）は agent teams の記述と整合するが、教材は決定的な前提を落としている: agent teams は experimental かつ既定で無効で、`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` を settings.json か環境変数に設定しない限り teammate は一切起動しない。また teammate は「子セッション」ではなく独立した Claude Code インスタンスで、lead を介さず直接やり取りできる点
  - 出典: https://code.claude.com/docs/en/agent-teams

### `claude-mux/cmux/CmuxBrowserAPI.tsx`

- **記述**: # 2. ブラウザペインを右に分割して URL に移動 cmux browser open-split right cmux browser goto http://localhost:5173
  - **一次情報**: `cmux browser open-split` の位置引数は分割方向ではなく URL。実機の `cmux browser --help` は `open|open-split|new [url] [--workspace <id|ref|index>] [--window <id|ref|index>] [--focus <true|false>]` と表示する。したがって `cmux browser open-split right` は「right という URL を開け」と解釈され、右分割にはならない。方向を指定して右にブラウザペインを開くなら `cmux new-pane --type browser --direction right --url http://localhost:5173`（実機 --help: `new-pane [--type <terminal|browser>] [--direction 
  - 出典: https://cmux.com/docs/browser-automation

### `claude-mux/getting-started/Welcome.tsx`

- **記述**: ターミナルの基本的なコマンド（ls, cd, mkdir 等）の知識があることを前提としています。Node.js 18 以上と Git がインストールされている環境を推奨します。
  - **一次情報**: Node.js のバージョン要件は 18 以上ではなく 22 以上。npm パッケージ `@anthropic-ai/claude-code` の engines は `{ node: '>=22.0.0' }`（npm view で実測、version 2.1.233 時点）。さらに公式の System requirements には Node.js 自体が列挙されていない（OS / 4GB+ RAM / ネットワーク / シェル / 対応国のみ）。npm 以外の標準インストーラはネイティブバイナリを入れるため Node.js は不要で、npm 経由で入れた場合も「The installed `claude` binary does not itself invoke Node.」と明記されている。Git も必須ではなく、Windows で Bash ツールを使うために Git for Windows が推奨される（"Inst
  - 出典: https://code.claude.com/docs/en/setup

### `claude-mux/reference/ClaudeCheatsheet.tsx`

- **記述**: 読み込み順: グローバル → プロジェクトルート → サブディレクトリ（深い階層が優先）。
  - **一次情報**: 起動時に全文読み込まれるのは、作業ディレクトリとその上位階層にある CLAUDE.md / CLAUDE.local.md（管理ポリシー → ユーザー（~/.claude/CLAUDE.md） → プロジェクト → ローカル、の順で広い範囲から狭い範囲へ）まで。サブディレクトリの CLAUDE.md は起動時の読み込み順に含まれず、Claude がそのディレクトリのファイルを読んだ時点で遅延読み込みされる。また各ファイルは上書きではなく連結されるため「深い階層が優先」という優先順位はない（正しくは「ファイルシステムのルート側から作業ディレクトリ側へ順に連結され、作業ディレクトリに近いものが最後に読まれる」）。
  - 出典: https://code.claude.com/docs/en/memory

### `git/ai-agent/CursorCline.tsx`

- **記述**: 月50回のプレミアムリクエスト + コード補完が無料で使える
  - **一次情報**: 現行の Cursor 無料プラン（Hobby）の記載は「No credit card required / Limited Agent requests / Access to Composer」の3点のみで、月50回という回数は公表されていない。「premium request」という単位自体が現行の料金体系から無くなっており、cursor.com/help/models-and-usage/usage-limits は回数制を legacy request-based plans と呼び、現行プランは使用量（クレジット枠）ベースだと説明している。
  - 出典: https://cursor.com/pricing

### `git/flow-automation/Templates.tsx`

- **記述**: blank_issues_enabled: false が白紙起票を隠すのは、Read / Triage 権限の投稿者に対してです。 Write 以上の権限を持つメンテナー には「メンテナーは空の Issue を作成できます」という導線が残ります。
  - **一次情報**: 権限境界の説明（Read / Triage には出ず、Write / Maintain / Admin には残る）は正しい。誤っているのは表示文言。公式ドキュメントが記載する導線は「空の Issue を作成できます」といった文ではなく、テンプレート選択画面に残る **Blank issue** の選択肢に付く **Maintainers only** というラベル（日本語版 docs.github.com/ja では「メンテナンスのみ」）。「メンテナーは空の Issue を作成できます」という文言は一次情報に存在しない。
  - 出典: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository

### `git/github-actions/Intro.tsx`

- **記述**: Linux は 1 倍ですが、Windows は 2 倍、macOS は 10 倍の速さで 分を消費します。同じ 10 分のジョブでも、macOS では 100 分ぶん減ります。
  - **一次情報**: 現行の GitHub ドキュメントは OS 別の「倍率（1x / 2x / 10x）」を公開していない。標準 GitHub-hosted ランナーは分単価（USD）で示され、Linux 2-core (x64) $0.006 / Windows 2-core (x64) $0.010 / macOS 3-4-core $0.062。Linux 比では Windows 約 1.67 倍、macOS 約 10.3 倍で、「Windows 2 倍」は現行レートと一致しない。無料枠の消費もこの list price に基づくため、macOS 10 分ジョブは Linux 換算で約 103 分相当（ちょうど 100 分ではない）。なお旧ページ /billing/reference/actions-minute-multipliers（Actions minute multiplier reference）は 2025-10-30 のコミッ
  - 出典: https://docs.github.com/en/billing/reference/actions-runner-pricing

### `git/github/Markdown.tsx`

- **記述**: Slack は独自の記法を持っており、標準の Markdown とは書き方が異なる部分がある（例：太字は *テキスト* ではなく独自の方式）
  - **一次情報**: 前半（Slack は mrkdwn という独自記法を持ち、標準 Markdown と書き方が異なる）は正しいが、括弧内の例が逆になっている。Slack の太字はまさに *テキスト*（アスタリスク 1 個で囲む）である。標準 Markdown（CommonMark / GFM）側が **テキスト**（アスタリスク 2 個）で、*テキスト* は斜体になる。差分を正しく示すなら「太字は標準 Markdown の **テキスト** ではなく *テキスト*、斜体は *テキスト* ではなく _テキスト_」と書くべき。
  - 出典: https://docs.slack.dev/messaging/formatting-message-text/

### `infra/aws/CostOps.tsx`

- **記述**: 仕様では「12 か月無料」「毎月一定量まで無料」 といった枠が定義されています。
  - **一次情報**: 現行の AWS 無料利用枠に「12 か月無料」の枠は定義されていない。現行 Terms（Last Updated: July 9, 2025）が定義するのは Free Plan / Paid Plan で、「Free Plan accounts will expire (1) six months from the date you opened your account, or (2) once you have exhausted your Free Tier Credits, whichever comes first (the "Free Plan Period").」（6 か月または $200 クレジット消尽まで）。https://aws.amazon.com/free/ が挙げる枠も Free plan / Paid plan / Short-term trial / Always free の 4 つで、「12 m
  - 出典: https://aws.amazon.com/free/terms/

### `infra/database/ServerlessDb.tsx`

- **記述**: Cloudflare Workers のようなエッジランタイムは、生の TCP ソケットを扱えないことがあります。
  - **一次情報**: Cloudflare Workers は connect() API で外向きの生 TCP ソケットを扱える。同ページは「These application-layer protocols, including SSH, MQTT, SMTP, FTP, IRC, and most database wire protocols including MySQL, PostgreSQL, MongoDB, require an underlying TCP socket API in order to work.」として DB のワイヤプロトコルを想定用途に挙げており、Workers を「TCP を扱えない環境」の例に置くのは現行仕様と食い違う。実際に残る制約は (1)「Support for handling inbound TCP connections is coming soon. Currently, it is not
  - 出典: https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/

### `infra/foundations/ComputeModels.tsx`

- **記述**: { "functions": { "api/geo.ts": { "runtime": "edge", "memory": 128 } } }
  - **一次情報**: vercel.json の `functions.<glob>.runtime` は「ランタイムの npm パッケージ名（バージョン込み）」を取る項目で、公式の用例も `"runtime": "vercel-php@0.5.2"` のようなコミュニティランタイム指定である。`"edge"` は有効な値ではない。Edge ランタイムを使う場合は関数ファイル側で `export const config = { runtime: 'edge' };` を書く（https://vercel.com/docs/functions/runtimes/edge）。また `memory` は Fluid compute 有効時は vercel.json では設定できず、ダッシュボードの Functions セクションで既定メモリ/CPU サイズを設定する。加えて公式は現在 edge から Node.js への移行を推奨しており、Next.js
  - 出典: https://vercel.com/docs/project-configuration/vercel-json

### `react/architecture/DesignSystem.tsx`

- **記述**: CLAUDE.md をエントリーポイントとし、76 の禁止パターン、120+ のセマンティックトークン、 MCP サーバーによるトークン検証を備えている。
  - **一次情報**: melta UI サイトの記載と、エントリーポイントも件数も食い違う。(1) AI が最初に読むエントリーポイントは CLAUDE.md ではなく DESIGN.md（サイト記載「DESIGN.md: AIが最初に読むデザイン憲法」「Layer 1: 憲法 DESIGN.md — AI が最初に読む入口」。CLAUDE.md は「Claude Code の作業手順書」）。(2) 禁止パターンは 76 ではなく 106 ルール（「106ルールの禁止パターンで「やってはいけないこと」を明示」「rules.json: 106ルールの禁止パターン registry（機械検出可能）」）。(3) セマンティックトークンは 120+ ではなく 101 トークン（＋40 contract）（「tokens.json + contracts/: 101 トークン + 40 contract の機械可読仕様」）。なお「MCP サーバーによるトークン
  - 出典: https://melta.tsubotax.com/

### `react/cdd-flow/DesignQA.tsx`

- **記述**: Chromatic のレビュー権限は「Developer」と「Reviewer」の 2 種類があります。
  - **一次情報**: プロジェクトロールは Owner / Developer / Reviewer / Viewer の 4 種類。権限は組織（organization）とプロジェクト（project）の 2 層に分かれており、組織ロールは Enterprise プランの Teams を使わない限り member のみ。レビュー・承認に関わるのは Owner・Developer・Reviewer で、Viewer は読み取り専用。
  - 出典: https://www.chromatic.com/docs/collaborators/

### `react/css-basics/PlainCss.tsx`

- **記述**: vite-plugin-css-modules-dts を使えば、 Vite のビルドプロセスに統合して型定義を自動生成することもできます。
  - **一次情報**: npm レジストリに vite-plugin-css-modules-dts というパッケージは存在しない（GET https://registry.npmjs.org/vite-plugin-css-modules-dts が 404）。npm 検索でも同名パッケージはヒットしない。CSS Modules の型定義を Vite で自動生成する実在パッケージは `vite-plugin-sass-dts`（1.3.37、説明: "A plugin that automatically creates a type file when using the css module type-safely."）や、同ページが既に紹介している `typed-css-modules`（tcm、実在）。なお `vite-plugin-css-modules` という別名のパッケージは存在するが v0.0.1 で用途が異なり（説明: "vite
  - 出典: https://registry.npmjs.org/vite-plugin-css-modules-dts

### `react/css-layout/CssGrid.tsx`

- **記述**: 2024年以降、主要ブラウザ（Chrome 117+, Firefox 71+, Safari 16+, Edge 117+）で subgrid がサポートされています。
  - **一次情報**: バージョン番号 4 つ（Chrome 117 / Firefox 71 / Safari 16 / Edge 117）はいずれも正しい。誤りは年で、主要ブラウザが出揃ったのは 2024 年ではなく 2023 年 9 月。最後発の Chrome/Edge 117 は Chromium Dash 上で early_stable が 2023-09-06、late_stable_date が 2023-09-19。Firefox 71 は 2019 年 12 月、Safari 16 は 2022 年 9 月。したがって「2023 年 9 月以降、主要ブラウザで subgrid がサポートされています」が正しい。
  - 出典: https://github.com/mdn/browser-compat-data/blob/main/css/properties/grid-template-columns.json

### `react/deploy/Vercel.tsx`

- **記述**: 月間 100GB の帯域幅、無制限のデプロイ、自動 HTTPS が含まれます。
  - **一次情報**: Hobby プランの月間 Fast Data Transfer 100 GB は正しく（/docs/limits の Usage summary に「| Fast Data Transfer | 100 GB | 1 TB |」）、SSL/HTTPS も自動で付与される。しかし「無制限のデプロイ」は誤り。Hobby は 1 日あたり 100 デプロイが上限（/docs/limits の General limits に「| Deployments Created per Day | 100 | 6000 | Custom |」、本文にも「You are able to deploy `100` times every `86400` seconds (1 day).」）。加えてビルドは 1 時間 100 件、同時デプロイは 1 件に制限される。また Hobby は fair use guidelines により非商用・個人利用に
  - 出典: https://vercel.com/docs/plans/hobby

### `react/design-tokens/WhyDarkMode.tsx`

- **記述**: Elevation 0 = #1C1B1F、Elevation 1 = #2B2930 のように段階的に変化する
  - **一次情報**: 現行 M3 ベースラインの dark では surface = Neutral6 = rgb(20,18,24) = #141218 であり、#1C1B1F は現行パレットに存在しない（旧 M3 ベースラインの neutral10 相当）。#2B2930 は Neutral17 = Surface Container High というサーフェスロールの値であって「Elevation 1」の色ではない。M3 では elevation はレベル 0〜5 のトークンで表され、色は surface container 系ロール（Surface Container Lowest/Low/…/Highest）で表現する。elevation に色を重ねる surface tint 方式自体、M3 の Elevation tokens ページで「Surface tint color is deprecated. Use elevation le
  - 出典: https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ColorDarkTokens.kt

### `react/mui/MuiIntro.tsx`

- **記述**: ブレイクポイント値は xs: 444px / sm: 600px / md: 900px / lg: 1200px / xl: 1536px です。
  - **一次情報**: MUI の既定ブレイクポイント値は xs: 0 / sm: 600 / md: 900 / lg: 1200 / xl: 1536（px）で、xs は 444px ではなく 0。444px は Container の maxWidth="xs" のときだけ適用される特別扱いの値で、@mui/system の Container 実装が `maxWidth: Math.max(theme.breakpoints.values.xs, 444)` としているために生じる。したがって「Container の maxWidth は xs: 444px / sm: 600px / md: 900px / lg: 1200px / xl: 1536px（xs のみブレイクポイント値ではなく 444px 固定）」と書き分けるのが正しい。
  - 出典: https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-system/src/createBreakpoints/createBreakpoints.ts

### `react/nextjs-basics/ProjectSetup.tsx`

- **記述**: # ✔ Would you like your code inside a `src/` directory? → Yes # ✔ Would you like to use App Router? (recommended) → Yes # ✔ Would you like to use Turbopack for 
  - **一次情報**: 現行の create-next-app (16.3.1) では「Would you like to use Turbopack for next dev?」という対話プロンプトは存在しない。Turbopack は既定のバンドラで、`--turbopack` / `--webpack` フラグで切り替える（docs のオプション表: 「`--turbopack` | Force enable Turbopack in generated package.json (enabled by default)」）。また対話はまず「Would you like to use the recommended Next.js defaults?」を尋ね、`No, customize settings` を選んだ場合にのみ個別質問が出る。`src/` ディレクトリと App Router の 2 問は現存し、文言も一致する。
  - 出典: https://nextjs.org/docs/app/api-reference/cli/create-next-app

### `react/nextjs-css/CssModulesSc.tsx`

- **記述**: npm install -D @types/styled-components
  - **一次情報**: styled-components v6 以降は型定義を同梱しているため @types/styled-components は不要で、公式移行ガイドは逆に `npm uninstall @types/styled-components` を指示している。同ガイドは「As styled-components now provides its own types, there's no longer a need for community ones.」と明記。教材のコードブロックは直前で `npm install styled-components`（=最新 v6 系）を実行しているため、続けて @types を入れると v5 向けの型が v6 の同梱型と衝突する。正しくは `npm install styled-components` のみ。
  - 出典: https://raw.githubusercontent.com/styled-components/styled-components-website/main/sections/faqs/migration-v6.mdx

### `react/nextjs-practice/Optimization.tsx`

- **記述**: // データを取得（fetch はデフォルトでキャッシュされるため、 // ページコンポーネントでの fetch と重複しても問題ない）
  - **一次情報**: Next.js 15 以降、fetch はデフォルトでキャッシュされない。キャッシュするには `cache: 'force-cache'` を明示するか、セグメント設定 `export const fetchCache = 'default-cache'` を使う。なお「重複しても問題ない」という結論自体は Data Cache ではなく memoization（同一レンダーパス内で同一 URL・オプションの GET fetch を 1 回にまとめる仕組み）で説明すべき。ただし現行 fetch リファレンスの memoization 対象の列挙は「Server Components, layouts, pages, `generateStaticParams` and `generateViewport`」で generateMetadata が含まれていないため、generateMetadata が memoization 対
  - 出典: https://nextjs.org/docs/app/guides/upgrading/version-15

### `react/nextjs-server/DataFetching.tsx`

- **記述**: // 1. デフォルト: キャッシュなし（Next.js 15 以降） // Next.js 15 では fetch はデフォルトでキャッシュされない（no-store 相当）
  - **一次情報**: 前半「Next.js 15 以降 fetch はデフォルトでキャッシュされない」は正しい（アップグレードガイド: 「`fetch` requests are no longer cached by default.」）。誤りは括弧内の「no-store 相当」。公式リファレンスは既定を `auto no cache` と呼び、`no-store` とは別項目として定義している。既定では開発時は毎リクエスト取得するが、ルートが静的プリレンダリングされる場合は `next build` 時に 1 回だけ取得され以後は再取得されない。`no-store` は Request-time API が無くても毎リクエスト取得する。学習者が「既定 = no-store」と覚えるとビルド時 1 回取得の挙動に遭遇して混乱する。
  - 出典: https://nextjs.org/docs/app/api-reference/functions/fetch

### `react/practice-app/Routing.tsx`

- **記述**: React Router v7 をインストールし、基本的なルーティングを設定しましょう。
  - **一次情報**: パッケージ名と import 経路は v7 として正しい（v7 で react-router-dom は react-router に統合され、公式アップグレード手順も「In v7 we no longer need "react-router-dom" as the packages have been simplified. You can import everything from "react-router":」「Note you only need "react-router" in your package.json.」と記載）。誤っているのはバージョンの方で、現在 npm の dist-tags は latest=8.3.0（version-7=7.18.2）のため、直後の `pnpm add react-router` では v7 ではなく v8.3.0 が入る。v7 を入れるなら `pnpm add reac
  - 出典: https://github.com/remix-run/react-router/blob/main/docs/upgrading/v7.md

### `react/react19/React19Features.tsx`

- **記述**: React Compiler は React 19 とともにリリースされましたが、v1.0 安定版がリリースされています。小規模なプロジェクトから段階的に導入し、動作を検証しながら範囲を広げることを推奨します。
  - **一次情報**: 「React 19 とともにリリースされた」が誤り。React 19 の一般提供は 2024-12-05（https://react.dev/blog/2024/12/05/react-19）、React Compiler はその時点ではベータ（2024-10-21 公開）で、v1.0 安定版は約 10 か月後の 2025-10-07 に単独でリリースされた。React 19 とは別リリースサイクル。「v1.0 安定版がリリースされている」ことと「段階的導入の推奨」は正しい。
  - 出典: https://react.dev/blog/2025/10/07/react-compiler-1

### `react/storybook/SbSetup.tsx`

- **記述**: Storybook は react-docgen-typescript を使って TypeScript のインターフェースから Props テーブルを自動生成します。
  - **一次情報**: Storybook 8 の既定の docgen は react-docgen（@storybook/react がインストールされている場合）。react-docgen-typescript は既定ではなく、.storybook/main.ts で typescript.reactDocgen: 'react-docgen-typescript' を明示したときだけ使われる。SbSetup.tsx は 243 行の main.ts サンプルでこの設定を書いているので、874-880 行の InfoBox は「この設定をした場合」と条件を付けるか、既定は react-docgen である旨を添えるのが正確。
  - 出典: https://storybook.js.org/docs/8/api/main-config/main-config-typescript

### `react/ui-patterns/DialogPatterns.tsx`

- **記述**: アクセシビリティ対応の観点では、ネイティブ <dialog> + showModal() を使うのが最も確実です。（中略）ライブラリを使う場合でも、内部で <dialog> を使っているもの（Radix UI Dialog など）を選ぶことを推奨します。
  - **一次情報**: Radix UI Dialog はネイティブ <dialog> 要素も showModal() も使っていない。DialogContentImpl は FocusScope（trapped）でフォーカストラップを自前実装し、role="dialog" と aria-labelledby / aria-describedby を付けた DismissableLayer（既定は Primitive.div）を Portal 経由で描画する。WAI-ARIA の Dialog パターンに沿ったアクセシブルな実装ではあるが、「内部で <dialog> を使っているものを選ぶ」という推奨の例として Radix UI Dialog を挙げるのは誤り。ライブラリ選定の根拠にするなら「ネイティブ dialog を使っているか」ではなく「フォーカス管理・aria 属性・ESC/外側クリックの扱いが実装されているか」で書くのが正確。
  - 出典: https://github.com/radix-ui/primitives/blob/main/packages/react/dialog/src/dialog.tsx

### `react/web-quality/WebEthics.tsx`

- **記述**: デジタル庁は「ウェブアクセシビリティ導入ガイドブック」を公開しており、公共機関の Web サイトでは WCAG 2.1 AA 以上の準拠が実質的な要件です。
  - **一次情報**: 前半（デジタル庁が「ウェブアクセシビリティ導入ガイドブック」を公開している）は事実で、最終更新 2025 年 10 月 16 日、同日付でデジタル社会推進標準ガイドラインに Informative 文書として編入されている。誤りは後半で、実質的な要件は WCAG 2.1 AA ではなく JIS X 8341-3:2016 の適合レベル AA。同ガイドブックは政府調達の標準を「JIS X 8341-3:2016 の AA 準拠」と明記し、JIS X 8341-3 の一致規格は WCAG 2.0 のままだと述べている（WCAG 2.0 は ISO/IEC 40500:2012 として国際規格化）。WCAG 2.1 / 2.2 は「スマートフォンでサービスにアクセスする利用者が過半数を占めることが多くなっていることを考えれば、WCAG 2.1 や 2.2 などのより新しい基準にも対応することを検討しておく必要があります」という推奨・検
  - 出典: https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/08ed88e1-d622-43cb-900b-84957ab87826/bf5f4482/20251016_introduction_to_web_accessibility.pdf

### `threejs/applied/textures.tsx`

- **記述**: テクスチャのサイズは 2 のべき乗（256, 512, 1024, 2048 など）が推奨です。 2 のべき乗でないサイズを使うと、GPU がリサイズ処理を行うためパフォーマンスに影響します。
  - **一次情報**: 現行の three.js は WebGL2 専用（r163 で WebGL1 サポートを削除: three.js Migration Guide「r162 → r163 / WebGLRenderer no longer supports WebGL 1.」）であり、WebGL 2.0 仕様上、NPOT テクスチャに特別な制限はなく、ミップマップも全ラップモードも使える。「2 のべき乗でないと GPU がリサイズ処理を行う」という挙動は WebGL / three.js のどの一次情報にも記載がない。POT が実質必須だったのは WebGL1 で、その場合も GPU がリサイズするのではなく、MDN の記述どおり「ミップマップを生成できず、ラップモードを CLAMP_TO_EDGE にしなければならない」という制約（three.js の WebGL1 バックエンドは canvas 経由で CPU 側リサイズしていた）。
  - 出典: https://registry.khronos.org/webgl/specs/latest/2.0/

### `ux-design/ia-wireframe/InformationArchitecture.tsx`

- **記述**: トップから目的のページまで 3 クリック以内で到達できる構造が理想的とされる。階層が深くなるほどユーザーの離脱率が上がるため、カテゴリの分け方を工夫して階層を浅く保つ。
  - **一次情報**: NN/g の記事タイトルは「The 3-Click Rule for Navigation Is False」で、要約は「While it is important to keep key information easily accessible, the 3-click rule is an arbitrary rule of thumb that is not backed by data.」。特に本文が理由として挙げる「階層が深くなるほどユーザーの離脱率が上がる」という因果は、引用元研究で明示的に否定されている（3 クリックを超えても dropoff は増えず満足度も下がらない）。さらに同記事は「in practice this means that many designers have to choose between two UX myths (neither supported by data): either
  - 出典: https://www.nngroup.com/articles/3-click-rule/

### `ux-design/prototyping/FigmaPrototype.tsx`

- **記述**: Figma の Dev Mode では、CSS の他に Tailwind CSS のクラス名を直接出力できます。プロジェクトで Tailwind を使っている場合は、この出力をそのまま活用すると効率的です。
  - **一次情報**: Dev Mode が標準で出力できるのは CSS (Web) / SwiftUI・UIKit (iOS) / Compose・XML (Android) のみで、Tailwind CSS のクラス名は標準の Language ドロップダウンに含まれない。Tailwind 形式の出力は codegen プラグイン（Dev Mode プラグイン）を導入して初めて可能になる。公式ヘルプ「Guide to Dev Mode」の「Use Dev Mode plugins」節も、プラグインの用途として「Customize code output (for Tailwind or React) or for your own code components」と記載しており、Tailwind はプラグイン前提。教材には「プラグイン導入が必要」と明記する必要がある。
  - 出典: https://help.figma.com/hc/en-us/articles/15023202277399-Use-code-snippets-in-Dev-Mode

### `ux-design/research/UserResearch.tsx`

- **記述**: Google Optimize / Optimizely / LaunchDarkly
  - **一次情報**: Google Optimize は 2023-09-30 に提供終了しており、現行の A/B テストツールとして列挙できない。列挙から外す(例: 'Optimizely / VWO / LaunchDarkly')か、残すなら「2023 年提供終了」と明記する。Optimizely と LaunchDarkly は 2026-08-16 時点で現行。
  - 出典: https://support.google.com/analytics/answer/12979939

### `ux-design/ui-design/VisualDesign.tsx`

- **記述**: 4.5 : 1 通常テキスト（AA）18px 未満のテキスト / 3 : 1 大きなテキスト（AA）18px 以上 or 14px 太字 / 7 : 1 通常テキスト（AAA）最も厳格な基準
  - **一次情報**: 閾値の単位が pt と px で取り違えられている。WCAG の large-scale text は「18 ポイント以上、または 14 ポイント以上の太字」で、CSS px に換算すると 18pt ≒ 24px、14pt 太字 ≒ 18.5px 太字。したがって正しくは「4.5:1 = 通常テキスト（24px 未満、太字なら 18.5px 未満）」「3:1 = 大きなテキスト（24px 以上、または 18.5px 以上の太字）」。7:1 が AAA の通常テキスト基準である点（SC 1.4.6 Contrast (Enhanced)、大きなテキストは 4.5:1）は正しい。
  - 出典: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

## 未確定（UNDETERMINED）

一次情報に当たっても確定しなかったもの。本文からは落とす。

### `ai-ml/python-ml/PythonSetup.tsx`

- **記述**: export PYENV_ROOT="$HOME/.pyenv" export PATH="$PYENV_ROOT/bin:$PATH" eval "$(pyenv init -)"
  - **確定しなかった理由**: https://raw.githubusercontent.com/pyenv/pyenv/master/README.md を全文取得して該当節（Bash は 737-757 行、Zsh は 770-776 行）を確認。現行 README が推奨するのは quote の 3 行で、教材の版とは 2 点ずれる: PATH 行に `[[ -d $PYENV_ROOT/bin ]] &&` のガードが入る点と、init にシェル名を明示する点（bash なら `pyenv init - bash`、zsh なら `pyenv init - zsh`）。ただし教材の `pyenv init -` が

### `claude-mux/ide-agent-teams/IdeIntegration.tsx`

- **記述**: システムトレイからの常駐起動
  - **確定しなかった理由**: デスクトップアプリの公式リファレンス https://code.claude.com/docs/en/desktop の全文（96KB）を保存し、`grep -n -i 'tray|menu bar|menubar|resident|hotkey|global shortcut|quick launch|launch at|always running'` を実行。system tray / メニューバー常駐に相当する記述はヒットしなかった。「menu bar」の唯一のヒットは版数確認手順の「**macOS**: click **Claude** in the menu bar, then *

### `devflow/designops/Handoff.tsx`

- **記述**: Figma の Variables で定義した値を書き出し、 コード側の CSS 変数や設定に取り込むことで、値の二重管理をなくせます。
  - **確定しなかった理由**: 一次情報に当たったが、この主張をそのまま裏づける記述が見つからない。Variables を機械的に取り出す公式経路は確認できた（REST API: GET /v1/files/:file_key/variables/local、GET .../variables/published、POST /v1/files/:file_key/variables — https://developers.figma.com/docs/rest-api/variables-endpoints/）が、上記のとおり Enterprise org の full member 限定。Help Center 側（ht

### `git/advanced/GitHubCLI.tsx`

- **記述**: WSL2 のターミナルで以下のコマンドを実行して、GitHub CLI をインストールします。
  - **確定しなかった理由**: 該当ページの実コードを確認（/Users/ai/dev/writing/dev-album/client/src/pages/git/advanced/GitHubCLI.tsx:46-50 の CodeBlock は `sudo apt update` / `sudo apt install gh` の 2 行のみ）。一次情報 https://raw.githubusercontent.com/cli/cli/trunk/docs/install_linux.md（curl 200, 14542 bytes）の「## Recommended _(Official)_ → ### Debian

### `git/ai-agent/CursorCline.tsx`

- **記述**: Cline は API キーで直接 AI を呼び出すため、使った分だけ課金されます。 Gemini の API キーを設定すれば、無料枠（1日1,000リクエスト）の範囲で無料で使えます。
  - **確定しなかった理由**: 一次情報である Gemini API の Rate limits ページ (https://ai.google.dev/gemini-api/docs/rate-limits) を curl で取得して全文を走査したが、Free tier の RPD/RPM を示す表は掲載されておらず、「AI Studio で確認せよ」「保証されない」とだけ書かれている。Usage tiers の表にも Free 行はあるが RPD の値はない。Pricing ページ (https://ai.google.dev/gemini-api/docs/pricing, Last updated 2026-08-13

### `git/ai-agent/Overview.tsx`

- **記述**: 無料〜月1,000円以下で、AIと一緒にコーディングできる環境を構築します。 複数のツールを組み合わせて、トークン切れでも作業が止まらない体制を作りましょう。
  - **確定しなかった理由**: 一次情報にあたったが、この主張は「複数ツールを組み合わせた合計月額の上限」という集計的・評価的な断定であり、ベンダーの一次情報で真偽を確定できない。実際の月額は利用量に依存し、どのベンダーも「この組み合わせなら月1,000円以下」とは述べていない。参考として、無料で使える経路は実在する（https://google-gemini.github.io/gemini-cli/docs/quota-and-pricing.html の「1000 model requests / user / day」、https://antigravity.google/pricing の「For Individu
- **記述**: まずはこれ。ターミナルから AI と対話でき、Git操作もお任せできる。コード理解の精度が最も高い。
  - **確定しなかった理由**: 「コード理解の精度が最も高い」は比較対象全体に対する最上級かつ評価的な主張で、真偽を確定できる一次情報が存在しない。Anthropic の Claude Code ドキュメント（https://code.claude.com/docs/en/setup, https://code.claude.com/docs/en/authentication）を確認したが、他ツールとのコード理解精度の比較や順位づけを述べた記述はない。ベンダー公式・仕様書のいずれにも「最も高い」を裏づける計測結果がないため断定できない。なお前半の「ターミナルから AI と対話でき」る点は公式ドキュメントの「Claude C
- **記述**: 初回クレジット付与（$5相当）
  - **確定しなかった理由**: curl -sL 'https://platform.claude.com/docs/en/about-claude/pricing.md' で本文を取得（HTTP 200）。FAQ 節に「新規ユーザーは API を試すための少額の無料クレジットを受け取る」旨の記載はあるが、金額は "a small amount" とだけ書かれ $5 という数字はどこにも無い。claude.com/pricing（https://www.anthropic.com/pricing から 301 リダイレクト）と support.claude.com の課金記事（8977456 / 8114531）も全文を確認
- **記述**: 少し課金パターン: Claude Code のAPIクレジットを $5（約750円）だけ追加。 使った分だけの従量課金なので、ライトな使い方なら月数百円で収まります。
  - **確定しなかった理由**: curl -sL で https://support.claude.com/en/articles/8977456-how-do-i-pay-for-my-claude-api-usage（記事日付 March 16, 2026）を取得しHTMLからテキスト抽出。「購入したクレジットが Claude Code にも使える」ことは確認できた。一方で (1) 最低購入額が $5 であるという記述はこの記事にも https://support.claude.com/en/articles/8114531-... にも無く（『enter in the amount of credits you wou

### `git/ai-agent/SubTools.tsx`

- **記述**: コード理解の精度が最も高い。メインとして使う
  - **確定しなかった理由**: Overview.tsx の同趣旨の記述と同じく、「コード理解の精度が最も高い」は最上級かつ評価的な主張で、これを裏づける一次情報（ベンダー公式の比較計測・仕様書）が見つからない。https://code.claude.com/docs/en/setup および https://code.claude.com/docs/en/authentication を確認したが、他ツールとの精度比較に触れた記述はない。ローテーション順の根拠として提示されているが出典を持たないため、断定せず UNDETERMINED とした。

### `git/flow-automation/AutoTestRefactor.tsx`

- **記述**: 例えば Claude Code の GitHub Action（ anthropics/claude-code-action ）は、Issue や PR で @claude とメンションすると、内容に沿って修正を実装し PR を作る、といった使い方ができます。
  - **確定しなかった理由**: リポジトリ名は curl -sL -o /dev/null -w '%{http_code}' https://github.com/anthropics/claude-code-action → 200 で実在確認。README（raw, 4896 bytes）冒頭に引用の @claude メンション記述があり、docs/usage.md 40 行目にも `# Optional: add custom trigger phrase (default: @claude)` があるので「@claude メンションで起動」は確定。確定できないのは「PR を作る」の部分で、一次情報 https://

### `git/flow-automation/Notifications.tsx`

- **記述**: 購読中のリポジトリを、有効なイベントとフィルタ付きで一覧する。設定の答え合わせに使う。
  - **確定しなかった理由**: curl -sL https://raw.githubusercontent.com/integrations/slack/master/README.md（200, 31050 bytes）を取得し grep -n -i 'subscribe' で全出現箇所を列挙。`/github subscribe list features` は 257-262 行目の「##### Listing filters」節に 1 箇所だけ登場し、説明は「To see the currently active filters」のみ。コマンドの実在は確定できるが、claim が述べる「購読中のリポジトリを一覧する

### `infra/aws/Compute.tsx`

- **記述**: yum update -y yum install -y nginx systemctl enable nginx systemctl start nginx
  - **確定しなかった理由**: ページ本文（client/src/pages/infra/aws/Compute.tsx）を読んだが、この user-data がどの AMI 前提かの明記が無いため、成否が確定できない。両側を一次情報で確認した結果は次のとおり。(1) AL2023 では動く: 上記引用のとおり `yum` は `dnf` へのポインタとして残っており、nginx は既定リポジトリの通常パッケージ（AL2023 リリースノート https://docs.aws.amazon.com/linux/al2023/release-notes/relnotes-2023.2.20231016.html に「** `n

### `react/accessibility/SemanticAria.tsx`

- **記述**: 自動ツールで検出できるのは全体の約30%。残りは手動テストが必要
  - **確定しなかった理由**: 「約30%」の出典を探したが、単一の一次情報に確定できなかった。数値は「何を分母に取るか」で大きく変わる。(a) 課題の件数を分母にした場合: Deque の一次調査 The Automated Accessibility Coverage Report（2,000 件超の初回監査 / 13,000 ページ超 / 約 300,000 件の課題を集計）は 57.38% と報告しており、同レポートは業界で流布する 20-30% という数字に対する反論として書かれている。(b) WCAG 達成基準の数を分母にした場合は 30% 前後という説明が広く使われる。(c) ツール個別の検出率としては英国 G

### `react/api-design/GraphQL.tsx`

- **記述**: Apollo Client は高機能ですが、バンドルサイズが大きめです（gzip 約 40-50KB）。
  - **確定しなかった理由**: ベンダー公式（Apollo）は gzip 値を公表していない。apollo-client リポジトリの .size-limits.json（https://raw.githubusercontent.com/apollographql/apollo-client/main/.size-limits.json, HTTP 200）は brotli 圧縮（.size-limit.cjs に `brotli: true`）かつ ApolloClient/InMemoryCache/HttpLink のみをツリーシェイクした最小 import の予算値で、29,529〜48,259 B。単位も対象も 

### `react/cdd-flow/DesignCodeSync.tsx`

- **記述**: CSS や YAML に直接 export する機能はありません。
  - **確定しなかった理由**: 外部プラグインの機能の「非存在」を断定する主張で、公式ドキュメントは非存在を明言していないため確定できない。確認した範囲: (1) https://docs.tokens.studio/ の sync provider 一覧は GitHub / GitLab / Bitbucket / Azure DevOps / JSONBin / Supernova / Tokens Studio Platform / URL / Generic Versioned Storage で、いずれも JSON ベース。(2) https://docs.tokens.studio/figma/export/ 系
- **記述**: この仕組みを導入したチームでは、デザイン変更のコード反映にかかる時間が 「数時間～数日」から「PR マージの数分」に短縮されたという報告があります。
  - **確定しなかった理由**: DesignCodeSync.tsx の該当 InfoBox（1245-1253 行）を読んだが、出典リンク・チーム名・計測方法の記載が一切ない。「導入したチーム」「報告があります」が匿名かつ計測条件（対象プロジェクト規模・期間・比較対象）が特定できないため、照合すべき一次情報を同定できなかった。Tokens Studio / Style Dictionary いずれの公式サイトにも、この短縮幅を示す事例発表は見つけられていない。効果の方向（自動化で反映が速くなる）は一般論として妥当だが、「数時間～数日→数分」という具体値は裏を取れないため判定を保留する。

### `react/css-basics/CssInJs.tsx`

- **記述**: styled-components: 約 12.7 kB
  - **確定しなかった理由**: styled-components のベンダー公式にサイズの明記が無い。README（https://raw.githubusercontent.com/styled-components/styled-components/main/README.md）を grep しても kB/size/bundle の記載は 0 件、公式 FAQ（https://styled-components.com/docs/faqs）にも kB 値の記載なし。候補出典の bundlephobia API（curl https://bundlephobia.com/api/size?package=styled-
- **記述**: @emotion/react + @emotion/styled: 約 11.2 kB
  - **確定しなかった理由**: Emotion 公式 README（https://raw.githubusercontent.com/emotion-js/emotion/main/README.md）はサイズを固定値で書かず bundlephobia のバッジ（img.shields.io/bundlephobia/minzip/@emotion/react 等）に委ねており、公式の確定数値が存在しない。bundlephobia API を curl した実測は @emotion/react 11.14.0 が gzip 8,116 B、@emotion/styled 11.14.1 が gzip 5,065 B（合算 
- **記述**: ベンチマークでは、CSS Modules や Tailwind と比べて数倍遅いケースも報告されています。
  - **確定しなかった理由**: CssInJs.tsx の該当 InfoBox（441-447 行）に出典の記載がなく、「数倍遅い」の比較条件（測定対象コンポーネント数・再レンダリング回数・React / ライブラリのバージョン）も示されていない。WebSearch で benchmark を探したが、ヒットするのは dev.to / 個人ブログ等の二次情報のみで、styled-components・Emotion・Tailwind・CSS Modules のいずれのベンダー公式・リポジトリもこの比較数値を公表していない。二次情報では CONFIRMED にできず、また「数倍」という幅の表現は出典側の数値と厳密に突き合わせら

### `react/design-tokens/TokensPractice.tsx`

- **記述**: label #000000 #FFFFFF 主要テキスト
  - **確定しなかった理由**: https://developer.apple.com/design/human-interface-guidelines/color を Playwright でレンダリングして全文（23,230 文字）を走査。foreground の動的カラー表（Label / Secondary label / Tertiary label / Quaternary label / Placeholder text / Separator …）は Color・Use for・UIKit API の 3 列のみで、hex 値は載っていない。Specifications 節にあるのは System colo

### `react/design-tokens/WhyDarkMode.tsx`

- **記述**: Google の調査によると、YouTube アプリでダークモードを使用した場合、 OLED 画面の最大輝度時で約 60% のバッテリー節約になるとされています。
  - **確定しなかった理由**: 出典と目される一次情報は Android Dev Summit 2018 のセッション「Cost of a Pixel Color」（Android Developers 公式チャンネルの動画 https://www.youtube.com/watch?v=N_6sPd0Jd3g ）のスライドだが、動画のため逐語引用できる本文を取得できず、Google 側にこの数値を明記した文書は見つけられなかった。Google 公式ドキュメント https://developer.android.com/develop/ui/views/theming/darktheme を確認したが、記載は「Reduce
- **記述**: Android の設定データによると、ダークモードを有効にしているユーザーは 80% 以上です（2023 年時点）。
  - **確定しなかった理由**: Google / Android 側の一次情報を探したが該当なし。allowed_domains を android-developers.googleblog.com / developer.android.com / blog.google / material.io / m3.material.io に限定して検索しても、ダークテーマ有効率の数値を公表したページは見つからなかった。ヒットするのは gitnux.org / zipdo.co / earthweb.com / wifitalents.com 等の統計まとめサイト（いずれも二次・三次情報）と、Android Authority
- **記述**: macOS / iOS でも過半数がダークモードを使用しているとされています。
  - **確定しなかった理由**: Apple の一次情報に当たったが該当する数値なし。https://developer.apple.com/design/human-interface-guidelines/dark-mode を WebFetch したが、利用率のパーセンテージや過半数を示す記述は含まれていない。allowed_domains を apple.com / developer.apple.com に限定した検索でも Apple 公表の採用率統計は見つからず、ヒットしたのは Apple Developer Forums のスレッド（ユーザー同士の推測。https://developer.apple.com/fo

### `react/mui/MuiIntro.tsx`

- **記述**: UMD 配布は v5 系が最終ですが、ここで扱う Button / Typography / Box などの基本 API は v5 以降のバージョンで共通です。
  - **確定しなかった理由**: 複合主張のため片方しか確定できなかった。(1)『UMD 配布は v5 系が最終』は一次情報で確認済み: 上記 v6 移行ガイド原文に加え、実配布物でも裏取りした。jsDelivr のパッケージファイル一覧 API (https://data.jsdelivr.com/v1/packages/npm/@mui/material@<ver>) で umd ディレクトリの有無を確認したところ 5.16.7 / 5.18.0 = あり、6.0.0 / 6.4.11 / 7.0.0 / 8.0.0 / 9.3.1 = なし。unpkg 直叩きでも https://unpkg.com/@mui/mater

### `react/nextjs-advanced/Next15Ppr.tsx`

- **記述**: <code className="text-sm bg-muted px-1.5 py-0.5 rounded">dynamicIO</code> は Next.js 15 で導入された実験的な機能で、データ取得の動的・静的判別をより厳密に制御します。有効にすると、キャッシュされていないデータアクセスが Suspens
  - **確定しなかった理由**: 現行の https://nextjs.org/docs/app/api-reference/config/next-config-js/dynamicIO は 404（Next.js 16 でフラグ削除済み）。そこで GitHub タグから当時の一次情報を取得した: v15.1.0 と v15.4.0 の docs/.../dynamicIO.mdx を curl（いずれも HTTP 200）。この公式リファレンスで確認できるのは「実験的機能である」ことと上記の挙動説明までで、(1) 導入バージョンを示す Version History 表が存在せず（frontmatter は `versio

### `react/storybook/SbSetup.tsx`

- **記述**: Storybook 8 では defaultValue は非推奨となり、initialGlobals での指定が推奨されています。
  - **確定しなかった理由**: candidateSource（v8 の Toolbars & globals）を curl で取得して全文を grep したが、`defaultValue` も `deprecat` も 0 件で、この主張に触れていない（同ページは globalTypes + initialGlobals の例のみを示す）。周辺の一次情報は結論が割れる: (1) v8.6.14 の CHANGELOG.md 684 行は「CSF: Rename `preview.js` `globals` to `initialGlobals`」で、v8.6.14 の MIGRATION.md 718 行も「Startin

### `react/tailwind/Intro.tsx`

- **記述**: Tailwind CSS v4 は Vite との統合がさらに簡単になりました。以下の手順でセットアップできます。
  - **確定しなかった理由**: curl -sL 'https://tailwindcss.com/docs/installation/using-vite' (HTTP 200) を取得しタグ除去して全手順を確認した。「v3 と比べてさらに簡単になった」という比較評価に相当する記述は公式インストールページに無く（あるのは 'Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and Solid

### `threejs/applied/model-loading.tsx`

- **記述**: DRACO は Google が開発した 3D メッシュの圧縮ライブラリです。 glTF モデルに適用すると、ファイルサイズを大幅に削減できます（通常 60〜90% 減）。
  - **確定しなかった理由**: 「Google 製の 3D メッシュ圧縮ライブラリ」という前段は google/draco 自体が一次情報で正しい。問題は「通常 60〜90% 減」という数値。https://raw.githubusercontent.com/google/draco/main/README.md を全文取得して `%` / `x` / `times smaller` 等を grep したが、圧縮率のパーセンテージは一切書かれていない（ヒットするのは CHANGELOG の "increased performance by ~200%" 等、デコーダ性能の話だけ）。README の表現は "signific

### `threejs/applied/post-processing.tsx`

- **記述**: @react-three/postprocessing は複数エフェクトを 1 つのシェーダーパスに統合するため、Three.js の生 EffectComposer より効率的
  - **確定しなかった理由**: https://raw.githubusercontent.com/pmndrs/react-postprocessing/master/README.md の "#### Why postprocessing and not three/examples/jsm/postprocessing?" 節が、上記本文を pmndrs/postprocessing の Performance 節からの引用として掲げている。引用元 https://raw.githubusercontent.com/pmndrs/postprocessing/main/README.md の 72 行目で逐語一致を確認

### `ux-design/evaluation/UsabilityTesting.tsx`

- **記述**: 指定されたタスクを正しく完了できたユーザーの割合。最も基本的な指標で、78%以上が一般的な合格ラインとされている。
  - **確定しなかった理由**: https://measuringu.com/task-completion/ を curl して 78% の全出現箇所を確認。78% は「約1200タスクの平均（50パーセンタイル）」として提示されており、記事は冒頭で「It depends (you saw that coming). Context matters in deciding what a good completion rate is for a task」と明言している。一方で「one threshold of good and bad」「using 78% would be a good place to start」と

### `ux-design/ux-foundations/WhatIsUx.tsx`

- **記述**: リサーチ段階 1x / デザイン段階 5x / 開発段階 10x / リリース後 30-100x
  - **確定しなかった理由**: 教材の該当箇所は client/src/pages/ux-design/ux-foundations/WhatIsUx.tsx:296-322 の「UX の ROI」表で、出典表記なし。一次情報を 2 系統当たったが、この 4 段階マッピングを支持するものは見つからなかった。(1) NIST/RTI Planning Report 02-3 (Tassey 2002) の PDF を curl で取得し pdftotext -layout で本文化して Table 5-1 を確認。列見出しと値は逐語で「Requirements Gathering and Analysis/Architectu

### `vue/composition/Composables.tsx`

- **記述**: 大きな違いは、Vue の composable には React の Hooks ルール（トップレベルでのみ呼ぶ・条件分岐の中で呼ばない）が原則ない こと。
  - **確定しなかった理由**: 2 つの一次情報が食い違うため確定できない。(1) https://ja.vuejs.org/guide/extras/composition-api-faq.html の「React Hooks との比較」節は、React 側を「Hooks は呼び出し順序に敏感で、条件付きでない」と書き、Vue 側を上記 quote の通り「呼び出しの順番に関係なく、条件付きで呼び出すことができます」と明記している。claim の括弧内 2 項のうち「条件分岐の中で呼ばない」が Vue に無いことは、この逐語文で直接裏付けられる。(2) 一方 candidateSource の https://ja.vue

### `vue/nuxt-basics/WhatIsNuxt.tsx`

- **記述**: npm create nuxt@latest が現在の入口で、内部では nuxi （Nuxt の CLI）が動きます。既存ディレクトリに 初期化したい場合は npx nuxi init も使えます。
  - **確定しなかった理由**: (1) 入口が npm create nuxt@latest であることは公式 Installation ドキュメントで確認できる (https://raw.githubusercontent.com/nuxt/nuxt/4.x/docs/1.getting-started/02.installation.md に「npm create nuxt@latest <project-name>」)。(2) npx nuxi init も実測で動作した: 一時ディレクトリで `npx --yes nuxi@3.37.0 init --help` を実行し「Initialize a fresh pro

## 再現

```bash
pnpm check:links    # 外部リンクの実在確認
pnpm check:sources  # 出典レジストリの逐語引用照合
```

主張の抽出と照合は Claude Code のワークフローで実施した。手順は `.claude/skills/evidence-check/`、
教材を書くときの規律は `.claude/skills/academic-page/` にある。
