import { describe, it, expect } from "vitest";
import {
  MAX_CHAT_MESSAGES,
  MAX_CHAT_MESSAGE_CHARS,
  MAX_CHAT_SYSTEM_PROMPT_CHARS,
  MAX_CHAT_TOTAL_CHARS,
  trimChatHistory,
  validateChatRequest,
} from "../../../api/lib/chatRequest";
import { pages } from "./navigation";
import { getEnrichedPageContext } from "./chatContext";
import { buildSystemPrompt } from "./chatPrompt";

const msg = (content: string, role = "user") => ({ role, content });

describe("validateChatRequest", () => {
  it("通常の会話は通す", () => {
    expect(validateChatRequest([msg("こんにちは")], "prompt")).toBeNull();
    expect(validateChatRequest([msg("ping")], undefined)).toBeNull();
  });

  it("空・配列以外は拒否する", () => {
    expect(validateChatRequest([], "")).not.toBeNull();
    expect(validateChatRequest("x", "")).not.toBeNull();
    expect(validateChatRequest(undefined, "")).not.toBeNull();
  });

  it("件数の上限を超えたら拒否する", () => {
    const at = Array.from({ length: MAX_CHAT_MESSAGES }, () => msg("a"));
    expect(validateChatRequest(at, "")).toBeNull();
    expect(validateChatRequest([...at, msg("a")], "")).toMatch(/件数/);
  });

  it("1件の文字数の上限を超えたら拒否する", () => {
    expect(
      validateChatRequest([msg("a".repeat(MAX_CHAT_MESSAGE_CHARS))], ""),
    ).toBeNull();
    expect(
      validateChatRequest([msg("a".repeat(MAX_CHAT_MESSAGE_CHARS + 1))], ""),
    ).toMatch(/1件/);
  });

  it("合計の文字数の上限を超えたら拒否する", () => {
    const n = Math.ceil(MAX_CHAT_TOTAL_CHARS / MAX_CHAT_MESSAGE_CHARS) + 1;
    const big = Array.from({ length: n }, () =>
      msg("a".repeat(MAX_CHAT_MESSAGE_CHARS)),
    );
    expect(validateChatRequest(big, "")).toMatch(/全体/);
  });

  it("systemPromptの長さと型を検証する", () => {
    expect(
      validateChatRequest(
        [msg("a")],
        "a".repeat(MAX_CHAT_SYSTEM_PROMPT_CHARS + 1),
      ),
    ).toMatch(/システムプロンプト/);
    expect(validateChatRequest([msg("a")], 1)).not.toBeNull();
  });

  it("user/assistant以外のroleと文字列以外のcontentを拒否する", () => {
    expect(validateChatRequest([msg("a", "system")], "")).toMatch(/role/);
    expect(validateChatRequest([{ role: "user", content: 1 }], "")).toMatch(
      /content/,
    );
    expect(validateChatRequest([null], "")).toMatch(/role/);
  });

  it("全ページの実際のシステムプロンプトが上限に収まる", () => {
    for (const p of pages) {
      const prompt = buildSystemPrompt(getEnrichedPageContext(p.path));
      expect(prompt.length, p.path).toBeLessThanOrEqual(
        MAX_CHAT_SYSTEM_PROMPT_CHARS,
      );
    }
  });
});

describe("trimChatHistory", () => {
  it("上限内なら順序を保ってそのまま返す", () => {
    const list = [msg("a"), msg("b", "assistant"), msg("c")];
    expect(trimChatHistory(list)).toEqual(list);
  });

  it("上限を超える件を落とし、残りは検証を通る", () => {
    const list = [msg("a".repeat(MAX_CHAT_MESSAGE_CHARS + 1)), msg("b")];
    const kept = trimChatHistory(list);
    expect(kept).toEqual([msg("b")]);
    expect(validateChatRequest(kept, "")).toBeNull();
  });

  it("合計が上限を超えるなら古い件から落とす", () => {
    const n = Math.ceil(MAX_CHAT_TOTAL_CHARS / MAX_CHAT_MESSAGE_CHARS) + 2;
    const list = Array.from({ length: n }, (_, i) =>
      msg(String(i).padEnd(MAX_CHAT_MESSAGE_CHARS, "a")),
    );
    const kept = trimChatHistory(list);
    expect(kept.at(-1)).toEqual(list.at(-1));
    expect(kept.length).toBeLessThan(list.length);
    expect(validateChatRequest(kept, "")).toBeNull();
  });
});
