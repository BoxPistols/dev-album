#!/usr/bin/env bash
# 固定の題名の issue に本文を追記する。無ければ新規に作る。
#
#   bash append-or-create-issue.sh "<本文>"
#   bash append-or-create-issue.sh --body-file <ファイル>
#
# 環境変数:
#   ISSUE_TITLE  探す / 作る issue の題名（固定）
#   ISSUE_LABEL  探す / 作る issue のラベル
#   GH_TOKEN     gh が使うトークン
#
# 実行ごとに issue を増やすと、対応中のものと混ざって件数が膨らむ。
# 定期実行の報告は 1 本に集約する。report-source-checks.sh と
# link-maintenance.sh の両方がこれを使う。
set -euo pipefail

: "${ISSUE_TITLE:?}" "${ISSUE_LABEL:?}"

if [ "${1:-}" = "--body-file" ]; then
  body_file="${2:?本文のファイルを指定する}"
else
  body_file="$(mktemp)"
  printf '%s\n' "${1:?本文を指定する}" >"$body_file"
fi

# 題名の完全一致で探す。--search は部分一致なので、取れた候補を題名で絞り直す
existing="$(
  gh issue list --state open --label "$ISSUE_LABEL" --search "\"$ISSUE_TITLE\" in:title" \
    --json number,title --jq ".[] | select(.title == \"$ISSUE_TITLE\") | .number" | head -n 1
)"

if [ -n "$existing" ]; then
  gh issue comment "$existing" --body-file "$body_file"
  echo "既存の issue #${existing} に追記した"
else
  gh issue create --title "$ISSUE_TITLE" --label "$ISSUE_LABEL" --body-file "$body_file"
  echo "issue を新規作成した"
fi
