#!/usr/bin/env bash
# 検査コマンドを走らせ、失敗したら 60 秒待って 1 度だけやり直す。
#
#   run-check-with-retry.sh <name> <command...>
#
# 出典の照合は外部サイトに出るため、相手側の一時的な障害（503 / 429 / タイムアウト）で
# 落ちることがある。1 回目の赤をそのまま報告すると毎週偽の失敗が鳴り、誰も見なくなる。
# そこで 2 回目の結果だけを採用する。2 回続けて落ちたものは「一時的」と呼べないので報告に回す。
#
# 出力:
#   reports/<name>.log        2 回目（または成功した回）の標準出力 + 標準エラー
#   $GITHUB_OUTPUT の status  ok | failed
#   $GITHUB_OUTPUT の attempts 1 | 2
set -u

name="$1"
shift

mkdir -p reports
log="reports/${name}.log"
retry_wait="${RETRY_WAIT_SECONDS:-60}"

run_once() {
  # tee で画面にも残す。失敗しても set -e で止めないため明示的に戻り値を取る
  "$@" > "$log" 2>&1
  return $?
}

attempts=1
if run_once "$@"; then
  status=ok
else
  echo "::warning title=${name}::1 回目が失敗。${retry_wait} 秒待って再実行する"
  sleep "$retry_wait"
  attempts=2
  if run_once "$@"; then
    status=ok
  else
    status=failed
  fi
fi

cat "$log"
echo "status=${status}" >> "${GITHUB_OUTPUT:-/dev/null}"
echo "attempts=${attempts}" >> "${GITHUB_OUTPUT:-/dev/null}"
echo "[${name}] status=${status} attempts=${attempts}"
[ "$status" = ok ]
