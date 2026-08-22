import { describe, it, expect } from "vitest";
import { parsePort, resolveDevPort } from "./port";

describe("parsePort", () => {
  it("未指定は undefined", () => {
    expect(parsePort(undefined)).toBeUndefined();
    expect(parsePort("")).toBeUndefined();
  });

  it("正しい値はそのまま返す", () => {
    expect(parsePort("3400")).toBe(3400);
    expect(parsePort("1")).toBe(1);
    expect(parsePort("65535")).toBe(65535);
  });

  it("不正な値は例外にする（黙って NaN を通さない）", () => {
    for (const bad of ["abc", "0", "65536", "-1", "3400.5", "3400abc", " "]) {
      expect(() => parsePort(bad), bad).toThrow(/1〜65535/);
    }
  });
});

describe("resolveDevPort", () => {
  it("PORT があればその値", () => {
    expect(resolveDevPort("3456")).toBe(3456);
  });

  it("未指定なら 30000-39999 の範囲", () => {
    for (let i = 0; i < 50; i++) {
      const p = resolveDevPort(undefined);
      expect(p).toBeGreaterThanOrEqual(30000);
      expect(p).toBeLessThan(40000);
      expect(Number.isInteger(p)).toBe(true);
    }
  });
});
