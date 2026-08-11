import type { ChatMessage } from "@/hooks/useChatHistory";

/** ファイル名に使えない文字（Windows の予約文字 + パス区切り）。
 *  空白はここでは落とさず、後段で `-` に畳む */
const UNSAFE_FILENAME_CHARS = /[\\/:*?"<>|]/g;

const TITLE_MAX_LENGTH = 40;

/** ローカルタイムの YYYY-MM-DD */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** ローカルタイムの YYYY-MM-DD HH:mm */
export function formatDateTime(date: Date): string {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${formatDate(date)} ${hh}:${mm}`;
}

/**
 * 会話の内容から端的なタイトルを作る。
 * 最初のユーザー発言を要約の代わりに使い、長ければ切り詰める。
 * ユーザー発言が無い場合はページ名、それも無ければ既定文言にフォールバックする。
 */
export function deriveChatTitle(
  messages: ChatMessage[],
  fallbackPageTitle?: string | null,
): string {
  const firstUserMessage = messages.find((m) => m.role === "user");
  const source = firstUserMessage?.content.trim().replace(/\s+/g, " ");

  if (!source) return fallbackPageTitle?.trim() || "AI サポートの会話";

  // slice はコードユニット単位で切るためサロゲートペア (絵文字など) を分断し、
  // 孤立サロゲートがタイトルとファイル名に載る。コードポイント単位で数える
  const chars = Array.from(source);
  return chars.length > TITLE_MAX_LENGTH
    ? `${chars.slice(0, TITLE_MAX_LENGTH).join("")}…`
    : source;
}

/** `YYYY-MM-DD-<タイトル>.md`。ファイル名に使えない文字は除去する */
export function buildChatFilename(
  messages: ChatMessage[],
  date: Date,
  fallbackPageTitle?: string | null,
): string {
  const slug = deriveChatTitle(messages, fallbackPageTitle)
    .replace(/…$/, "")
    .replace(UNSAFE_FILENAME_CHARS, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${formatDate(date)}-${slug || "chat"}.md`;
}

function formatPageLabel(path: string, title?: string | null): string {
  return title ? `${title}（${path}）` : path;
}

/**
 * 会話全体を Markdown 化する。
 * 会話はページを跨ぐことがあるので、発言元ページが変わった時点で見出しを挟む。
 */
export function buildChatMarkdown(
  messages: ChatMessage[],
  opts: {
    exportedAt: Date;
    currentPagePath?: string;
    currentPageTitle?: string | null;
    modelLabel?: string;
    siteUrl?: string;
  },
): string {
  const title = deriveChatTitle(messages, opts.currentPageTitle);
  const lines: string[] = [`# ${title}`, ""];

  lines.push(`- 書き出し日時: ${formatDateTime(opts.exportedAt)}`);
  if (opts.currentPagePath) {
    lines.push(
      `- 書き出したページ: ${formatPageLabel(opts.currentPagePath, opts.currentPageTitle)}`,
    );
  }
  if (opts.modelLabel) lines.push(`- モデル: ${opts.modelLabel}`);
  if (opts.siteUrl) lines.push(`- サイト: ${opts.siteUrl}`);
  lines.push("", "---", "");

  if (messages.length === 0) {
    lines.push("（会話はありません）", "");
    return lines.join("\n");
  }

  let lastPagePath: string | undefined;

  for (const msg of messages) {
    // ページが変わったところで区切る（古い履歴は pagePath を持たないので出さない）
    if (msg.pagePath && msg.pagePath !== lastPagePath) {
      lines.push(
        `## ${formatPageLabel(msg.pagePath, msg.pageTitle)}での会話`,
        "",
      );
      lastPagePath = msg.pagePath;
    }

    const speaker = msg.role === "user" ? "質問" : "回答";
    const time = formatDateTime(new Date(msg.timestamp));
    lines.push(`### ${speaker} — ${time}`, "", msg.content.trim(), "");
  }

  return lines.join("\n");
}
