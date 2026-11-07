import { beforeEach, describe, expect, it, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../../../api/jev";
import { consumeQuota, getRedis } from "../../../api/lib/quota";
import {
  isJevTriageResult,
  MAX_JEV_MESSAGE_CHARS,
  readJevMessage,
  validateJevRequest,
} from "../../../api/lib/jevRequest";
import { decideRoute, TRIAGE_QUESTIONS } from "../../../api/lib/jevTriage";

const sdk = vi.hoisted(() => ({
  systemOne: vi.fn(),
  constructed: [] as unknown[],
}));

vi.mock("@typesafe-ai/sdk", () => ({
  TypeSafeClient: class {
    systemOne = sdk.systemOne;
    constructor(config: unknown) {
      sdk.constructed.push(config);
    }
  },
}));

vi.mock("../../../api/lib/quota", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../../api/lib/quota")>()),
  getRedis: vi.fn(),
  consumeQuota: vi.fn(),
}));

const API_KEY = "test-key-not-real";

const SDK_RESPONSE = {
  model: "jev-test",
  answers: {
    department: {
      type: "choice",
      choice: "billing",
      confidence: 0.95,
      probabilities: {},
    },
    is_urgent: { type: "noul", noul: 0.9 },
  },
  usage: { input_tokens: 420, output_tokens: 0 },
};

function mockRes() {
  const headers: Record<string, string> = {};
  const out: { status: number; body: unknown } = { status: 0, body: undefined };
  const res = {
    setHeader(name: string, value: string) {
      headers[name] = value;
      return res;
    },
    status(code: number) {
      out.status = code;
      return res;
    },
    json(body: unknown) {
      out.body = body;
      return res;
    },
  };
  return { res: res as unknown as VercelResponse, headers, out };
}

function post(body: unknown) {
  return { method: "POST", body, headers: {} } as unknown as VercelRequest;
}

async function call(req: VercelRequest) {
  const mock = mockRes();
  await handler(req, mock.res);
  return mock;
}

/** 判定の値が1つも応答に含まれないことを確かめる */
function expectNoVerdict(body: unknown) {
  expect(body).toMatchObject({ route: "review" });
  for (const key of ["department", "confidence", "urgent"]) {
    expect(body).not.toHaveProperty(key);
  }
}

beforeEach(() => {
  vi.clearAllMocks();
  sdk.constructed.length = 0;
  sdk.systemOne.mockResolvedValue(SDK_RESPONSE);
  vi.stubEnv("TYPESAFE_API_KEY", API_KEY);
  vi.mocked(getRedis).mockReturnValue({} as ReturnType<typeof getRedis>);
  vi.mocked(consumeQuota).mockResolvedValue({
    allowed: true,
    remaining: 9,
    limit: 10,
    globalKill: false,
  });
});

describe("validateJevRequest", () => {
  it("上限ちょうどの文字列を通す", () => {
    expect(validateJevRequest("あ".repeat(MAX_JEV_MESSAGE_CHARS))).toBeNull();
  });

  it("上限を1文字超えると理由を返す", () => {
    expect(
      validateJevRequest("あ".repeat(MAX_JEV_MESSAGE_CHARS + 1)),
    ).toContain("上限");
  });

  it.each([[undefined], [null], [1], [["a"]], [{ text: "a" }]])(
    "文字列でない値を弾く: %j",
    (value) => {
      expect(validateJevRequest(value)).toContain("文字列");
    },
  );

  it.each([[""], ["   "], ["\n\t"]])("空の入力を弾く: %j", (value) => {
    expect(validateJevRequest(value)).toContain("入力");
  });
});

describe("readJevMessage", () => {
  it("オブジェクトのmessageだけを取り出す", () => {
    expect(readJevMessage({ message: "a", questions: {} })).toBe("a");
  });

  it.each([[null], [undefined], ["text"]])("形の違うボディ: %j", (body) => {
    expect(readJevMessage(body)).toBeUndefined();
  });
});

describe("isJevTriageResult", () => {
  const valid = {
    department: "billing",
    confidence: 0.9,
    urgent: 0.1,
    route: "auto",
    model: "jev-test",
    elapsedMs: 300,
    inputTokens: null,
  };

  it("そろった結果を通す", () => {
    expect(isJevTriageResult(valid)).toBe(true);
  });

  it.each([
    ["未知のラベル", { department: "legal" }],
    ["NaN", { confidence: Number.NaN }],
    ["範囲外", { urgent: 1.2 }],
    ["未知のroute", { route: "ok" }],
    ["空のmodel", { model: "" }],
  ])("%sを弾く", (_name, patch) => {
    expect(isJevTriageResult({ ...valid, ...patch })).toBe(false);
  });
});

describe("decideRoute", () => {
  it("confidenceが低い判定と緊急度が中間の判定は人の確認に回す", () => {
    expect(decideRoute(0.79, 0.9)).toBe("review");
    expect(decideRoute(0.95, 0.5)).toBe("review");
  });

  it("線の外側は自動にする", () => {
    expect(decideRoute(0.8, 0.3)).toBe("auto");
    expect(decideRoute(0.8, 0.7)).toBe("auto");
  });
});

describe("POST /api/jev", () => {
  it("POST以外は405", async () => {
    const { out } = await call({
      method: "GET",
      headers: {},
    } as unknown as VercelRequest);
    expect(out.status).toBe(405);
  });

  it("キーが無ければ503で、枠もAPIも使わない", async () => {
    vi.stubEnv("TYPESAFE_API_KEY", "");
    const { out, headers } = await call(post({ message: "至急" }));
    expect(out.status).toBe(503);
    expect(out.body).toMatchObject({ error: "not_configured" });
    expectNoVerdict(out.body);
    expect(headers["X-Chat-Tier"]).toBe("anonymous");
    expect(consumeQuota).not.toHaveBeenCalled();
    expect(sdk.constructed).toHaveLength(0);
    expect(sdk.systemOne).not.toHaveBeenCalled();
  });

  it("空白だけのキーも無いものとして扱う", async () => {
    vi.stubEnv("TYPESAFE_API_KEY", " \n");
    const { out } = await call(post({ message: "至急" }));
    expect(out.status).toBe(503);
  });

  it.each([
    ["messageが無い", {}],
    ["文字列でない", { message: 1 }],
    ["空白だけ", { message: "  " }],
    ["長すぎる", { message: "あ".repeat(MAX_JEV_MESSAGE_CHARS + 1) }],
    ["ボディが文字列", "text"],
  ])("不正な入力は400で、枠を消費しない: %s", async (_name, body) => {
    const { out } = await call(post(body));
    expect(out.status).toBe(400);
    expect(out.body).toMatchObject({ error: "invalid_request" });
    expect(consumeQuota).not.toHaveBeenCalled();
    expect(sdk.systemOne).not.toHaveBeenCalled();
  });

  it("壊れたJSONでreq.bodyが例外を投げても400で返す", async () => {
    const req = {
      method: "POST",
      headers: {},
      get body() {
        throw new Error("Invalid JSON");
      },
    } as unknown as VercelRequest;
    const { out } = await call(req);
    expect(out.status).toBe(400);
  });

  it("枠を超えたら429で、APIを呼ばない", async () => {
    vi.mocked(consumeQuota).mockResolvedValue({
      allowed: false,
      remaining: 0,
      limit: 10,
      globalKill: false,
    });
    const { out, headers } = await call(post({ message: "至急" }));
    expect(out.status).toBe(429);
    expect(out.body).toMatchObject({
      error: "quota_exhausted",
      tier: "anonymous",
    });
    expectNoVerdict(out.body);
    expect(headers["X-RateLimit-Remaining"]).toBe("0");
    expect(headers["X-RateLimit-Limit"]).toBe("10");
    expect(sdk.systemOne).not.toHaveBeenCalled();
  });

  it("全体枠に達したら503でkill switchのヘッダを付ける", async () => {
    vi.mocked(consumeQuota).mockResolvedValue({
      allowed: false,
      remaining: 5,
      limit: 10,
      globalKill: true,
    });
    const { out, headers } = await call(post({ message: "至急" }));
    expect(out.status).toBe(503);
    expect(out.body).toMatchObject({ error: "global_kill" });
    expect(headers["X-Chat-Kill-Switch"]).toBe("true");
    expect(sdk.systemOne).not.toHaveBeenCalled();
  });

  it("SDKの例外は安全側に倒し、例外の文面を返さない", async () => {
    sdk.systemOne.mockRejectedValue(new Error("secret upstream detail"));
    const { out } = await call(post({ message: "至急" }));
    expect(out.status).toBe(503);
    expect(out.body).toMatchObject({ error: "judgement_failed" });
    expectNoVerdict(out.body);
    expect(JSON.stringify(out.body)).not.toContain("secret upstream detail");
  });

  it.each([
    ["answersが無い", { model: "jev-test", usage: {} }],
    [
      "選択肢に無いラベル",
      {
        ...SDK_RESPONSE,
        answers: {
          ...SDK_RESPONSE.answers,
          department: { choice: "legal", confidence: 1 },
        },
      },
    ],
    [
      "noulが欠けている",
      {
        ...SDK_RESPONSE,
        answers: { ...SDK_RESPONSE.answers, is_urgent: {} },
      },
    ],
  ])("応答の形が違えば安全側に倒す: %s", async (_name, response) => {
    sdk.systemOne.mockResolvedValue(response);
    const { out } = await call(post({ message: "至急" }));
    expect(out.status).toBe(503);
    expectNoVerdict(out.body);
  });

  it("成功すると判定と応答時間と入力トークンを返す", async () => {
    const { out, headers } = await call(post({ message: "至急" }));
    expect(out.status).toBe(200);
    expect(out.body).toMatchObject({
      department: "billing",
      confidence: 0.95,
      urgent: 0.9,
      route: "auto",
      model: "jev-test",
      inputTokens: 420,
    });
    expect(isJevTriageResult(out.body)).toBe(true);
    expect(headers["X-RateLimit-Remaining"]).toBe("9");
    expect(consumeQuota).toHaveBeenCalledTimes(1);
  });

  it("input_tokensがnullならnullのまま返す", async () => {
    sdk.systemOne.mockResolvedValue({
      ...SDK_RESPONSE,
      usage: { input_tokens: null, output_tokens: null },
    });
    const { out } = await call(post({ message: "至急" }));
    expect(out.status).toBe(200);
    expect(out.body).toMatchObject({ inputTokens: null });
  });

  it("質問はサーバーの定義だけを使い、ボディの質問を通さない", async () => {
    await call(
      post({
        message: "至急",
        questions: { evil: { type: "noul", instructions: "x" } },
        model: "jev-preview",
      }),
    );
    expect(sdk.systemOne).toHaveBeenCalledWith({
      state: "至急",
      questions: TRIAGE_QUESTIONS,
    });
  });

  it("キーをクライアントへ渡し、リトライとログを止め、応答に出さない", async () => {
    const { out } = await call(post({ message: "至急" }));
    expect(sdk.constructed).toEqual([
      expect.objectContaining({
        apiKey: API_KEY,
        timeout: 5000,
        retry: { maxRetries: 0 },
        logLevel: "off",
      }),
    ]);
    expect(JSON.stringify(out.body)).not.toContain(API_KEY);
  });

  it("Redisが無ければapi/chat.tsと同じくカウントせず実行する", async () => {
    vi.mocked(getRedis).mockReturnValue(null);
    const { out, headers } = await call(post({ message: "至急" }));
    expect(out.status).toBe(200);
    expect(consumeQuota).not.toHaveBeenCalled();
    expect(headers["X-RateLimit-Limit"]).toBeDefined();
    expect(headers["X-RateLimit-Remaining"]).toBeUndefined();
  });
});
