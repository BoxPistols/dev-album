import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import {
  consumeQuota,
  estimateTokens,
  extractClientIp,
  getRedis,
  nextUtcMidnightEpoch,
  QUOTA_POLICY_URL,
  redeemInvite,
  sessionKey,
  TIER_CAPS,
  todayUtc,
  type InviteFailCode,
  type Tier,
} from "./lib/quota.js";

interface ChatRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  systemPrompt: string;
  model?: string;
  provider?: "openai" | "gemini";
  userApiKey?: string;
  inviteCode?: string;
}

const PREMIUM_MODELS = ["gpt-5.4-mini"];

// 低コスト帯のモデルは出力上限を抑え、無料枠の消費を緩やかにする
const COMPACT_MODELS = ["nano", "luna"];

function getClient(
  provider: string,
  userApiKey?: string,
): { client: OpenAI; defaultModel: string } | null {
  if (provider === "gemini") {
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return {
      client: new OpenAI({
        apiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      }),
      defaultModel: "gemini-2.5-flash",
    };
  }
  const apiKey = userApiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return {
    client: new OpenAI({ apiKey }),
    defaultModel: "gpt-5.6-luna",
  };
}

/** 200 / 429 / 503 すべてに付与する共通ヘッダ */
function setCommonHeaders(
  res: VercelResponse,
  tier: Tier,
  remaining: number | null,
  limit: number | null,
  inviteFail: InviteFailCode | null,
) {
  res.setHeader("X-Chat-Tier", tier);
  res.setHeader("X-Chat-Quota-Policy", QUOTA_POLICY_URL);
  res.setHeader("X-RateLimit-Reset", String(nextUtcMidnightEpoch()));
  if (limit !== null && Number.isFinite(limit)) {
    res.setHeader("X-RateLimit-Limit", String(limit));
  }
  if (remaining !== null && Number.isFinite(remaining)) {
    res.setHeader("X-RateLimit-Remaining", String(remaining));
  }
  if (inviteFail) {
    res.setHeader("X-Invite-Fail", inviteFail);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, systemPrompt, model, provider, userApiKey, inviteCode } =
    req.body as ChatRequestBody;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages is required" });
  }

  const resolvedProvider = provider || "openai";

  if (model && PREMIUM_MODELS.includes(model) && !userApiKey) {
    return res
      .status(403)
      .json({ error: "このモデルの利用には API キーの設定が必要です" });
  }

  // ── Tier 判定 + quota consume ──
  const redis = getRedis();
  const ip = extractClientIp(req.headers["x-forwarded-for"]);
  const ua = String(req.headers["user-agent"] ?? "unknown");

  let tier: Tier = userApiKey ? "byok" : "anonymous";
  let inviteFail: InviteFailCode | null = null;

  if (!userApiKey && inviteCode && redis) {
    const sid = sessionKey(ip, ua, inviteCode);
    const result = await redeemInvite(redis, inviteCode, sid);
    if (result.ok) {
      tier = "invited";
    } else {
      inviteFail = result.err;
    }
  }

  const sid = sessionKey(ip, ua, tier === "invited" ? inviteCode : undefined);
  const day = todayUtc();
  const estimatedInput = messages.reduce(
    (sum, m) => sum + estimateTokens(m.content),
    systemPrompt ? estimateTokens(systemPrompt) : 0,
  );

  let remaining: number | null = null;
  let limit: number | null = null;
  let globalKill = false;
  let allowed = true;

  if (redis) {
    const result = await consumeQuota(redis, tier, sid, day, estimatedInput);
    remaining = Number.isFinite(result.remaining) ? result.remaining : null;
    limit = Number.isFinite(result.limit) ? result.limit : null;
    globalKill = result.globalKill;
    allowed = result.allowed;
  } else if (tier !== "byok") {
    // Redis 未設定: カウンタなしで運用、残量は tier cap をそのまま表示 (情報提供のみ)
    limit = Number.isFinite(TIER_CAPS[tier]) ? TIER_CAPS[tier] : null;
  }

  // ── ヘッダ設定 (エラー応答にも必須) ──
  setCommonHeaders(res, tier, remaining, limit, inviteFail);

  // Global kill switch
  if (globalKill && tier !== "byok") {
    res.setHeader("X-Chat-Kill-Switch", "true");
    return res.status(503).json({
      error: "global_kill",
      message: "本日の全体枠が上限に達したため、匿名アクセスを停止しています。",
    });
  }

  // Tier quota exhausted
  if (!allowed) {
    res.setHeader("X-Invite-Fail", "exceeded_tier_rate_limit");
    return res.status(429).json({
      error: "quota_exhausted",
      tier,
      message: "今日の無料枠を使い切りました。",
    });
  }

  const config = getClient(resolvedProvider, userApiKey);
  if (!config) {
    return res.status(503).json({ error: "API key not configured" });
  }

  const resolvedModel = model || config.defaultModel;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const maxTokens = COMPACT_MODELS.some((m) => resolvedModel.includes(m))
      ? 2048
      : 4096;

    const stream = await config.client.chat.completions.create({
      model: resolvedModel,
      max_completion_tokens: maxTokens,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt || "" },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: message });
    }
  }
}
