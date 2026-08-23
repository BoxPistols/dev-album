import { describe, it, expect } from "vitest";
// @ts-expect-error -- .mjs の素の JS を型定義なしで読む
import {
  decideOutcome,
  UNREACHABLE_LIMIT,
} from "../../../scripts/verify-verdicts.mjs";

// ============================================================
// 定期検査を赤にするかの判定
//
// 2026-08-23 の実測で、703 URL のうち 3 件が GitHub Actions のランナーからだけ
// 取れなかった（orval.dev が 403、web.archive.org が無応答）。ローカルでは 0 件。
// この 3 件で毎週赤くすると、issue #102 が書いていた「偽の失敗で通知が鳴り続ける
// 仕組みは、結局止められて意味を失う」に落ちる。
//
// 一方で、取得失敗を一律に無視すると「1 件も照合していないのに緑」に戻る。
// これは以前に実際に起きた事故なので、割合で分ける。
// ============================================================

const base = { mismatched: 0, problems: 0, unreachable: 0, attempted: 100 };

describe("定期検査の赤/緑の判定", () => {
  it("すべて取れて一致していれば緑", () => {
    expect(decideOutcome(base).failed).toBe(false);
  });

  it("不一致は 1 件でも赤にする（原文が変わった合図なので見逃さない）", () => {
    expect(decideOutcome({ ...base, mismatched: 1 }).failed).toBe(true);
  });

  it("判定データの不備は 1 件でも赤にする", () => {
    expect(decideOutcome({ ...base, problems: 1 }).failed).toBe(true);
  });

  it("取得失敗が閾値以内なら赤にしない", () => {
    const r = decideOutcome({ ...base, unreachable: 3, attempted: 703 });
    expect(r.tooManyUnreachable).toBe(false);
    expect(r.failed).toBe(false);
  });

  it("取得失敗が閾値を超えたら赤にする（検査そのものが動いていない）", () => {
    const over = Math.ceil(100 * UNREACHABLE_LIMIT) + 1;
    const r = decideOutcome({ ...base, unreachable: over });
    expect(r.tooManyUnreachable).toBe(true);
    expect(r.failed).toBe(true);
  });

  it("1 件も照合できていなければ赤にする（0 件成功を緑にしない）", () => {
    expect(
      decideOutcome({ ...base, unreachable: 0, attempted: 0 }).failed,
    ).toBe(true);
  });

  it("閾値以内の取得失敗でも、不一致があれば赤のまま", () => {
    const r = decideOutcome({
      ...base,
      mismatched: 1,
      unreachable: 3,
      attempted: 703,
    });
    expect(r.tooManyUnreachable).toBe(false);
    expect(r.failed).toBe(true);
  });
});
