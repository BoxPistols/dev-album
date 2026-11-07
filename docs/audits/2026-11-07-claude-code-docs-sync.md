# Claude Code公式ドキュメントの変更への追従（2026-11-07）

`/fact-check`の手順（`.claude/skills/evidence-check/SKILL.md`）で、Claude Codeの教材を公式ドキュメント（https://code.claude.com/docs/en/）と照合した記録。

## L1・L2の結果

- L1（`sources.test.ts`）: 17件すべて緑
- L2（`pnpm check:sources`、全レジストリ）: 照合した引用306件のうち49件が原文に見つからなかった

49件の内訳。

| 出典 | 件数 | この記録での扱い |
|---|---|---|
| code.claude.com（Claude Code） | 18 | 原文を取り直し、本文と引用を直した（下記） |
| TypeSafe AI（Jev）のdocs | 20 | 未対応。Jevのページは別のPR（#177）が触っているため、そちらと衝突しない形で別に直す |
| GitHub（Copilot・Actionsの課金） | 2 | 未対応 |
| Gemini Code Assist | 2 | 未対応 |
| Next.js（cacheLife）・Nitro・Vercel・Figma | 各1 | 未対応 |

未対応の31件は、定期検査のissue（#121）が出している失敗と同じ系統。

## Claude Codeの18件: 言い回しの変化と、内容の変化

18件のうち、教材の記述が誤りになっていたのは次の7点。残りは言い回しだけの変化で、引用を現在の原文に取り直した。

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
- 上の未対応31件
