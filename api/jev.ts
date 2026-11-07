import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  consumeQuota,
  estimateTokens,
  extractClientIp,
  getRedis,
  nextUtcMidnightEpoch,
  QUOTA_POLICY_URL,
  sessionKey,
  TIER_CAPS,
  todayUtc,
  type Tier,
} from "./lib/quota.js";
import {
  jevFailure,
  readJevMessage,
  validateJevRequest,
} from "./lib/jevRequest.js";
import { TRIAGE_QUESTIONS, triageMessage } from "./lib/jevTriage.js";

/** 自前のキーを受け取らないので、層は常に匿名。枠はAIチャットと同じカウンタを使う */
const TIER: Tier = "anonymous";

/** 課金は質問の定義も含む入力全体に掛かるので、質問の分も見積もりに入れる */
const QUESTIONS_TEXT = JSON.stringify(TRIAGE_QUESTIONS);

/** 200 / 429 / 503 すべてに付与する共通ヘッダ。api/chat.tsと同じ形 */
function setCommonHeaders(
  res: VercelResponse,
  remaining: number | null,
  limit: number | null,
) {
  res.setHeader("X-Chat-Tier", TIER);
  res.setHeader("X-Chat-Quota-Policy", QUOTA_POLICY_URL);
  res.setHeader("X-RateLimit-Reset", String(nextUtcMidnightEpoch()));
  if (limit !== null) res.setHeader("X-RateLimit-Limit", String(limit));
  if (remaining !== null) {
    res.setHeader("X-RateLimit-Remaining", String(remaining));
  }
}

/** @vercel/nodeのreq.bodyは、JSONが壊れていると読んだ時点で例外を投げる */
function readBody(req: VercelRequest): unknown {
  try {
    return req.body;
  } catch {
    return undefined;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 検証は枠の消費より先に行う。形の悪いリクエストで利用者の枠を減らさない
  const message = readJevMessage(readBody(req));
  const problem = validateJevRequest(message);
  if (problem) {
    return res.status(400).json({ error: "invalid_request", message: problem });
  }
  const text = message as string;

  // 枠はAIチャットと共用なので、キーの無い環境で押しただけでチャットの回数を減らさない
  const apiKey = process.env.TYPESAFE_API_KEY?.trim();
  if (!apiKey) {
    setCommonHeaders(res, null, null);
    return res.status(503).json(jevFailure("not_configured"));
  }

  // ── quota consume。Redis未設定時の扱いはapi/chat.tsと同じ ──
  const redis = getRedis();
  let remaining: number | null = null;
  let limit: number | null = null;
  let globalKill = false;
  let allowed = true;

  if (redis) {
    const ip = extractClientIp(req.headers["x-forwarded-for"]);
    const ua = String(req.headers["user-agent"] ?? "unknown");
    const result = await consumeQuota(
      redis,
      TIER,
      sessionKey(ip, ua),
      todayUtc(),
      estimateTokens(text + QUESTIONS_TEXT),
    );
    remaining = Number.isFinite(result.remaining) ? result.remaining : null;
    limit = Number.isFinite(result.limit) ? result.limit : null;
    globalKill = result.globalKill;
    allowed = result.allowed;
  } else {
    // Redis 未設定: カウンタなしで運用、残量は tier cap をそのまま表示 (情報提供のみ)
    limit = Number.isFinite(TIER_CAPS[TIER]) ? TIER_CAPS[TIER] : null;
  }

  setCommonHeaders(res, remaining, limit);

  if (globalKill) {
    res.setHeader("X-Chat-Kill-Switch", "true");
    return res.status(503).json(jevFailure("global_kill"));
  }

  if (!allowed) {
    return res
      .status(429)
      .json({ ...jevFailure("quota_exhausted"), tier: TIER });
  }

  try {
    return res.status(200).json(await triageMessage(apiKey, text));
  } catch {
    // 判定できなかったときは人の確認に倒す。例外の文面は外へ返さない
    return res.status(503).json(jevFailure("judgement_failed"));
  }
}
