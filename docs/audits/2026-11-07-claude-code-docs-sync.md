# Claude Code公式ドキュメントの変更への追従（2026-11-07）

`/fact-check`の手順（`.claude/skills/evidence-check/SKILL.md`）で、Claude Codeの教材を公式ドキュメント（https://code.claude.com/docs/en/）と照合した記録。

## L1・L2の結果

- L1（`sources.test.ts`）: 17件すべて緑
- L2（`pnpm check:sources`、全レジストリ）: 照合した引用306件のうち49件が原文に見つからなかった

49件の内訳。

| 出典 | 件数 | この記録での扱い |
|---|---|---|
| code.claude.com（Claude Code） | 21 | 原文を取り直し、本文と引用を直した（下記）。生成レジストリ18件と、手で登録した`claude-code-memory`の3件 |
| TypeSafe AI（Jev）のdocs | 20 | 未対応。Jevのページは別のPR（#177）が触っているため、そちらと衝突しない形で別に直す |
| GitHub（Copilot・Actionsの課金） | 2 | 未対応 |
| Gemini Code Assist | 2 | 未対応 |
| Next.js（cacheLife）・Nitro・Vercel・Figma | 各1 | 未対応 |

未対応の28件は、定期検査のissue（#121）が出している失敗と同じ系統。

## Claude Codeの21件: 言い回しの変化と、内容の変化

21件のうち、教材の記述が誤りになっていたのは次の7点。残りは言い回しだけの変化で、引用を現在の原文に取り直した。

| 変化 | 公式の現在の記述 | 直したページ |
|---|---|---|
| Claude CodeがAGENTS.mdを直接読むようになった | `By default, Claude reads `AGENTS.md` only when you have no `CLAUDE.md` in your working directory or above it.` / `Reading `AGENTS.md` directly requires Claude Code v2.1.277 or later.` | multi-ai/file-map, agent-docs, MultiAICoexistence, SingleSourceOfTruth |
| 既定モデルがOpus 5.5に（Proも） | `* **Pro, Max, Ultra, Team, Enterprise, and Anthropic API**: defaults to Opus 5.5` | ExtendedThinking |
| effortの既定がモデルで分かれた | `except that Opus 5.5, Sonnet 5.5, and Haiku 5.5 default to `medium` and Opus 4.7 defaults to `xhigh`` | SlashCommands, ExtendedThinking, TokenOptimization |
| `/rewind`がBashの変更も戻すようになった（条件つき） | `Once Claude has edited a file with its file editing tools in your conversation, `/rewind` undoes changes that Bash commands make to that file afterward.` | SlashCommands |
| `--max-budget-usd`はprintモード専用で見積もりベース | `Stop the run once estimated spend on API calls reaches this amount (print mode only).` | TokenOptimization |
| 設定の優先順位の2番目が`--settings`に | `2. **Command line**: JSON you pass with `--settings <file-or-json>` when you start `claude`, for that session only` | SecurityPermissions |
| サブエージェントの`model`を省略したときの扱い | `The subagent definition's `model` frontmatter, where `inherit` selects the main conversation's model` | Subagents |

あわせて、レジストリの外でも同じ原因で古くなっていた記述を直した。

- Fast Modeの対応モデルと単価（Opus 5.5が加わり、Opus 4.8は2026-11-30に廃止予定）。出典`code-claude-com-docs-en-fast-mode`を新しく登録した
- auto modeの対応モデルにHaiku 5.5を足した
- プランの一覧にUltraを足した（setup）
- npm版のNode.js 22は「推奨」ではなく要件で、古い版でも警告だけで動く（setup）

## AGENTS.mdの扱いで気を付けたこと

「Claude CodeはAGENTS.mdを読まない」を消すだけにはしなかった。直接読むのはCLAUDE.mdが無いときだけで、教材が扱っている「AGENTS.mdとCLAUDE.mdを両方置く構成」では、今もCLAUDE.mdからの`@AGENTS.md`のimportが要る。見出しを「CLAUDE.mdがあるとAGENTS.mdは読まれない」に変え、条件と版（v2.1.277）を書いた。

## 照合し直した結果

直した15出典に`pnpm check:sources <id>`を当て、引用50件がすべて原文と一致した。

## 残っていること

- L5（レジストリに載っていない主張の洗い出し）は、対象5ディレクトリのうちモデル名・設定キー・AGENTS.mdまわりだけを見た。hookのイベント名と入出力、MCPのスコープ、スラッシュコマンドの一覧は今回見ていない
- 上の未対応28件

## 修正内容の独立レビュー

手順どおり、修正の差分だけを対象にしたレビューを別のエージェントに任せた（レビュー担当は修正しない）。指摘は17件で、すべて公式の記述と突き合わせて確かめてから直した。

- 差分が直し残した同じ主張: FileMapの一覧表のAGENTS.mdの行、TokenOptimizationの「high（既定）」、SlashCommandsのeffortの永続化と優先順位と設定例（最上位の`effortLevel`はOpus 5.5に効かない）、EffectiveWorkflowsの/rewindの制約、PermissionModes・SecurityPermissions・Cheatsheetの「Pro / Max / Teamではautoが既定」（v2.1.283以降は全プラン）、gitマニュアル3ページのプラン一覧（Ultra）
- 自分で新しく書いた文の不正確さ: /rewindの括弧書きが「rmで消したものは戻らない」と読める、`--max-budget-usd`の「少し超える」の「少し」が原文に無い、サブエージェントのモデルの解決順で呼び出し時の`model`が抜けていた
- 引用を差し替えたことで根拠を失った版番号: AgentOrchestrationの「v2.1.186以降」、ClaudeCodeSetupの「v2.1.198以降」を落とした
- 表示: 引用をJSXの素のテキストに入れたためバッククォートが画面に出ていたのを`<code>`に変えた
- レジストリ: 新しく書いた記述の根拠を引用として足し（auto modeの既定、effortの確定のしかた、優先順位、サブエージェントの解決順ほか）、fast-modeの登録位置とpluginsのtitleを揃えた

直したあと、15出典の引用60件が原文と一致することを確かめた。

レビューが「軽微」としたもののうち、SecurityPermissionsの優先順位の`desc`が画面に描画されていない件は、この修正の範囲外として残した。

## CodeRabbitのレビュー（2026-11-07）

12件の指摘を公式と突き合わせ、裏が取れたものを直した。

- 直した: SecurityPermissionsの「既定は人間の承認」（モードで決まり、対話型はautoで始まる）、AgentDocsで直接読めないセッションの条件、FileMapの条件が既定設定のものであることと`~/.claude/CLAUDE.md`を数えないこと、MultiAICoexistenceのsymlinkの案内、ExtendedThinkingのFableのgateway例外、EffectiveWorkflowsのサブエージェントの復元条件、SlashCommandsの`effortLevel`が効かない範囲、Cheatsheetにautoの行と`claude -p`の既定（v2.1.302以降はManual）、AgentOrchestrationの`iterm2`の版（CHANGELOGで2.1.186の追加を確認して戻した）、この記録の件数（Claude Codeは21件で、未対応は28件）
- 直していない: CursorClineの「月次APIクレジット」の追記。出典のsupport.claude.comをこの環境から取得できず、裏を取れなかった。この差分が触った箇所でもない

## 続き: L5の残り、AI/ML、インフラ（2026-11-08）

### Claude Code（hooks・MCP・スラッシュコマンド）

- hooks: 教材が名前を挙げているイベントは、すべて公式の一覧に実在した。「exit 2で止められるイベント」の一覧に`PreModelSwitch`と`WorktreeRemove`が加わっていたので足した。起動時の`SessionStart`とすべての`Setup`では`mcp_tool`のHookが飛ばされることを書いた
- MCP: スコープ（local / project / user）と保存先（`~/.claude.json` / `.mcp.json`）、`claude mcp`のサブコマンドは公式と一致した。`enableAllProjectMcpServers`をリポジトリにコミットしても、ワークスペースを信頼するまでは無視されることを補った
- スラッシュコマンド: 教材に出てくるコマンド名を公式の一覧（120件）と突き合わせた。一覧に無い4件（`/deploy`・`/write-tests`・`/name`・`/apps/web:deploy`）は、いずれもカスタムスキルの例で、組み込みのコマンドとしては書いていない

### AI/ML

- `LmopsWorkflow`のコード例の`claude-sonnet-4-20250514`は2026-06-15に引退していた（そのままでは呼び出しが失敗する）。公式の移行先`claude-sonnet-5-5`にした
- `LlmBasics`のモデルを`claude-sonnet-5-5`にし、コンテキスト長の説明を現行の4モデル（すべて1M）に合わせた。比較表の「GPT-4o」は版を付けない「GPT」にした（ほかの行と表記をそろえる）
- `PythonSetup`: Python 3.10は2026-10-01にサポートが終わっていた。インストール例を`pyenv latest -k 3.14`で最新を入れる形にし、推奨を「バグ修正が続いている版」にした

### インフラほか（Node.jsのEOL）

- Node.js 20は2026-04-30にサポートが終わっていた。`Containers`のDockerfile、`TriggersJobs`のマトリクス（18 / 20 / 22 → 22 / 24 / 26）、`HeadlessMode`のDocker実行例を直した（Claude Codeのnpm版はNode.js 22以上が要件なので、20のイメージでは警告が出る）

### 直していないこと

- GitHub Actionsの`actions/checkout@v4`・`actions/setup-node@v4`が14ファイルに残っている。`Cicd`と`SbFigma`は`@v7`。v4は今も動くので誤りではないが、版のそろえ方は判断が要るのでissueにした
- `CursorCline`の「月次APIクレジット」（#182）は、出典のsupport.claude.comをこの環境から取得できず未確認のまま
