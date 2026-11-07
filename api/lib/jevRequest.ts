/**
 * /api/jevのリクエスト検証と応答の形。本番（api/jev.ts）、dev（vite-api-plugin.ts）、
 * ページ（useJevTriage）で共有するので、SDKにもNodeの機能にも依存させない。
 *
 * 上限の根拠: Jevは入力トークンで課金されるので、問い合わせ1件に足りる長さで止める。
 * 教材のRoute Handlerの例と同じ2,000文字にする。
 */
export const MAX_JEV_MESSAGE_CHARS = 2_000;

export const JEV_DEPARTMENTS = [
  "billing",
  "technical",
  "sales",
  "other",
] as const;

export type JevDepartment = (typeof JEV_DEPARTMENTS)[number];

export type JevRoute = "auto" | "review";

export interface JevTriageResult {
  department: JevDepartment;
  confidence: number;
  urgent: number;
  route: JevRoute;
  /** 実際に使われた版のID */
  model: string;
  /** サーバーがJevの応答を待った時間 */
  elapsedMs: number;
  /** APIが報告しなかったときはnull */
  inputTokens: number | null;
}

export type JevFailureCode =
  "not_configured" | "quota_exhausted" | "global_kill" | "judgement_failed";

export const JEV_FAILURE_MESSAGES: Record<JevFailureCode, string> = {
  not_configured: "この環境にはJevのAPIキーが設定されていません。",
  quota_exhausted: "今日の無料枠を使い切りました。枠はAIチャットと共通です。",
  global_kill: "本日の全体枠が上限に達したため、実行を停止しています。",
  judgement_failed:
    "Jevの判定を取得できませんでした。判定できなかった問い合わせは、人の確認に回します。",
};

export interface JevFailureBody {
  error: JevFailureCode;
  /** 判定が取れなかったときは必ず人の確認に倒す */
  route: "review";
  message: string;
}

export function jevFailure(code: JevFailureCode): JevFailureBody {
  return { error: code, route: "review", message: JEV_FAILURE_MESSAGES[code] };
}

/** ボディから受け取るのはmessageだけ。ほかのフィールドは読まない */
export function readJevMessage(body: unknown): unknown {
  if (typeof body !== "object" || body === null) return undefined;
  return (body as { message?: unknown }).message;
}

/** 問題があれば理由の文を返す。問題がなければnull */
export function validateJevRequest(message: unknown): string | null {
  if (typeof message !== "string") {
    return "messageは文字列で指定してください";
  }
  if (message.trim().length === 0) {
    return "messageを入力してください";
  }
  if (message.length > MAX_JEV_MESSAGE_CHARS) {
    return `messageが上限（${MAX_JEV_MESSAGE_CHARS}文字）を超えています`;
  }
  return null;
}

function isProbability(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  );
}

/** 判定の値がそろっているときだけtrue。欠けた応答を判定として扱わない */
export function isJevTriageResult(value: unknown): value is JevTriageResult {
  if (typeof value !== "object" || value === null) return false;
  const r = value as Record<string, unknown>;
  return (
    JEV_DEPARTMENTS.some((d) => d === r.department) &&
    isProbability(r.confidence) &&
    isProbability(r.urgent) &&
    (r.route === "auto" || r.route === "review") &&
    typeof r.model === "string" &&
    r.model.length > 0 &&
    typeof r.elapsedMs === "number" &&
    Number.isFinite(r.elapsedMs) &&
    (r.inputTokens === null ||
      (typeof r.inputTokens === "number" && Number.isFinite(r.inputTokens)))
  );
}
