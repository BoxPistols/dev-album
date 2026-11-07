import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { interpretJevResponse, useJevTriage } from "./useJevTriage";

const RESULT = {
  department: "billing",
  confidence: 0.95,
  urgent: 0.9,
  route: "auto",
  model: "jev-test",
  elapsedMs: 300,
  inputTokens: 420,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("interpretJevResponse", () => {
  it("判定がそろった200だけを成功にする", () => {
    expect(interpretJevResponse(200, RESULT)).toEqual({
      status: "success",
      result: RESULT,
    });
  });

  it("形の違う200は実呼び出しの結果として見せない", () => {
    expect(interpretJevResponse(200, { department: "billing" })).toEqual({
      status: "unavailable",
      reason: "unreachable",
    });
  });

  it("400は入力の問題として理由を出す", () => {
    expect(
      interpretJevResponse(400, {
        error: "invalid_request",
        message: "上限を超えています",
      }),
    ).toEqual({ status: "invalid", message: "上限を超えています" });
  });

  it.each([
    [503, "not_configured"],
    [429, "quota_exhausted"],
    [503, "global_kill"],
    [503, "judgement_failed"],
  ])("%iの%sを理由にする", (status, error) => {
    expect(interpretJevResponse(status, { error, route: "review" })).toEqual({
      status: "unavailable",
      reason: error,
    });
  });

  it.each([
    ["404", 404, null],
    ["JSON以外の500", 500, null],
    ["未知のコード", 503, { error: "toString" }],
  ])("%sは接続できない扱いにする", (_name, status, body) => {
    expect(interpretJevResponse(status, body)).toEqual({
      status: "unavailable",
      reason: "unreachable",
    });
  });
});

describe("useJevTriage", () => {
  it("messageだけを送り、結果を状態に入れる", async () => {
    const fetchMock = vi.fn(async () => Response.json(RESULT));
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => useJevTriage());

    await act(() => result.current.run("至急"));

    expect(result.current.state).toEqual({ status: "success", result: RESULT });
    const init = (fetchMock.mock.calls[0] as unknown[])[1] as RequestInit;
    expect(JSON.parse(String(init.body))).toEqual({ message: "至急" });
  });

  it("通信に失敗したら記録へ案内する状態になる", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("network");
      }),
    );
    const { result } = renderHook(() => useJevTriage());

    await act(() => result.current.run("至急"));

    expect(result.current.state).toEqual({
      status: "unavailable",
      reason: "unreachable",
    });
  });

  it("実行中の二重送信を送らない", async () => {
    let release: (res: Response) => void = () => {};
    const fetchMock = vi.fn(
      () => new Promise<Response>((resolve) => (release = resolve)),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => useJevTriage());

    act(() => {
      void result.current.run("1回目");
      void result.current.run("2回目");
    });
    expect(result.current.state).toEqual({ status: "running" });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => release(Response.json(RESULT)));
    await waitFor(() => expect(result.current.state.status).toBe("success"));
  });
});
