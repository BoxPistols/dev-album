import { useCallback, useEffect, useRef, useState } from "react";
import {
  isJevTriageResult,
  JEV_FAILURE_MESSAGES,
  type JevFailureCode,
  type JevTriageResult,
} from "../../../api/lib/jevRequest";

/** サーバーの待ち時間の上限は5秒。関数の起動と枠の確認の分を足した、画面側の打ち切り */
const CLIENT_TIMEOUT_MS = 15_000;

export type JevUnavailableReason = JevFailureCode | "unreachable";

export const JEV_UNAVAILABLE_MESSAGES: Record<JevUnavailableReason, string> = {
  ...JEV_FAILURE_MESSAGES,
  unreachable:
    "実行用のAPIに接続できませんでした。この環境には/api/jevが無いか、通信に失敗しています。",
};

export type JevTriageState =
  | { status: "idle" }
  | { status: "running" }
  | { status: "success"; result: JevTriageResult }
  | { status: "invalid"; message: string }
  | { status: "unavailable"; reason: JevUnavailableReason };

function isFailureCode(value: unknown): value is JevFailureCode {
  return typeof value === "string" && Object.hasOwn(JEV_FAILURE_MESSAGES, value);
}

/**
 * 応答を画面の状態へ変換する。判定の値がそろった200だけを成功として扱い、
 * それ以外は404やJSON以外の応答も含めて「実行できなかった」に落とす。
 */
export function interpretJevResponse(
  status: number,
  body: unknown,
): JevTriageState {
  if (status === 200 && isJevTriageResult(body)) {
    return { status: "success", result: body };
  }
  const fields =
    typeof body === "object" && body !== null
      ? (body as { error?: unknown; message?: unknown })
      : {};
  if (status === 400) {
    return {
      status: "invalid",
      message:
        typeof fields.message === "string"
          ? fields.message
          : "入力を確認してください",
    };
  }
  return {
    status: "unavailable",
    reason: isFailureCode(fields.error) ? fields.error : "unreachable",
  };
}

export function useJevTriage() {
  const [state, setState] = useState<JevTriageState>({ status: "idle" });
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    },
    [],
  );

  const run = useCallback(async (message: string) => {
    if (controllerRef.current) return;
    const controller = new AbortController();
    controllerRef.current = controller;
    const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
    setState({ status: "running" });

    let next: JevTriageState;
    try {
      const res = await fetch("/api/jev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });
      next = interpretJevResponse(
        res.status,
        await res.json().catch(() => null),
      );
    } catch {
      next = { status: "unavailable", reason: "unreachable" };
    }
    clearTimeout(timer);

    // アンマウント後は参照が外れている。その場合は状態を更新しない
    if (controllerRef.current !== controller) return;
    controllerRef.current = null;
    setState(next);
  }, []);

  return { state, run };
}
