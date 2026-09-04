import { type Plugin, loadEnv } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import OpenAI from "openai";

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

// サーバーキーで使えるモデルは api/chat.ts の SERVER_KEY_ALLOWED_MODELS と揃える。
// Gemini Pro は無料枠の対象外なので自前キーが要る
const PREMIUM_MODELS: string[] = ["gemini-2.5-pro"];

// 出力上限の絞り込み対象。api/chat.ts の COMPACT_MODELS と揃える
const COMPACT_MODELS = ["nano", "luna"];

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

            if (model && PREMIUM_MODELS.includes(model) && !userApiKey) {
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
              client = new OpenAI({
                apiKey,
                baseURL:
                  "https://generativelanguage.googleapis.com/v1beta/openai/",
              });
              resolvedModel = model || "gemini-3.8-flash";
            } else {
              const apiKey = userApiKey || env.OPENAI_API_KEY;
              if (!apiKey) {
                res.writeHead(503, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "API key not configured" }));
                return;
              }
              client = new OpenAI({ apiKey });
              resolvedModel = model || "gpt-5.6-luna";
            }

            // SSE ヘッダー
            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            });

            const maxTokens = COMPACT_MODELS.some((m) => resolvedModel.includes(m))
              ? 2048
              : 4096;

            const stream = await client.chat.completions.create({
              model: resolvedModel,
              max_completion_tokens: maxTokens,
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
