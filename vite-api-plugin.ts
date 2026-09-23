import { type Plugin, loadEnv } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import OpenAI from "openai";
import {
  DEFAULT_MODELS,
  GEMINI_BASE_URL,
  isAllowedForServerKey,
  maxTokensFor,
  reasoningEffortFor,
} from "./api/lib/chatModels.js";

function parseBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

export function apiDevPlugin(): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      const env = loadEnv("development", process.cwd(), "");

      server.middlewares.use(
        "/api/chat",
        async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== "POST") {
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }

          try {
            const data = await parseBody(req);
            const messages = data.messages as {
              role: string;
              content: string;
            }[];
            const systemPrompt = (data.systemPrompt as string) || "";
            const model = data.model as string | undefined;
            const provider = (data.provider as string) || "openai";
            const userApiKey = data.userApiKey as string | undefined;

            if (
              !messages ||
              !Array.isArray(messages) ||
              messages.length === 0
            ) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "messages is required" }));
              return;
            }

            // 本番 (api/chat.ts) と同じ許可リスト方式にする。
            // 拒否リストのままだと、dev では未登録のモデルがサーバのキーで素通りし、
            // ローカルで通ったものが本番で403になる
            if (model && !userApiKey && !isAllowedForServerKey(provider, model)) {
              res.writeHead(403, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  error: "このモデルの利用には API キーの設定が必要です",
                }),
              );
              return;
            }

            // プロバイダー別クライアント設定
            let client: OpenAI;
            let resolvedModel: string;

            if (provider === "gemini") {
              const apiKey = userApiKey || env.GEMINI_API_KEY;
              if (!apiKey) {
                res.writeHead(503, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "API key not configured" }));
                return;
              }
              client = new OpenAI({ apiKey, baseURL: GEMINI_BASE_URL });
              resolvedModel = model || DEFAULT_MODELS.gemini;
            } else {
              const apiKey = userApiKey || env.OPENAI_API_KEY;
              if (!apiKey) {
                res.writeHead(503, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "API key not configured" }));
                return;
              }
              client = new OpenAI({ apiKey });
              resolvedModel = model || DEFAULT_MODELS.openai;
            }

            // SSE ヘッダー
            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            });

            const maxTokens = maxTokensFor(resolvedModel);

            const stream = await client.chat.completions.create({
              model: resolvedModel,
              max_completion_tokens: maxTokens,
              ...(reasoningEffortFor(resolvedModel) && {
                reasoning_effort: reasoningEffortFor(resolvedModel),
              }),
              stream: true,
              messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((m) => ({
                  role: m.role as "user" | "assistant",
                  content: m.content,
                })),
              ],
            });

            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content;
              if (text) {
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
              }
            }

            res.write("data: [DONE]\n\n");
            res.end();
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "Unknown error";
            if (!res.headersSent) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: message }));
            } else {
              res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
              res.end();
            }
          }
        },
      );
    },
  };
}
