cmux 教材を公式仕様と実機の出力で照合してください。

手順は `.claude/skills/evidence-check/SKILL.md` に従う（決定的チェック → 逐語照合 → 判断）。
このコマンドは cmux に固有の「どこを、何で」照合するかと、API が変わっても残すものだけを決める。

## 一次情報

- https://github.com/manaflow-ai/cmux の README（main ブランチ最新。本文は raw で引く）
- https://cmux.com/ （旧 `https://www.cmux.dev/` は 301 でここへ転送される）
- https://github.com/manaflow-ai/cmux/releases

## 実機での確認（実行できる環境にある場合）

evidence-check の「2. 実測の主張を再現する」に当たる。バージョンを固定して回す。

- `cmux --version` → `<VerifiedBox />` の `cmuxVersion` と一致するか
- `cmux --help` → サブコマンドが教材記載と一致するか
- `cmux browser --help` → browser API のサブコマンド（snapshot / click / fill / eval / get / screenshot / goto / wait 等）が一致するか
- `which cmux` → Apple Silicon: /opt/homebrew/bin/cmux, Intel: /usr/local/bin/cmux

## 対象ページ

- client/src/pages/claude-code/cmux/CmuxIntro.tsx
- client/src/pages/claude-code/cmux/CmuxSetup.tsx
- client/src/pages/claude-code/cmux/CmuxAgentTeams.tsx
- client/src/pages/claude-code/cmux/CmuxBrowserAPI.tsx
- client/src/pages/claude-code/cmux/CmuxWorktrees.tsx

## 特に見る項目

- `<VerifiedBox />` の `cmuxVersion` / `verifiedAt` / `platform`
- `cmux claude-hook` のサブコマンド名（session-start / stop / notification / prompt-submit）
- 環境変数 `$CMUX_SURFACE_ID` の名称と用途
- キーボードショートカット（Cmd+Shift+N / D / J / U / I, Opt+Cmd+D, Cmd+1〜9）
- browser コマンドが CSS selector ベースであり、`--ref <ref-id>` 形式ではないこと
- tmux との比較表（SSH 越し利用 / リモート常駐 / プラットフォーム 等）

## 修正と報告

- 不正確な箇所は「現状の記載」「公式の正しい記載」「ソース URL」の形で挙げ、重大度（高: 動かない / 中: 古いが動く / 低: 表記揺れ）を付ける
- 実機と公式の両方で確認できたものだけ `VerifiedBox` の `verifiedAt` を実行日に更新する。照合せずに日付だけ進めない
- 確定しなかった項目は推測で書き換えず「公式に該当記載なし」として残す
- 修正後は evidence-check の「修正した後にやること」に従い、修正内容だけを対象にした独立レビューを入れる

## API が変わっても残すもの

- CmuxSetup の settings.json 改変・zshrc 改変の warning コールアウト
- CmuxBrowserAPI 冒頭の脅威モデル TL;DR

これらは公式の記述に対応する安全情報ではなく、教材側の判断で置いているもの。公式の API 変更を理由に削除しない。
