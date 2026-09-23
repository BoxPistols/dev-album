/**
 * /api/chat が使うモデル定義の単一ソース。
 *
 * 本番の api/chat.ts と、dev サーバーの vite-api-plugin.ts の両方がここを参照する。
 * 以前は同じ値を2箇所に書いていたため、dev 側だけが廃止済みの gpt-5.4-nano を既定に
 * したまま残り、ローカルで試したときと本番とで呼ぶモデルが違っていた。
 */

export const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/openai/";

/** provider ごとの既定モデル（リクエストが model を指定しなかったとき） */
export const DEFAULT_MODELS: Record<string, string> = {
  openai: "gpt-6-luna",
  gemini: "gemini-3.5-flash-lite",
};

/**
 * サーバ側の API キーで呼べるモデルの許可リスト (provider ごと)。
 * model はリクエストボディで指定できるため、検証しないと匿名クライアントが
 * オーナーのキーで任意の高コストモデルを呼べてしまう。
 * ここに無いモデルは BYOK (userApiKey) を必須にする。
 * クライアントの MODEL_OPTIONS を増やしたら、こちらにも追加する。
 *
 * 拒否リストにしないのは、新しいモデルが出るたびに追記しないと素通りするから。
 * 実際に dev 側は拒否リスト方式で、中身が廃止済みの gpt-5.4-mini だけになっていた。
 */
export const SERVER_KEY_ALLOWED_MODELS: Record<string, string[]> = {
  // 各社の最新世代で最も安いモデルだけを置く。
  // gemini-3.5-flash-liteは最新のFlash-Lite（2026-09-20に公式の料金ページで確認）。
  // gpt-6-lunaはgpt-6の最安。2026-09-23にgpt-5.6-lunaから更新した。作業環境から
  // 料金ページに到達できないため、綴りはリポジトリのオーナーの指示に拠っている。
  openai: ["gpt-6-luna"],
  gemini: ["gemini-3.5-flash-lite"],
};

/** 低コスト帯のモデルは出力上限を抑え、無料枠の消費を緩やかにする */
const COMPACT_MODELS = ["nano", "luna"];

const COMPACT_MAX_TOKENS = 2048;
const DEFAULT_MAX_TOKENS = 4096;

/** そのモデルに渡す max_completion_tokens */
export function maxTokensFor(model: string): number {
  return COMPACT_MODELS.some((m) => model.includes(m))
    ? COMPACT_MAX_TOKENS
    : DEFAULT_MAX_TOKENS;
}

/** サーバのキーで実行してよいモデルか（BYOK なら本人負担なので呼び出し側で許可する） */
export function isAllowedForServerKey(provider: string, model: string): boolean {
  return (SERVER_KEY_ALLOWED_MODELS[provider] ?? []).includes(model);
}
