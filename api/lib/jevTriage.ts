import { TypeSafeClient, type Questions } from "@typesafe-ai/sdk";
import {
  isJevTriageResult,
  type JevRoute,
  type JevTriageResult,
} from "./jevRequest.js";

/**
 * 送れる質問はこの定義だけ。リクエストから質問を受けないことで、
 * サーバのキーで任意の判定を走らせられないようにする（chatModels.tsの許可リストと同じ考え方）。
 * 内容はJevTriageApp.tsxの教材のコード例と同じで、implementation-drift.test.tsが突き合わせる。
 */
export const TRIAGE_QUESTIONS = {
  department: {
    type: "choice",
    instructions: "この問い合わせを担当すべきチーム",
    criteria: {
      billing: "請求、支払い、返金、領収書、解約後の請求",
      technical: "不具合、エラー、設定方法、連携の失敗",
      sales: "料金プラン、見積もり、導入前の相談",
      other:
        "上のどれにも当てはまらない。お礼、感想、雑談など、対応を求めていない内容",
    },
  },
  is_urgent: {
    type: "noul",
    instructions: "このメッセージは、今日中の対応が要る緊急の内容である",
  },
} as const satisfies Questions;

// 教材のlib/triage.tsと同じ値
export const CONFIDENCE_THRESHOLD = 0.8;
export const URGENT_LOW = 0.3;
export const URGENT_HIGH = 0.7;

/** SDKの既定は1回10秒でリトライ2回。待ち時間の上限を教材の例と同じ5秒にする */
const TIMEOUT_MS = 5_000;

export function decideRoute(confidence: number, urgent: number): JevRoute {
  if (confidence < CONFIDENCE_THRESHOLD) return "review";
  if (urgent > URGENT_LOW && urgent < URGENT_HIGH) return "review";
  return "auto";
}

/**
 * Jevへ1回問い合わせる。判定が取れなければ例外を投げ、呼び出し側が安全側へ倒す。
 * クライアントはキーの無い環境でコンストラクタが例外を投げるので、リクエストの中で作る。
 */
export async function triageMessage(
  apiKey: string,
  message: string,
): Promise<JevTriageResult> {
  const client = new TypeSafeClient({
    apiKey,
    timeout: TIMEOUT_MS,
    retry: { maxRetries: 0 },
    // TYPESAFE_LOG_LEVEL=debugだと本文がログに出る。入力をサーバーのログへ残さない
    logLevel: "off",
  });

  const started = performance.now();
  const response = await client.systemOne({
    state: message,
    questions: TRIAGE_QUESTIONS,
  });
  const elapsedMs = Math.round(performance.now() - started);

  const { department, is_urgent } = response.answers;
  const result = {
    department: department.choice,
    confidence: department.confidence,
    urgent: is_urgent.noul,
    route: decideRoute(department.confidence, is_urgent.noul),
    model: response.model,
    elapsedMs,
    inputTokens: response.usage?.input_tokens ?? null,
  };
  if (!isJevTriageResult(result)) {
    throw new Error("Jevの応答の形が想定と違う");
  }
  return result;
}
