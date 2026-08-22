Claude Code 関連の教材を公式ドキュメントと照合してください。

手順は `.claude/skills/evidence-check/SKILL.md` に従う（決定的チェック → 逐語照合 → 判断）。
このコマンドは「どのページを、どの公式ドキュメントで」照合するかだけを決める。

## 一次情報

- https://code.claude.com/docs/ （旧 `https://docs.anthropic.com/en/docs/claude-code/` は 301 でここへ転送される。`https://code.claude.com/docs/en/` が英語版の正規パス）
- ページ末尾に `.md` を付けると Markdown 版が取れる。`check:sources` もこれを優先する

## 対象ページ

- client/src/pages/claude-code/claude-intro/
- client/src/pages/claude-code/mcp/
- client/src/pages/claude-code/agent-extensions/
- client/src/pages/claude-code/ide-agent-teams/
- client/src/pages/claude-code/hooks-advanced/

## 特に見る項目

- モデル名・モデル ID
- スラッシュコマンド名・CLI フラグ
- 設定ファイルのパス（`~/.claude/settings.json` / `.claude/settings.json` / `.claude/settings.local.json`）と設定キー
- hook のイベント名と入出力の形
- MCP の設定スコープ（user / project / local）と設定ファイル名

## 進め方

1. `pnpm check:sources` を回し、レジストリにある引用が原文と一致しているかを先に確定する
2. 対象ページから事実を主張している文を拾い、evidence-check の「3. レジストリに載っていない主張を洗い出す」の基準で判定する
3. 修正は evidence-check の手順で行い、確定しなかった項目は「公式に該当記載なし」として残す
4. 修正後は evidence-check の「修正した後にやること」に従い、修正内容だけを対象にした独立レビューを入れる
