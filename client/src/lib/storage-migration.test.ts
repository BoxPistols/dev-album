import { describe, it, expect, beforeEach } from 'vitest';
import { migratePath, migrateStorage, runStorageMigration, STORAGE_MIGRATION_KEY } from './storage-migration';
import { pages } from './navigation';

const cc = pages.find((p) => p.path.startsWith('/claude-code/'))!;
const oldPath = cc.path.replace('/claude-code/', '/claude-mux/');

describe('storage-migration', () => {
  beforeEach(() => localStorage.clear());

  it('/claude-mux/* を /claude-code/* に写し、対応先の無いパスは捨てる', () => {
    expect(migratePath(oldPath)).toBe(cc.path);
    expect(migratePath('/claude-mux/tmux/no-longer-exists')).toBeUndefined();
  });

  it('完了ページ・ブックマーク・メモを移行する', () => {
    localStorage.setItem('completed-pages', JSON.stringify([oldPath, '/git', '/claude-mux/tmux/gone']));
    localStorage.setItem('bookmarked-pages', JSON.stringify([oldPath, cc.path]));
    localStorage.setItem('page-note:' + oldPath, 'memo');
    const r = migrateStorage(localStorage);
    expect(JSON.parse(localStorage.getItem('completed-pages')!)).toEqual([cc.path, '/git']);
    expect(JSON.parse(localStorage.getItem('bookmarked-pages')!)).toEqual([cc.path]);
    expect(localStorage.getItem('page-note:' + cc.path)).toBe('memo');
    expect(localStorage.getItem('page-note:' + oldPath)).toBeNull();
    expect(r).toEqual({ moved: 3, dropped: 1 });
  });

  it('1 回走ったら 2 回目は何もしない', () => {
    localStorage.setItem('completed-pages', JSON.stringify([oldPath]));
    expect(runStorageMigration()).toEqual({ moved: 1, dropped: 0 });
    localStorage.setItem('completed-pages', JSON.stringify([oldPath]));
    expect(runStorageMigration()).toBeUndefined();
    expect(localStorage.getItem(STORAGE_MIGRATION_KEY)).toBe('1');
  });

  it('壊れた JSON があっても落ちない', () => {
    localStorage.setItem('completed-pages', '{not json');
    expect(() => migrateStorage(localStorage)).not.toThrow();
  });
});
