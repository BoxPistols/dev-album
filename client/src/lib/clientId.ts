import { CLIENT_ID_HEADER } from "../../../api/lib/clientId";

// 利用枠の最低保証に使う、ブラウザごとのランダムなID。サーバーではIPと組み合わせたハッシュにして数える
export const CLIENT_ID_STORAGE_KEY = "quota-client-id";

let memoryId: string | null = null;

function randomId(): string {
  return crypto.randomUUID();
}

export function getClientId(): string {
  try {
    const saved = localStorage.getItem(CLIENT_ID_STORAGE_KEY);
    if (saved) return saved;
    const id = randomId();
    localStorage.setItem(CLIENT_ID_STORAGE_KEY, id);
    return id;
  } catch {
    // 保存できない環境（プライベートブラウズの一部など）では、開いているあいだだけ同じIDを使う
    memoryId ??= randomId();
    return memoryId;
  }
}

/** 送信時に付けるヘッダー（/api/chatと/api/jev） */
export function clientIdHeaders(): Record<string, string> {
  return { [CLIENT_ID_HEADER]: getClientId() };
}
