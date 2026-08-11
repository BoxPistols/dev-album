import { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  Zap,
  Loader2,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Download,
} from "lucide-react";
import Markdown from "react-markdown";
import { useChatApi } from "@/hooks/useChatApi";
import { useChatResize } from "@/hooks/useChatResize";
import { MODEL_OPTIONS } from "@/hooks/useChatSettings";
import { getPageContext } from "@/lib/chatContext";
import { buildChatFilename, buildChatMarkdown } from "@/lib/chatExport";
import { useLocation } from "wouter";

const IS_MAC =
  typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent);
const MOD_LABEL = IS_MAC ? "⌘" : "Ctrl";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState<
    "idle" | "testing" | "ok" | "error"
  >("idle");
  const [testError, setTestError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [location] = useLocation();
  const {
    messages,
    sendMessage,
    cancelStream,
    clearHistory,
    isStreaming,
    mode,
    chatSettings,
    quota,
  } = useChatApi();
  const { size, handleResizeStart } = useChatResize();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const pageContext = getPageContext(location);

  // メッセージ追加時に自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // パネルを開いたときにフォーカス
  useEffect(() => {
    if (open && !showSettings) {
      const timer = setTimeout(() => textareaRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [open, showSettings]);

  // textarea 高さ自動調整
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  // Escape でパネルを閉じる
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        if (showSettings) {
          setShowSettings(false);
        } else {
          setOpen(false);
          setConfirmClear(false);
        }
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, showSettings]);

  // Cmd/Ctrl+Shift+K でトグル
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        (e.key === "k" || e.key === "K")
      ) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // メッセージ送信
  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    setShowSettings(false); // 質問入力に集中できるよう設定パネルを閉じる
    sendMessage(text);
  }, [input, isStreaming, sendMessage]);

  // Cmd/Ctrl+Enter で送信（IME 変換中は無視）
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // 履歴クリア
  const handleClear = useCallback(() => {
    if (isStreaming) {
      cancelStream();
      return;
    }
    if (confirmClear) {
      clearHistory();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  }, [confirmClear, clearHistory, isStreaming, cancelStream]);

  // メッセージ単位のコピー
  const handleCopyMessage = useCallback(async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(
        () => setCopiedId((prev) => (prev === id ? null : prev)),
        2000,
      );
    } catch {
      // クリップボードが使えない環境 (非セキュアコンテキスト等) では何もしない
    }
  }, []);

  // 会話全体を Markdown でダウンロード
  const handleDownload = useCallback(() => {
    if (messages.length === 0) return;
    const now = new Date();
    const markdown = buildChatMarkdown(messages, {
      exportedAt: now,
      currentPagePath: pageContext.path,
      currentPageTitle: pageContext.title,
      modelLabel: chatSettings.selectedModel.label,
      siteUrl: window.location.origin,
    });
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = buildChatFilename(messages, now, pageContext.title);
    // download 属性を効かせるには DOM に繋いでから click する。
    // revoke は click と同期に行うとダウンロード開始前に URL が消えることがある
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }, [messages, pageContext, chatSettings.selectedModel.label]);

  // API 接続テスト
  const handleTestConnection = useCallback(async () => {
    setTestStatus("testing");
    setTestError("");
    try {
      const { selectedModel, userApiKey } = chatSettings;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "ping" }],
          systemPrompt: "1文字だけ返してください。",
          model: selectedModel.id,
          provider: selectedModel.provider,
          ...(userApiKey ? { userApiKey } : {}),
        }),
      });
      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      // ストリーム先頭だけ読んで閉じる
      const reader = res.body?.getReader();
      if (reader) {
        await reader.read();
        reader.cancel();
      }
      setTestStatus("ok");
    } catch (err) {
      setTestStatus("error");
      setTestError(err instanceof Error ? err.message : "接続失敗");
    }
    setTimeout(() => setTestStatus("idle"), 4000);
  }, [chatSettings]);

  return (
    <>
      {/* チャットパネル */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="AI チャットサポート"
          className="fixed bottom-20 right-6 z-40 max-sm:left-4 max-sm:right-4 max-sm:w-auto max-sm:h-[60vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-chat-panel-in"
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
          }}
        >
          {/* リサイズハンドル — 上辺 */}
          <div
            onMouseDown={handleResizeStart("top")}
            className="absolute top-0 left-4 right-4 h-1.5 cursor-n-resize z-10 max-sm:hidden"
          />
          {/* リサイズハンドル — 左辺 */}
          <div
            onMouseDown={handleResizeStart("left")}
            className="absolute left-0 top-4 bottom-0 w-1.5 cursor-ew-resize z-10 max-sm:hidden"
          />
          {/* リサイズハンドル — 左上角 */}
          <div
            onMouseDown={handleResizeStart("top-left")}
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-[11] max-sm:hidden"
          />
          {/* 上部中央グリップ（視覚的ヒント） */}
          <div
            onMouseDown={handleResizeStart("top")}
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 cursor-n-resize z-[12] transition-colors max-sm:hidden"
          />
          {/* ヘッダー */}
          <div className="px-4 py-3 border-b border-border bg-card flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-semibold text-foreground">
                AI サポート
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${mode === "ai" ? "bg-green-500" : "bg-zinc-400"}`}
                title={mode === "ai" ? "AI 接続中" : "FAQ モード"}
              />
              {/* 残量バッジ: tier quota を消費する層 (anonymous) でのみ表示 */}
              {quota.remaining !== null &&
                quota.tier &&
                quota.tier !== "byok" && (
                  <span
                    className="text-[12px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium"
                    title={`tier: ${quota.tier}${quota.limit !== null ? ` / limit: ${quota.limit}` : ""}`}
                  >
                    今日あと {quota.remaining} 回
                  </span>
                )}
              {pageContext.title && (
                <span className="text-[12px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground truncate max-w-[140px]">
                  {pageContext.title}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings((v) => !v)}
                className={`p-1.5 rounded-lg transition-colors ${showSettings ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                aria-label="設定"
                title="モデル設定"
              >
                <Settings size={14} />
              </button>
              {messages.length > 0 && (
                <button
                  onClick={handleDownload}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="会話を Markdown でダウンロード"
                  title="会話を .md でダウンロード"
                >
                  <Download size={14} />
                </button>
              )}
              {messages.length > 0 && (
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title={
                    isStreaming
                      ? "応答を中止"
                      : confirmClear
                        ? "もう一度押して確認"
                        : "履歴をクリア"
                  }
                  aria-label={
                    isStreaming ? "応答を中止" : "チャット履歴をクリア"
                  }
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
                  setShowSettings(false);
                }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="チャットを閉じる"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 設定パネル */}
          {showSettings && (
            <div className="px-4 py-3 border-b border-border bg-muted/50 space-y-3">
              {/* モデル: 選択肢が 1 つのときは読み取り専用で表示する */}
              <div>
                <span className="text-[12px] text-muted-foreground block mb-1">
                  モデル
                </span>
                {MODEL_OPTIONS.length > 1 ? (
                  <select
                    aria-label="モデル"
                    value={chatSettings.selectedModel.id}
                    onChange={(e) => chatSettings.setModelId(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {MODEL_OPTIONS.map((opt) => (
                      <option
                        key={opt.id}
                        value={opt.id}
                        disabled={
                          opt.requiresUserKey && !chatSettings.userApiKey
                        }
                      >
                        {opt.label}
                        {opt.requiresUserKey ? " (要キー)" : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-foreground font-medium">
                    {chatSettings.selectedModel.label}
                  </p>
                )}
              </div>

              {/* API キー入力 */}
              <div>
                <label
                  htmlFor="chat-api-key"
                  className="text-[12px] text-muted-foreground block mb-1"
                >
                  API キー（任意）
                </label>
                <div className="flex gap-1">
                  <input
                    id="chat-api-key"
                    type={showApiKey ? "text" : "password"}
                    value={chatSettings.userApiKey}
                    onChange={(e) => chatSettings.setUserApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 px-2 py-1.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                  <button
                    onClick={() => setShowApiKey((v) => !v)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label={showApiKey ? "キーを隠す" : "キーを表示"}
                  >
                    {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <p className="text-[12px] text-muted-foreground mt-1">
                  キーはブラウザにのみ保存されます。設定すると 1
                  日の上限がなくなります
                </p>
              </div>

              {/* 接続テスト */}
              <button
                onClick={handleTestConnection}
                disabled={testStatus === "testing"}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs hover:bg-muted transition-colors disabled:opacity-50"
              >
                {testStatus === "testing" ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    テスト中...
                  </>
                ) : testStatus === "ok" ? (
                  <>
                    <CheckCircle2 size={12} className="text-green-500" />
                    接続成功
                  </>
                ) : testStatus === "error" ? (
                  <>
                    <XCircle size={12} className="text-red-500" />
                    {testError || "接続失敗"}
                  </>
                ) : (
                  <>
                    <Zap size={12} />
                    接続テスト
                  </>
                )}
              </button>
            </div>
          )}

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
                <div key={msg.id} className="group relative">
                  {/* コピーボタンは吹き出しの外側の余白に置く。hover だけに頼ると
                      キーボード操作で到達できないため focus-visible でも表示する */}
                  <button
                    onClick={() => handleCopyMessage(msg.id, msg.content)}
                    className={`absolute top-1 ${msg.role === "user" ? "left-0" : "right-0"} p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity`}
                    aria-label={
                      copiedId === msg.id
                        ? "コピーしました"
                        : msg.role === "user"
                          ? "この質問をコピー"
                          : "この回答をコピー"
                    }
                    title={copiedId === msg.id ? "コピーしました" : "コピー"}
                  >
                    {copiedId === msg.id ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                  </button>
                  <div
                    className={
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 ml-8 text-sm"
                        : "bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2 mr-8 text-sm"
                    }
                  >
                    {msg.role === "assistant" ? (
                      <Markdown
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              className="text-primary underline underline-offset-2"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children, className }) => {
                            const isBlock = className?.includes("language-");
                            return isBlock ? (
                              <pre className="bg-background/50 rounded-lg p-2 my-1 overflow-x-auto text-xs">
                                <code>{children}</code>
                              </pre>
                            ) : (
                              <code className="bg-background/50 rounded px-1 py-0.5 text-xs">
                                {children}
                              </code>
                            );
                          },
                          p: ({ children }) => (
                            <p className="mb-1 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 mb-1">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 mb-1">
                              {children}
                            </ol>
                          ),
                        }}
                      >
                        {msg.content}
                      </Markdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))
            )}
            {isStreaming &&
              messages.length > 0 &&
              messages[messages.length - 1]?.content === "" && (
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
          <div className="px-4 py-3 border-t border-border flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`質問を入力... (${MOD_LABEL}+Enter で送信)`}
              rows={1}
              className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none leading-normal"
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-colors shrink-0"
              aria-label={`送信 (${MOD_LABEL}+Enter)`}
              title={`${MOD_LABEL}+Enter`}
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
