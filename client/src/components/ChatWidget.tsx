import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";
import { getPageContext } from "@/lib/chatContext";
import { useChatHistory } from "@/hooks/useChatHistory";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [location] = useLocation();
  const { messages, addMessage, clearHistory } = useChatHistory();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const pageContext = getPageContext(location);

  // メッセージ追加時に自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // パネルを開いたときにinputにフォーカス
  useEffect(() => {
    if (open) {
      // アニメーション後にフォーカス
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Escape でパネルを閉じる
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setConfirmClear(false);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Cmd/Ctrl+Shift+C でトグル
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        (e.key === "c" || e.key === "C")
      ) {
        // テキスト選択時のコピーと競合しないよう、選択がなければトグル
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // モック応答を生成
  const generateResponse = useCallback(
    (pageCtx: typeof pageContext): string => {
      if (pageCtx.title) {
        return `「${pageCtx.title}」についてのご質問ですね。この機能は現在準備中です。サイドバーから関連ページをお探しください。`;
      }
      return "Dev Album へようこそ。学習したいマニュアルをサイドバーから選択してください。";
    },
    [],
  );

  // メッセージ送信
  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || sending) return;

    addMessage("user", text);
    setInput("");
    setSending(true);

    setTimeout(() => {
      const response = generateResponse(pageContext);
      addMessage("assistant", response);
      setSending(false);
    }, 800);
  }, [input, sending, addMessage, generateResponse, pageContext]);

  // Enter で送信（Shift+Enter は改行なし＝何もしない）
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // 履歴クリア
  const handleClear = useCallback(() => {
    if (confirmClear) {
      clearHistory();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  }, [confirmClear, clearHistory]);

  return (
    <>
      {/* チャットパネル */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="AI チャットサポート"
          className="fixed bottom-20 right-6 z-40 w-80 md:w-96 max-h-[60vh] max-sm:left-4 max-sm:right-4 max-sm:w-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-chat-panel-in"
        >
          {/* ヘッダー */}
          <div className="px-4 py-3 border-b border-border bg-card flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-semibold text-foreground">
                AI サポート
              </span>
              {pageContext.title && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground truncate max-w-[140px]">
                  {pageContext.title}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title={confirmClear ? "もう一度押して確認" : "履歴をクリア"}
                  aria-label="チャット履歴をクリア"
                >
                  <Trash2
                    size={14}
                    className={confirmClear ? "text-red-500" : ""}
                  />
                </button>
              )}
              <button
                onClick={() => {
                  setOpen(false);
                  setConfirmClear(false);
                }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="チャットを閉じる"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* メッセージエリア */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            aria-live="polite"
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                質問を入力してください
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 ml-8 text-sm"
                      : "bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2 mr-8 text-sm"
                  }
                >
                  {msg.content}
                </div>
              ))
            )}
            {sending && (
              <div className="bg-muted text-muted-foreground rounded-2xl rounded-bl-sm px-4 py-2 mr-8 text-sm">
                <span className="inline-flex gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力エリア */}
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="質問を入力..."
              className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={sending}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-colors"
              aria-label="送信"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* フローティングボタン */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        aria-label={
          open ? "チャットサポートを閉じる" : "チャットサポートを開く"
        }
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* アニメーション用スタイル */}
      <style>{`
        @keyframes chat-panel-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-chat-panel-in {
          animation: chat-panel-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
