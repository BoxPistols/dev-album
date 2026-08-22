#!/usr/bin/env bash
# 定期検査の結果を 1 つの issue にまとめる。
#
# 環境変数で受け取る（ワークフローの式を run に直接埋め込まない）:
#   RESULTS      "name=status/attempts" を空白区切りで並べたもの
#   RUN_URL      この実行のページ
#   ISSUE_TITLE  探す / 作る issue の題名（固定）
#   ISSUE_LABEL  探す / 作る issue のラベル
#   GH_TOKEN     gh が使うトークン
#
# 同じ題名の open な issue があればコメントを追記し、無ければ新規に作る。
# 週ごとに issue を増やすと対応中のものと混ざるので、1 本に集約する。
set -euo pipefail

: "${RESULTS:?}" "${RUN_URL:?}" "${ISSUE_TITLE:?}" "${ISSUE_LABEL:?}"

# issue 本文の上限（65536 文字）に余裕を持たせ、ログは検査ごとに頭の部分だけ載せる
LOG_HEAD_CHARS=6000

failed=()
summary=""
for entry in $RESULTS; do
  name="${entry%%=*}"
  rest="${entry#*=}"
  status="${rest%%/*}"
  attempts="${rest#*/}"
  # status が空なのは検査スクリプトに辿り着く前に落ちた場合。これも失敗として扱う
  case "$status" in
    ok) mark="OK" ;;
    *) mark="失敗"; failed+=("$name") ;;
  esac
  summary+="| \`${name}\` | ${mark} | ${attempts:-?} 回目 |"$'\n'
done

if [ "${#failed[@]}" -eq 0 ]; then
  echo "すべての検査が通った。issue は作らない"
  exit 0
fi

body_file="$(mktemp)"
{
  echo "定期検査の実行: ${RUN_URL}"
  echo
  echo "| 検査 | 結果 | 採用した試行 |"
  echo "|---|---|---|"
  printf '%s' "$summary"
  echo
  echo "失敗した検査は 60 秒おいて再実行し、2 回目の結果を載せている。2 回続けて落ちたものだけがここに出る。"
  echo "全文のログと reports/ の成果物は上の実行ページから取れる。"
  echo
  for name in "${failed[@]}"; do
    log="reports/${name}.log"
    echo "<details><summary>${name} の出力（先頭 ${LOG_HEAD_CHARS} 文字）</summary>"
    echo
    echo '```'
    if [ -f "$log" ]; then
      head -c "$LOG_HEAD_CHARS" "$log"
      if [ "$(wc -c < "$log")" -gt "$LOG_HEAD_CHARS" ]; then
        echo
        echo "…（以下省略。全文は実行ページのログを見る）"
      fi
    else
      echo "（ログが無い）"
    fi
    echo '```'
    echo
    echo "</details>"
    echo
  done
} > "$body_file"

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
