cmux 教材コンテンツを公式仕様と実機の出力で照合してください。

1. **公式情報の確認**
   - https://github.com/manaflow-ai/cmux の README（main ブランチ最新）
   - https://www.cmux.dev/ のドキュメント
   - 直近のリリースノート（GitHub Releases）

2. **実機での確認コマンド（実行できる環境にある場合）**
   - `cmux --version` → 教材中の `cmuxVersion` と一致するか
   - `cmux --help` → サブコマンドが教材記載と一致するか
   - `cmux browser --help` → browser API のサブコマンド（snapshot / click / fill / eval / get / screenshot / goto / wait 等）が一致するか
   - `which cmux` → Apple Silicon: /opt/homebrew/bin/cmux, Intel: /usr/local/bin/cmux

3. **対象ページのファクトチェック**
   - client/src/pages/claude-code/cmux/CmuxIntro.tsx
   - client/src/pages/claude-code/cmux/CmuxSetup.tsx
   - client/src/pages/claude-code/cmux/CmuxAgentTeams.tsx
   - client/src/pages/claude-code/cmux/CmuxBrowserAPI.tsx
   - client/src/pages/claude-code/cmux/CmuxWorktrees.tsx

4. **特に注意して見る項目**
   - `<VerifiedBox />` の `cmuxVersion` / `verifiedAt` / `platform` が古くなっていないか
   - `cmux claude-hook` のサブコマンド名（session-start / stop / notification / prompt-submit）が公式と一致するか
   - 環境変数 `$CMUX_SURFACE_ID` の名称・用途が公式と一致するか
   - キーボードショートカット（Cmd+Shift+N / D / J / U / I, Opt+Cmd+D, Cmd+1〜9）が公式と一致するか
   - browser コマンドが CSS selector ベースであり、`--ref <ref-id>` 形式ではないこと
   - 公式リポジトリ URL `https://github.com/manaflow-ai/cmux` が正しいこと
   - tmux との比較表の内容が事実として正しいこと（SSH 越し利用 / リモート常駐 / プラットフォーム 等）

5. **報告とアクション**
   - 不正確な箇所を「現状の記載」「公式の正しい記載」「ソース URL」の形でリストアップ
   - 重大度（高: 動かない / 中: 古いが動く / 低: 表記揺れ）を付ける
   - 修正は重大度が高・中のものから順に実施
   - VerifiedBox の `verifiedAt` を実行日に更新
   - 不確実な箇所は推測で書き換えず、「公式に該当記載なし」として保留

6. **副作用警告の維持**
   - CmuxSetup の settings.json 改変・zshrc 改変の warning コールアウトを削除しない
   - CmuxBrowserAPI 冒頭の脅威モデル TL;DR を削除しない
   - これらは公式の API 変更があっても残すべき安全情報
