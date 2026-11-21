import { afterEach, describe, expect, it, vi } from "vitest";
import { readClientId } from "../../../api/lib/clientId";
import { CLIENT_ID_STORAGE_KEY, clientIdHeaders, getClientId } from "./clientId";

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("getClientId", () => {
  it("初回に作ったIDを保存し、次からも同じIDを返す", () => {
    const first = getClientId();
    expect(localStorage.getItem(CLIENT_ID_STORAGE_KEY)).toBe(first);
    expect(getClientId()).toBe(first);
  });

  it("サーバーが受け付ける形のIDを作る", () => {
    expect(readClientId(getClientId())).not.toBeNull();
  });

  it("保存できない環境でも、同じ画面のあいだは同じIDを返す", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const a = getClientId();
    expect(getClientId()).toBe(a);
  });

  it("送信用のヘッダーにIDを入れる", () => {
    expect(clientIdHeaders()).toEqual({ "x-client-id": getClientId() });
  });
});
