// implementation-mirror: api/lib/quota.ts
import { useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { getEnrichedPageContext } from "@/lib/chatContext";
import { buildSystemPrompt } from "@/lib/chatPrompt";
import { searchFaq, formatFaqResponse } from "@/lib/faqSearch";
import { useChatHistory } from "./useChatHistory";
import { useChatSettings } from "./useChatSettings";

export type ChatMode = "ai" | "faq";

export type ChatTier = "anonymous" | "byok" | null;

export interface QuotaInfo {
  /** 残り呼び出し回数 (null = ヘッダ未送信 = バックエンド未対応) */
  remaining: number | null;
  /** 現在の tier 上限 */
  limit: number | null;
  /** 次のリセット epoch 秒 (UTC) */
  resetEpoch: number | null;
  /** 現在の tier */
  tier: ChatTier;
}

const INITIAL_QUOTA: QuotaInfo = {
  remaining: null,
  limit: null,
  resetEpoch: null,
  tier: null,
};

function parseQuotaHeaders(headers: Headers): QuotaInfo {
  const parseNum = (v: string | null) => (v === null ? null : Number(v));
  const tierRaw = headers.get("X-Chat-Tier");
  const validTiers: ChatTier[] = ["anonymous", "byok"];
  const tier = validTiers.includes(tierRaw as ChatTier)
    ? (tierRaw as ChatTier)
    : null;
  return {
    remaining: parseNum(headers.get("X-RateLimit-Remaining")),
    limit: parseNum(headers.get("X-RateLimit-Limit")),
    resetEpoch: parseNum(headers.get("X-RateLimit-Reset")),
    tier,
  };
}

export function useChatApi() {
  const { messages, addMessage, updateLastMessage, clearHistory } =
    useChatHistory();
  const chatSettings = useChatSettings();
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ChatMode>("ai");
  const [quota, setQuota] = useState<QuotaInfo>(INITIAL_QUOTA);
  const [location] = useLocation();
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      setError(null);

      const ctx = getEnrichedPageContext(location);
      // 履歴はページを跨いで残るので、どのページでの発言かを 1 件ごとに残す
      addMessage("user", text, { path: ctx.path, title: ctx.title });

      try {
        setIsStreaming(true);

        const controller = new AbortController();
        abortRef.current = controller;

        // 会話履歴を組み立て（直近10件まで）
        const recentMessages = [
          ...messages,
          { role: "user" as const, content: text },
        ]
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content }));

        const { selectedModel, userApiKey } = chatSettings;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: recentMessages,
            systemPrompt: buildSystemPrompt(ctx),
            model: selectedModel.id,
            provider: selectedModel.provider,
            ...(userApiKey ? { userApiKey } : {}),
          }),
          signal: controller.signal,
        });

        // レスポンスヘッダから quota 情報を取得 (バックエンド未送信なら null 維持)
        setQuota(parseQuotaHeaders(response.headers));

        // 429: tier quota exhausted (匿名枠切れ)
        if (response.status === 429) {
          const reset = response.headers.get("X-RateLimit-Reset");
          const resetText = reset
            ? describeResetTime(Number(reset))
            : "UTC 0 時 (JST 9 時)";
          addMessage(
            "assistant",
            `今日の無料枠を使い切りました。${resetText}にリセットされます。それまでは FAQ 検索か、設定から API キーを入れて BYOK でご利用ください。`,
          );
          setIsStreaming(false);
          return;
        }

        // 503: API key 未設定 / global kill / サービス停止
        if (response.status === 503) {
          const globalKill =
            response.headers.get("X-Chat-Kill-Switch") === "true";
          if (globalKill) {
            addMessage(
              "assistant",
              "本日の全体枠が上限に達したため、匿名アクセスを停止しています。設定から API キーを入れて BYOK で引き続きご利用いただけます。",
            );
            setIsStreaming(false);
            return;
          }
          // owner key 未設定 → FAQ フォールバック
          setMode("faq");
          const faqResult = searchFaq(text, ctx.manualId);
          if (faqResult) {
            addMessage("assistant", formatFaqResponse(faqResult));
          } else {
            addMessage(
              "assistant",
              "この質問にはお答えできません。サイドバーから関連ページをお探しください。",
            );
          }
          setIsStreaming(false);
          return;
        }

        // ユーザーキー必須モデルでキー未設定
        if (response.status === 403) {
          const data = await response.json();
          addMessage(
            "assistant",
            data.error ||
              "このモデルには API キーが必要です。設定画面からキーを入力してください。",
          );
          setIsStreaming(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        setMode("ai");

        // ストリーミング受信
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let accumulated = "";
        addMessage("assistant", "");

        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.text) {
                accumulated += parsed.text;
                updateLastMessage(accumulated);
              }
            } catch {
              // JSON パースエラーは無視
            }
          }
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        // API 接続失敗 → FAQ フォールバック
        setMode("faq");
        const faqResult = searchFaq(text, ctx.manualId);
        if (faqResult) {
          addMessage("assistant", formatFaqResponse(faqResult));
        } else {
          const message =
            err instanceof Error ? err.message : "エラーが発生しました";
          setError(message);
          addMessage(
            "assistant",
            "接続エラーが発生しました。しばらく経ってからもう一度お試しください。",
          );
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [
      isStreaming,
      messages,
      location,
      addMessage,
      updateLastMessage,
      chatSettings,
    ],
  );

  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return {
    messages,
    sendMessage,
    cancelStream,
    clearHistory,
    isStreaming,
    error,
    mode,
    chatSettings,
    quota,
  };
}

/**
 * リセット epoch 秒を「UTC X 時 (JST Y 時)」の学習者向け文言に変換。
 * 「明日の」など相対表現は日跨ぎの認知負荷を生むので避ける。
 */
function describeResetTime(resetEpoch: number): string {
  if (!Number.isFinite(resetEpoch) || resetEpoch <= 0) {
    return "UTC 0 時 (JST 9 時)";
  }
  const d = new Date(resetEpoch * 1000);
  const utcH = d.getUTCHours();
  const jstH = (utcH + 9) % 24;
  return `UTC ${utcH} 時 (JST ${jstH} 時)`;
}
