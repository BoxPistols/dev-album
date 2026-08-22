import { getPageByPath } from './navigation';

/**
 * ページの URL が変わったときに localStorage の学習記録を新しいパスへ写す。
 * 対象: 完了ページ / ブックマーク（パスの配列）、ページメモ（`page-note:<path>` キー）。
 * 旧パスに対応先が無いもの（削除済みページ）は捨てる。起動時に 1 回だけ走る。
 */

export const STORAGE_MIGRATION_KEY = 'storage-migration-version';
export const STORAGE_MIGRATION_VERSION = 1;

const PATH_ARRAY_KEYS = ['completed-pages', 'bookmarked-pages'] as const;
const NOTE_PREFIX = 'page-note:';

/** 旧パス → 新パスの置換規則。先頭一致で最初に当たったものを使う */
const PATH_RENAMES: ReadonlyArray<[from: string, to: string]> = [
  ['/claude-mux/', '/claude-code/'],
  ['/claude-mux', '/claude-code'],
];

export function migratePath(path: string): string | undefined {
  let next = path;
  for (const [from, to] of PATH_RENAMES) {
    if (next.startsWith(from)) {
      next = to + next.slice(from.length);
      break;
    }
  }
  return getPageByPath(next) ? next : undefined;
}

export interface MigrationResult {
  moved: number;
  dropped: number;
}

/** 実際に localStorage を書き換える。テストしやすいよう Storage を引数で受ける */
export function migrateStorage(storage: Storage): MigrationResult {
  const result: MigrationResult = { moved: 0, dropped: 0 };

  for (const key of PATH_ARRAY_KEYS) {
    const raw = storage.getItem(key);
    if (!raw) continue;
    let paths: unknown;
    try {
      paths = JSON.parse(raw);
    } catch {
      continue;
    }
    if (!Array.isArray(paths)) continue;
    const next: string[] = [];
    for (const p of paths) {
      if (typeof p !== 'string') continue;
      if (getPageByPath(p)) {
        if (!next.includes(p)) next.push(p);
        continue;
      }
      const migrated = migratePath(p);
      if (migrated) {
        if (!next.includes(migrated)) next.push(migrated);
        result.moved++;
      } else {
        result.dropped++;
      }
    }
    const encoded = JSON.stringify(next);
    if (encoded !== raw) storage.setItem(key, encoded);
  }

  const noteKeys: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i);
    if (k?.startsWith(NOTE_PREFIX)) noteKeys.push(k);
  }
  for (const k of noteKeys) {
    const path = k.slice(NOTE_PREFIX.length);
    if (getPageByPath(path)) continue;
    const migrated = migratePath(path);
    const value = storage.getItem(k) ?? '';
    if (migrated) {
      // 既に新パス側にメモがあれば上書きせず残す
      if (!storage.getItem(NOTE_PREFIX + migrated)) storage.setItem(NOTE_PREFIX + migrated, value);
      result.moved++;
    } else {
      result.dropped++;
    }
    storage.removeItem(k);
  }

  return result;
}

/** 起動時に呼ぶ。バージョンが上がったときだけ実行する */
export function runStorageMigration(storage: Storage = localStorage): MigrationResult | undefined {
  try {
    const done = Number(storage.getItem(STORAGE_MIGRATION_KEY) ?? '0');
    if (done >= STORAGE_MIGRATION_VERSION) return undefined;
    const result = migrateStorage(storage);
    storage.setItem(STORAGE_MIGRATION_KEY, String(STORAGE_MIGRATION_VERSION));
    return result;
  } catch {
    // localStorage が使えない環境（プライベートモード等）では何もしない
    return undefined;
  }
}
