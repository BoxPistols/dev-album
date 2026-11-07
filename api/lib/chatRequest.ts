/**
 * /api/chatのリクエスト検証。本番（api/chat.ts）とdev（vite-api-plugin.ts）で共有する。
 *
 * 上限の根拠:
 * - 応答の上限は4,096トークンで、日本語でも英語でも長い回答は1万字を超えることがある。
 *   その回答は次の送信で履歴に載るので、1件の上限は回答が収まる長さにする
 * - クライアントは直近10件だけを送る。件数の上限はその2倍にする
 * - システムプロンプトは全ページの実測で最大2,136文字（2026-11-07）
 */
export const MAX_CHAT_MESSAGES = 20;
export const MAX_CHAT_MESSAGE_CHARS = 16_000;
export const MAX_CHAT_TOTAL_CHARS = 64_000;
export const MAX_CHAT_SYSTEM_PROMPT_CHARS = 8_000;

const ALLOWED_ROLES = ["user", "assistant"];

/** 問題があれば理由の文を返す。問題がなければnull */
export function validateChatRequest(
  messages: unknown,
  systemPrompt: unknown,
): string | null {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "messages is required";
  }
  if (messages.length > MAX_CHAT_MESSAGES) {
    return `会話の件数が上限（${MAX_CHAT_MESSAGES}件）を超えています`;
  }
  if (
    systemPrompt !== undefined &&
    systemPrompt !== null &&
    typeof systemPrompt !== "string"
  ) {
    return "systemPromptは文字列で指定してください";
  }
  if (
    typeof systemPrompt === "string" &&
    systemPrompt.length > MAX_CHAT_SYSTEM_PROMPT_CHARS
  ) {
    return `システムプロンプトが上限（${MAX_CHAT_SYSTEM_PROMPT_CHARS}文字）を超えています`;
  }
  let total = 0;
  for (const m of messages as { role?: unknown; content?: unknown }[]) {
    if (typeof m?.role !== "string" || !ALLOWED_ROLES.includes(m.role)) {
      return "roleはuserかassistantで指定してください";
    }
    if (typeof m.content !== "string") {
      return "contentは文字列で指定してください";
    }
    if (m.content.length > MAX_CHAT_MESSAGE_CHARS) {
      return `1件のメッセージが上限（${MAX_CHAT_MESSAGE_CHARS}文字）を超えています`;
    }
    total += m.content.length;
  }
  if (total > MAX_CHAT_TOTAL_CHARS) {
    return `会話全体の長さが上限（${MAX_CHAT_TOTAL_CHARS}文字）を超えています`;
  }
  return null;
}

/**
 * 送信する履歴を新しい順に上限内へ収める。上限を超える件が履歴に残ると、
 * それが押し出されるまで毎回400になるため、送る前に落とす。
 */
export function trimChatHistory<T extends { content: string }>(
  messages: readonly T[],
): T[] {
  const kept: T[] = [];
  let total = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const { length } = messages[i].content;
    if (length > MAX_CHAT_MESSAGE_CHARS) continue;
    if (total + length > MAX_CHAT_TOTAL_CHARS) break;
    if (kept.length >= MAX_CHAT_MESSAGES) break;
    total += length;
    kept.unshift(messages[i]);
  }
  return kept;
}
