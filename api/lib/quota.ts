import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";

export type Tier = "anonymous" | "byok";

// 匿名の上限はIPアドレスごとに数える。User-Agentを変えるだけで枠が増えないようにするため
export const TIER_CAPS: Record<Tier, number> = {
  anonymous: Number(process.env.CHAT_CAP_ANONYMOUS ?? 10),
  byok: Number.POSITIVE_INFINITY,
};

// IPの枠を同じ回線の人（社内・学校のNATなど）が使い切っても、ブラウザごとにこの回数までは使える
export const CLIENT_FLOOR = Number(process.env.CHAT_FLOOR_PER_CLIENT ?? 3);

// 最低保証を取り直す（User-Agentを変え続ける）使い方を止める、IPごとの絶対上限
export const IP_HARD_CAP = Number(process.env.CHAT_CAP_IP_HARD ?? 50);

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
  if (!url || !token) {
    // 数えずに通すので、制限が外れていることをログに残す（インスタンスごとに1回）
    console.warn(
      "[quota] Redisの接続情報が無いため、回数制限をかけずに受け付けています。" +
        "KV_REST_API_URL/KV_REST_API_TOKEN（またはUPSTASH_REDIS_REST_*）を設定し、再デプロイしてください。",
    );
    return null;
  }
  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}

/**
 * 数えるキー用にIPを正規化する
 * - ::ffff:a.b.c.dの形はIPv4に直す（同じ人が2つのキーで数えられるのを防ぐ）
 * - IPv6は/64に丸める（末尾を変えるだけで別人扱いになるのを防ぐ）
 */
export function normalizeClientIp(raw: string): string {
  let ip = raw.trim();
  if (ip.startsWith("[") && ip.endsWith("]")) ip = ip.slice(1, -1);
  const zone = ip.indexOf("%");
  if (zone !== -1) ip = ip.slice(0, zone);

  const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped) return mapped[1];
  if (!ip.includes(":")) return ip;

  const halves = ip.split("::");
  if (halves.length > 2) return ip;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return ip;
  const groups = [
    ...head,
    ...Array<string>(halves.length === 2 ? missing : 0).fill("0"),
    ...tail,
  ];
  if (!groups.every((g) => /^[0-9a-f]{1,4}$/i.test(g))) return ip;
  // 16進表記のIPv4-mapped（::ffff:cb00:7105 = 203.0.113.5）もIPv4に直す。
  // 直さないと、異なるIPv4が同じ/64のキーにまとまってしまう
  const values = groups.map((g) => parseInt(g, 16));
  if (values.slice(0, 5).every((v) => v === 0) && values[5] === 0xffff) {
    return [values[6] >> 8, values[6] & 0xff, values[7] >> 8, values[7] & 0xff].join(".");
  }
  return `${groups
    .slice(0, 4)
    .map((g) => parseInt(g, 16).toString(16))
    .join(":")}::/64`;
}

function hash32(...parts: string[]): string {
  const h = createHash("sha256");
  h.update(parts.join("|"));
  return h.digest("hex").slice(0, 32);
}

/** IPアドレスごとのID。IPそのものは保存しない */
export function ipKey(ip: string): string {
  return hash32(normalizeClientIp(ip));
}

/**
 * ブラウザごとのID。最低保証とトークン量の集計に使う。
 * 引数clientはブラウザが送るランダムなID（api/lib/clientId.ts）。送られないときは呼び出し側がUser-Agentで代える
 */
export function sessionKey(ip: string, client: string): string {
  return hash32(normalizeClientIp(ip), client);
}

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nextUtcMidnightEpoch(): number {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

/** 429のRetry-Afterに入れる、UTC 0時までの秒数 */
export function secondsUntilReset(): number {
  return Math.max(1, nextUtcMidnightEpoch() - Math.floor(Date.now() / 1000));
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
  /** 実際に数えられたか。Redisの障害で数えずに通したときはfalse */
  enforced: boolean;
}

/**
 * IPごとの回数と、ブラウザごとの回数から、受け付けるかを決める。
 * IPの枠（limit）が残っていれば通す。尽きていても、そのブラウザが最低保証（floor）の範囲内で、
 * IPの絶対上限（hardCap）に達していなければ通す。
 */
export function decideQuota(
  ipCount: number,
  clientCount: number,
  limit: number,
  floor: number,
  hardCap: number,
): { allowed: boolean; remaining: number } {
  // 絶対上限はどの経路にもかける（通常の枠を絶対上限より大きく設定した場合も超えない）
  const underHard = ipCount <= hardCap;
  const byIp = ipCount <= limit;
  const byFloor = clientCount <= floor;
  const remaining = Math.max(
    0,
    Math.min(Math.max(limit - ipCount, floor - clientCount), hardCap - ipCount),
  );
  return { allowed: underHard && (byIp || byFloor), remaining };
}

/**
 * INCR / INCRBY は各コマンド単体で atomic。カウンタの単調増加は保証されるので、
 * cap 判定の正しさは複数コマンド間の atomicity に依存しない。EXPIRE は idempotent
 * なので並列に流して節約。
 */
export async function consumeQuota(
  redis: Redis,
  tier: Tier,
  ip: string,
  client: string,
  day: string,
  estimatedInputTokens: number,
): Promise<QuotaCheckResult> {
  if (tier === "byok") {
    return {
      allowed: true,
      remaining: Number.POSITIVE_INFINITY,
      limit: Number.POSITIVE_INFINITY,
      globalKill: false,
      enforced: true,
    };
  }

  const limit = TIER_CAPS[tier];
  const sid = sessionKey(ip, client);
  const ipReqKey = `chat:${tier}:ip:${ipKey(ip)}:${day}:requests`;
  const reqKey = `chat:${tier}:${sid}:${day}:requests`;
  const tokKey = `chat:${tier}:${sid}:${day}:tokens`;
  const globalKey = `chat:global:${day}:tokens`;

  try {
    const ipCount = Number(await redis.incr(ipReqKey));
    const clientCount = Number(await redis.incr(reqKey));
    const globalTokens = Number(
      await redis.incrby(globalKey, estimatedInputTokens),
    );
    await redis.incrby(tokKey, estimatedInputTokens);
    await Promise.all([
      redis.expire(ipReqKey, KEY_TTL_SECONDS),
      redis.expire(reqKey, KEY_TTL_SECONDS),
      redis.expire(tokKey, KEY_TTL_SECONDS),
      redis.expire(globalKey, KEY_TTL_SECONDS),
    ]);

    const globalKill = globalTokens > GLOBAL_DAILY_TOKEN_BUDGET;
    const decision = decideQuota(
      ipCount,
      clientCount,
      limit,
      CLIENT_FLOOR,
      IP_HARD_CAP,
    );
    return {
      allowed: decision.allowed && !globalKill,
      remaining: decision.remaining,
      limit,
      globalKill,
      enforced: true,
    };
  } catch (error) {
    // Redisの障害時は通す（サービスの継続を優先）。制限が外れていることはログに残す
    console.error(
      "[quota] Redisのエラーのため、回数制限をかけずに受け付けました:",
      error instanceof Error ? error.message : String(error),
    );
    return {
      allowed: true,
      remaining: limit,
      limit,
      globalKill: false,
      enforced: false,
    };
  }
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
