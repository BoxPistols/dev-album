/**
 * 利用枠の最低保証に使う、ブラウザごとのID。
 * クライアント（client/src/lib/clientId.ts）とサーバー（api/chat.ts、api/jev.ts）で共有する。
 *
 * IDはブラウザのlocalStorageに保存したランダムな値で、利用者を特定する情報は含まない。
 * 消せば作り直せるが、最低保証を取り直せる回数はIPごとの絶対上限で止まる。
 */
export const CLIENT_ID_HEADER = "x-client-id";

// crypto.randomUUID() の形。それ以外の値は使わない（任意の文字列をキーに入れないため）
const CLIENT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function readClientId(
  value: string | string[] | undefined,
): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  const id = raw.trim();
  return CLIENT_ID_PATTERN.test(id) ? id.toLowerCase() : null;
}
