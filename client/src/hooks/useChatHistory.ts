import { useState, useCallback } from "react";

const STORAGE_KEY = "chat-history";
const MAX_MESSAGES = 50;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  /** 発言時に開いていたページ。履歴はページを跨いで残るため 1 件ごとに記録する。
   *  この項目より前に保存された履歴には無いので optional。 */
  pagePath?: string;
  pageTitle?: string | null;
}

function loadMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: ChatMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useChatHistory() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);

  const addMessage = useCallback(
    (
      role: "user" | "assistant",
      content: string,
      page?: { path: string; title: string | null },
    ) => {
      const msg: ChatMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role,
        content,
        timestamp: Date.now(),
        ...(page ? { pagePath: page.path, pageTitle: page.title } : {}),
      };
      setMessages((prev) => {
        const next = [...prev, msg].slice(-MAX_MESSAGES);
        saveMessages(next);
        return next;
      });
      return msg;
    },
    [],
  );

  const updateLastMessage = useCallback((content: string) => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        content,
      };
      saveMessages(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, addMessage, updateLastMessage, clearHistory };
}
