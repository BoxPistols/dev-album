import { describe, expect, it, vi } from "vitest";
import {
  consumeQuota,
  decideQuota,
  ipKey,
  normalizeClientIp,
  secondsUntilReset,
  sessionKey,
} from "../../../api/lib/quota";
import { readClientId } from "../../../api/lib/clientId";

describe("normalizeClientIp", () => {
  it("IPv4はそのまま", () => {
    expect(normalizeClientIp("203.0.113.5")).toBe("203.0.113.5");
  });

  it("::ffff: 付きのIPv4はIPv4に直す", () => {
    expect(normalizeClientIp("::ffff:203.0.113.5")).toBe("203.0.113.5");
  });

  it("16進表記の ::ffff: もIPv4に直す（別々のIPv4が同じキーにまとまらない）", () => {
    expect(normalizeClientIp("::ffff:cb00:7105")).toBe("203.0.113.5");
    expect(normalizeClientIp("::ffff:c633:6407")).toBe("198.51.100.7");
  });

  it("IPv6は/64に丸める（末尾だけ変えても同じ人として数える）", () => {
    const a = normalizeClientIp("2001:db8:1:2:aaaa:bbbb:cccc:dddd");
    const b = normalizeClientIp("2001:db8:1:2::1");
    expect(a).toBe("2001:db8:1:2::/64");
    expect(b).toBe(a);
  });

  it("角括弧とゾーンIDを外す", () => {
    expect(normalizeClientIp("[fe80::1%eth0]")).toBe("fe80:0:0:0::/64");
  });

  it("解釈できない値はそのまま返す", () => {
    expect(normalizeClientIp("unknown")).toBe("unknown");
  });
});

describe("ipKey / sessionKey", () => {
  it("IPのキーはUser-Agentに左右されない", () => {
    expect(ipKey("203.0.113.5")).toBe(ipKey("203.0.113.5"));
    expect(sessionKey("203.0.113.5", "A")).not.toBe(
      sessionKey("203.0.113.5", "B"),
    );
  });

  it("IPそのものはキーに含めない", () => {
    expect(ipKey("203.0.113.5")).not.toContain("203.0.113.5");
    expect(ipKey("203.0.113.5")).toMatch(/^[0-9a-f]{32}$/);
  });
});

describe("decideQuota", () => {
  const LIMIT = 10;
  const FLOOR = 3;
  const HARD = 50;

  it("IPの枠の範囲内なら通す", () => {
    expect(decideQuota(10, 10, LIMIT, FLOOR, HARD)).toEqual({
      allowed: true,
      remaining: 0,
    });
  });

  it("IPの枠を使い切った1人は、11回目で止まる", () => {
    expect(decideQuota(11, 11, LIMIT, FLOOR, HARD).allowed).toBe(false);
  });

  it("同じ回線の別の人は、IPの枠が尽きていても最低保証の回数まで使える", () => {
    expect(decideQuota(20, 1, LIMIT, FLOOR, HARD)).toEqual({
      allowed: true,
      remaining: 2,
    });
    expect(decideQuota(22, 3, LIMIT, FLOOR, HARD).allowed).toBe(true);
    expect(decideQuota(23, 4, LIMIT, FLOOR, HARD).allowed).toBe(false);
  });

  it("IPの絶対上限を超えたら、最低保証の範囲でも止める（IDを作り直し続ける使い方を防ぐ）", () => {
    expect(decideQuota(51, 1, LIMIT, FLOOR, HARD).allowed).toBe(false);
  });

  it("通常の枠を絶対上限より大きく設定しても、絶対上限は超えない", () => {
    expect(decideQuota(50, 50, 100, FLOOR, HARD)).toEqual({
      allowed: true,
      remaining: 0,
    });
    expect(decideQuota(51, 51, 100, FLOOR, HARD).allowed).toBe(false);
  });
});

describe("consumeQuota", () => {
  function fakeRedis(counts: Record<string, number> = {}) {
    return {
      incr: vi.fn(async (key: string) => (counts[key] = (counts[key] ?? 0) + 1)),
      incrby: vi.fn(async (key: string, n: number) => (counts[key] = (counts[key] ?? 0) + n)),
      expire: vi.fn(async () => 1),
    };
  }

  it("ブラウザのIDを変えても、IPごとの回数は共通で増える", async () => {
    const counts: Record<string, number> = {};
    const redis = fakeRedis(counts);
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 必要なメソッドだけの偽物
      await consumeQuota(redis as any, "anonymous", "203.0.113.5", `client-${i}`, "2026-11-21", 1);
    }
    const ipCounter = Object.entries(counts).find(([k]) => k.includes(":ip:"));
    expect(ipCounter?.[1]).toBe(10);
  });

  it("自前のキー（BYOK）は数えない", async () => {
    const redis = fakeRedis();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 必要なメソッドだけの偽物
    const r = await consumeQuota(redis as any, "byok", "203.0.113.5", "UA", "2026-11-21", 1);
    expect(r.allowed).toBe(true);
    expect(redis.incr).not.toHaveBeenCalled();
  });

  it("Redisのエラーでは通しつつ、エラーをログに残す", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const redis = {
      incr: vi.fn(async () => {
        throw new Error("down");
      }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- 必要なメソッドだけの偽物
    const r = await consumeQuota(redis as any, "anonymous", "203.0.113.5", "UA", "2026-11-21", 1);
    expect(r.allowed).toBe(true);
    expect(r.enforced).toBe(false);
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});

describe("readClientId", () => {
  it("randomUUIDの形だけを受け付ける", () => {
    expect(readClientId("3F2504E0-4F89-41D3-9A0C-0305E82C3301")).toBe(
      "3f2504e0-4f89-41d3-9a0c-0305e82c3301",
    );
    expect(readClientId("anything")).toBeNull();
    expect(readClientId(undefined)).toBeNull();
    expect(readClientId(["3f2504e0-4f89-41d3-9a0c-0305e82c3301"])).toBe(
      "3f2504e0-4f89-41d3-9a0c-0305e82c3301",
    );
  });
});

describe("secondsUntilReset", () => {
  it("1秒以上、1日以下", () => {
    const s = secondsUntilReset();
    expect(s).toBeGreaterThanOrEqual(1);
    expect(s).toBeLessThanOrEqual(86400);
  });
});
