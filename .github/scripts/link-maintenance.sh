#!/usr/bin/env bash
# 週次のリンク点検と自動修正。link-maintenance.yml から段階ごとに呼ばれる。
#
#   before          リンクを確認して件数を出力に載せる
#   fix             リダイレクトを恒久 URL に書き換える
#   after           書き換えた URL が届くか測り直す
#   pr              修正を PR にする
#   report-failure  書き換えが成立しなかったことを issue に伝える
#   report-broken   元から切れているリンクを issue に伝える
#
# ワークフローの式を run に直接埋め込まず、環境変数で受け取る。
set -euo pipefail

REPORTS_DIR=reports
mkdir -p "$REPORTS_DIR"

# check:links --json は pnpm のバナー行を先に出すので、JSON の開始行から切り出す。
# jq に直接食わせると「Extra data」で落ちる（実際に踏んだ）
run_check() {
  local out=$1
  pnpm check:links --json 2>"$REPORTS_DIR/links-stderr.log" |
    sed -n '/^{$/,$p' >"$out" || true
  if ! jq -e . "$out" >/dev/null 2>&1; then
    echo "check:links の JSON を読めなかった" >&2
    return 1
  fi
}

counts() {
  jq -r '"確認 \(.checked|length) 件 / 切れている \(.broken|length) 件 / リダイレクト \(.redirected|length) 件 / 要手動確認 \(.blocked|length) 件"' "$1"
}

case "${1:?段階を指定する}" in
before)
  run_check "$REPORTS_DIR/links-before.json"
  summary=$(counts "$REPORTS_DIR/links-before.json")
  broken=$(jq -r '.broken|length' "$REPORTS_DIR/links-before.json")
  echo "$summary"
  {
    echo "summary=$summary"
    echo "broken=$broken"
  } >>"$GITHUB_OUTPUT"
  ;;

fix)
  # --write なしで内容を出してからログに残し、そのあと書き換える。
  # 何をどう変えたかが後から追える形にする
  pnpm fix:links "$REPORTS_DIR/links-before.json" >"$REPORTS_DIR/fix-plan.log" 2>&1 || true
  pnpm fix:links "$REPORTS_DIR/links-before.json" --write >"$REPORTS_DIR/fix-applied.log" 2>&1 || true
  summary=$(grep -E '^書き換えた ' "$REPORTS_DIR/fix-applied.log" || echo "書き換えた 0 ファイル / 0 箇所")
  echo "$summary"
  # fix:links が触るのは教材と出典のファイルだけ。作業ツリーの他の変更を
  # 拾わないよう、判定をその範囲に限定する
  if git diff --quiet -- client docs; then
    echo "changed=false" >>"$GITHUB_OUTPUT"
  else
    echo "changed=true" >>"$GITHUB_OUTPUT"
  fi
  echo "summary=$summary" >>"$GITHUB_OUTPUT"
  ;;

after)
  run_check "$REPORTS_DIR/links-after.json"
  summary=$(counts "$REPORTS_DIR/links-after.json")
  broken=$(jq -r '.broken|length' "$REPORTS_DIR/links-after.json")
  before_broken=$(jq -r '.broken|length' "$REPORTS_DIR/links-before.json")
  echo "$summary"
  # 書き換えで新しく切れたものが出ていないかを見る。元から切れていた分は別扱い
  if [ "$broken" -gt "$before_broken" ]; then
    echo "書き換えで切れたリンクが増えた（$before_broken → $broken）。PR は出さない" >&2
    jq -r '.broken[] | "  \(.status) \(.url)"' "$REPORTS_DIR/links-after.json" >&2
    echo "status=broken-by-fix" >>"$GITHUB_OUTPUT"
  else
    echo "status=ok" >>"$GITHUB_OUTPUT"
  fi
  echo "summary=$summary" >>"$GITHUB_OUTPUT"
  ;;

pr)
  : "${GH_TOKEN:?}" "${RUN_URL:?}" "${BRANCH:?}"
  git config user.name "github-actions[bot]"
  git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
  git checkout -B "$BRANCH"
  git add -A client docs
  git commit -m "リダイレクトされる外部リンクを恒久 URL に寄せる"
  git push -f origin "$BRANCH"

  body=$(
    cat <<EOF
週次のリンク点検が、リダイレクトされる URL を現在のアドレスに書き換えました。自動生成の PR です。

書き換え前: ${BEFORE_SUMMARY:-不明}
書き換え: ${FIX_SUMMARY:-不明}
書き換え後: ${AFTER_SUMMARY:-不明}

リダイレクトは今は届きますが、出典側が次に整理したときに切れます。届くうちに寄せています。

書き換えたあとに check:links を回し直して、切れているリンクが増えていないことを確認しています。この確認を通らなかった場合、この PR は作られません。

自動マージにはしていません。再検査が見るのは「届くか」だけで、「同じ内容のページか」までは見ないためです。リダイレクト先が別の内容に差し替わっている場合は検査を素通りします。diff は URL の置換だけなので、そこだけ見てください。

実行ログ: ${RUN_URL}
EOF
  )

  if gh pr view "$BRANCH" --json number >/dev/null 2>&1; then
    gh pr edit "$BRANCH" --body "$body"
    echo "既存の PR を更新した"
  else
    gh pr create --head "$BRANCH" \
      --title "リダイレクトされる外部リンクを恒久 URL に寄せる" \
      --body "$body"
  fi
  ;;

report-failure)
  : "${GH_TOKEN:?}" "${GH_REPO:?}" "${RUN_URL:?}" "${ISSUE_TITLE:?}" "${ISSUE_LABEL:?}"
  body=$(
    cat <<EOF
週次のリンク自動修正が成立しませんでした。書き換えた結果を測り直したところ、切れているリンクが増えています。PR は作っていません。

書き換え後: ${AFTER_SUMMARY:-不明}

書き換えは 2 種類の壊し方をします。短い URL が長い URL の内側にあるときの二重置換と、落とせないロケール接頭辞です。どちらも scripts/fix-redirected-links.mjs で対策済みですが、新しい型が出た可能性があります。

実行ログと reports/ の成果物で、どの URL が落ちたかを確認してください。

実行ログ: ${RUN_URL}
EOF
  )
  bash "$(dirname "$0")/append-or-create-issue.sh" "$body"
  ;;

report-broken)
  : "${GH_TOKEN:?}" "${GH_REPO:?}" "${RUN_URL:?}" "${ISSUE_TITLE:?}" "${ISSUE_LABEL:?}"
  broken_list=$(jq -r '.broken[] | "- \(.status) \(.url)\n  \(.files | join(", "))"' "$REPORTS_DIR/links-before.json" 2>/dev/null || echo "(一覧を読めなかった)")
  body=$(
    cat <<EOF
週次のリンク点検で、切れている外部リンクが見つかりました。リダイレクトの書き換えでは直らないので、出典を差し替えるか記述を落とす必要があります。

${BEFORE_SUMMARY:-不明}

切れているリンク:

${broken_list}

実行ログ: ${RUN_URL}
EOF
  )
  bash "$(dirname "$0")/append-or-create-issue.sh" "$body"
  ;;

*)
  echo "不明な段階: $1" >&2
  exit 2
  ;;
esac
