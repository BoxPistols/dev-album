import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";

export type Tier = "anonymous" | "byok";

export const TIER_CAPS: Record<Tier, number> = {
  anonymous: Number(process.env.CHAT_CAP_ANONYMOUS ?? 10),
  byok: Number.POSITIVE_INFINITY,
};

export const GLOBAL_DAILY_TOKEN_BUDGET = Number(
  process.env.CHAT_GLOBAL_DAILY_TOKENS ?? 1_000_000,
);

// trim() で env 末尾の改行混入 (echo で `vercel env add` した場合に発生) を吸収
export const QUOTA_POLICY_URL = (
  process.env.CHAT_QUOTA_POLICY_URL ??
  "https://dev-album.vercel.app/policy/chat-quota"
).trim();

const KEY_TTL_SECONDS = 172800;

let cachedRedis: Redis | null = null;
let redisChecked = false;

export function getRedis(): Redis | null {
  if (redisChecked) return cachedRedis;
  redisChecked = true;
  // Vercel Marketplace の Upstash 統合は KV_REST_API_* prefix で env を生成 (旧 Vercel KV 互換)。
  // 自前で UPSTASH_REDIS_REST_* を設定するケースもあるので両対応。
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}

export function sessionKey(ip: string, ua: string): string {
  const h = createHash("sha256");
  h.update(ip);
  h.update("|");
  h.update(ua);
  return h.digest("hex").slice(0, 32);
}

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nextUtcMidnightEpoch(): number {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

export function extractClientIp(
  xForwardedFor: string | string[] | undefined,
): string {
  if (!xForwardedFor) return "unknown";
  const raw = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor;
  return raw.split(",")[0].trim() || "unknown";
}

export interface QuotaCheckResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  globalKill: boolean;
}

/**
 * INCR / INCRBY は各コマンド単体で atomic。カウンタの単調増加は保証されるので、
 * cap 判定の正しさは複数コマンド間の atomicity に依存しない。EXPIRE は idempotent
 * なので並列に流して節約。
 */
export async function consumeQuota(
  redis: Redis,
  tier: Tier,
  sid: string,
  day: string,
  estimatedInputTokens: number,
): Promise<QuotaCheckResult> {
  if (tier === "byok") {
    return {
      allowed: true,
      remaining: Number.POSITIVE_INFINITY,
      limit: Number.POSITIVE_INFINITY,
      globalKill: false,
    };
  }

  const limit = TIER_CAPS[tier];
  const reqKey = `chat:${tier}:${sid}:${day}:requests`;
  const tokKey = `chat:${tier}:${sid}:${day}:tokens`;
  const globalKey = `chat:global:${day}:tokens`;

  try {
    const reqCount = Number(await redis.incr(reqKey));
    const globalTokens = Number(
      await redis.incrby(globalKey, estimatedInputTokens),
    );
    await redis.incrby(tokKey, estimatedInputTokens);
    await Promise.all([
      redis.expire(reqKey, KEY_TTL_SECONDS),
      redis.expire(tokKey, KEY_TTL_SECONDS),
      redis.expire(globalKey, KEY_TTL_SECONDS),
    ]);

    const globalKill = globalTokens > GLOBAL_DAILY_TOKEN_BUDGET;
    const remaining = Math.max(0, limit - reqCount);
    const allowed = reqCount <= limit && !globalKill;
    return { allowed, remaining, limit, globalKill };
  } catch {
    // Redis 障害時は fail-open: サービス継続を優先
    return { allowed: true, remaining: limit, limit, globalKill: false };
  }
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
