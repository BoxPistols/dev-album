import { describe, it, expect } from "vitest";
import {
  buildChatFilename,
  buildChatMarkdown,
  deriveChatTitle,
  formatDate,
  formatDateTime,
} from "./chatExport";
import type { ChatMessage } from "@/hooks/useChatHistory";

const AT = new Date(2026, 7, 11, 21, 50); // 2026-08-11 21:50 (local)

function msg(
  role: "user" | "assistant",
  content: string,
  extra: Partial<ChatMessage> = {},
): ChatMessage {
  return {
    id: `${role}-${content.slice(0, 4)}`,
    role,
    content,
    timestamp: AT.getTime(),
    ...extra,
  };
}

describe("formatDate / formatDateTime", () => {
  it("ローカルタイムでゼロ埋めする", () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe("2026-01-05");
    expect(formatDateTime(new Date(2026, 0, 5, 9, 7))).toBe("2026-01-05 09:07");
  });
});

describe("deriveChatTitle", () => {
  it("最初のユーザー発言をタイトルにする", () => {
    const messages = [
      msg("user", "ラベルの自動付与はできる?"),
      msg("assistant", "できます"),
    ];
    expect(deriveChatTitle(messages)).toBe("ラベルの自動付与はできる?");
  });

  it("assistant が先頭でもユーザー発言を拾う", () => {
    const messages = [msg("assistant", "ようこそ"), msg("user", "質問です")];
    expect(deriveChatTitle(messages)).toBe("質問です");
  });

  it("長すぎる場合は切り詰めて … を付ける", () => {
    const long = "あ".repeat(60);
    const title = deriveChatTitle([msg("user", long)]);
    expect(title).toBe(`${"あ".repeat(40)}…`);
  });

  it("改行や連続空白は 1 つの空白に畳む", () => {
    expect(deriveChatTitle([msg("user", "前段\n\n  後段")])).toBe("前段 後段");
  });

  it("ユーザー発言が無ければページ名にフォールバックする", () => {
    expect(deriveChatTitle([msg("assistant", "…")], "Slack 通知連携")).toBe(
      "Slack 通知連携",
    );
  });

  it("ページ名も無ければ既定文言を返す", () => {
    expect(deriveChatTitle([])).toBe("AI サポートの会話");
  });
});

describe("buildChatFilename", () => {
  it("日付 + タイトルの .md になる", () => {
    expect(buildChatFilename([msg("user", "ラベル自動付与")], AT)).toBe(
      "2026-08-11-ラベル自動付与.md",
    );
  });

  it("空白はハイフンに畳む", () => {
    expect(buildChatFilename([msg("user", "label  auto  assign")], AT)).toBe(
      "2026-08-11-label-auto-assign.md",
    );
  });

  it("ファイル名に使えない文字を除去する", () => {
    const name = buildChatFilename([msg("user", 'a/b\\c:d*e?f"g<h>i|j')], AT);
    expect(name).toBe("2026-08-11-abcdefghij.md");
    expect(name).not.toMatch(/[\\/:*?"<>|]/);
  });

  it("切り詰めの … はファイル名に持ち込まない", () => {
    const name = buildChatFilename([msg("user", "あ".repeat(60))], AT);
    expect(name).toBe(`2026-08-11-${"あ".repeat(40)}.md`);
  });

  it("記号だけの発言でも空のファイル名にならない", () => {
    expect(buildChatFilename([msg("user", "///")], AT)).toBe(
      "2026-08-11-chat.md",
    );
  });

  it("会話が空ならページ名を使う", () => {
    expect(buildChatFilename([], AT, "Slack 通知連携")).toBe(
      "2026-08-11-Slack-通知連携.md",
    );
  });
});

describe("buildChatMarkdown", () => {
  const base = {
    exportedAt: AT,
    currentPagePath: "/git/flow-automation/labels",
    currentPageTitle: "ラベルと分類の自動化",
    modelLabel: "GPT-5.6 Luna",
  };

  it("タイトル・日時・ページ・モデルをヘッダに出す", () => {
    const md = buildChatMarkdown([msg("user", "質問です")], base);
    expect(md).toContain("# 質問です");
    expect(md).toContain("- 書き出し日時: 2026-08-11 21:50");
    expect(md).toContain(
      "- 書き出したページ: ラベルと分類の自動化（/git/flow-automation/labels）",
    );
    expect(md).toContain("- モデル: GPT-5.6 Luna");
  });

  it("質問と回答を本文として並べる", () => {
    const md = buildChatMarkdown(
      [msg("user", "ラベルは後から効く?"), msg("assistant", "遡りません")],
      base,
    );
    expect(md).toContain("### 質問 — 2026-08-11 21:50");
    expect(md).toContain("ラベルは後から効く?");
    expect(md).toContain("### 回答 — 2026-08-11 21:50");
    expect(md).toContain("遡りません");
  });

  it("発言元ページが変わったら見出しで区切る", () => {
    const md = buildChatMarkdown(
      [
        msg("user", "1 つ目", {
          pagePath: "/git/flow-automation/labels",
          pageTitle: "ラベルと分類の自動化",
        }),
        msg("assistant", "回答 1", {
          pagePath: "/git/flow-automation/labels",
          pageTitle: "ラベルと分類の自動化",
        }),
        msg("user", "2 つ目", {
          pagePath: "/git/flow-automation/assignment",
          pageTitle: "アサインとレビューの自動割り当て",
        }),
      ],
      base,
    );
    expect(md).toContain(
      "## ラベルと分類の自動化（/git/flow-automation/labels）での会話",
    );
    expect(md).toContain(
      "## アサインとレビューの自動割り当て（/git/flow-automation/assignment）での会話",
    );
    // 同じページが続く間は見出しを繰り返さない
    expect(
      md.match(
        /## ラベルと分類の自動化（\/git\/flow-automation\/labels）での会話/g,
      ),
    ).toHaveLength(1);
  });

  it("ページ情報を持たない旧履歴でもページ見出しを出さずに書き出せる", () => {
    const md = buildChatMarkdown([msg("user", "旧履歴")], base);
    expect(md).not.toContain("での会話");
    expect(md).toContain("旧履歴");
  });

  it("会話が空でも壊れない", () => {
    const md = buildChatMarkdown([], base);
    expect(md).toContain("（会話はありません）");
  });
});
