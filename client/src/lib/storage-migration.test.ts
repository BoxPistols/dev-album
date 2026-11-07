import { describe, it, expect, beforeEach } from 'vitest';
import { migratePath, migrateStorage, runStorageMigration, STORAGE_MIGRATION_KEY, STORAGE_MIGRATION_VERSION } from './storage-migration';
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

  it('外したcmuxのページは転送先へ写す', () => {
    const coexistence = '/claude-code/multi-ai/multi-ai-coexistence';
    const orchestration = '/claude-code/ide-agent-teams/agent-orchestration';
    expect(migratePath('/claude-code/cmux/cmux-intro')).toBe(coexistence);
    expect(migratePath('/claude-code/cmux/cmux-setup')).toBe(coexistence);
    expect(migratePath('/claude-code/cmux/agent-teams')).toBe(orchestration);
    expect(migratePath('/claude-code/cmux/worktrees')).toBe(orchestration);
    expect(migratePath('/claude-code/cmux/browser-api')).toBe('/claude-code/best-practices/browser-verification');
    // claude-mux時代の記録は2段階の改名を通る
    expect(migratePath('/claude-mux/cmux/cmux-intro')).toBe(coexistence);
  });

  it('同じ転送先に集まる記録は1件にまとめ、メモは失わない', () => {
    const target = '/claude-code/multi-ai/multi-ai-coexistence';
    localStorage.setItem('completed-pages', JSON.stringify(['/claude-code/cmux/cmux-intro', '/claude-code/cmux/cmux-setup']));
    localStorage.setItem('page-note:' + target, 'existing');
    localStorage.setItem('page-note:/claude-code/cmux/cmux-intro', 'intro memo');
    const r = migrateStorage(localStorage);
    expect(JSON.parse(localStorage.getItem('completed-pages')!)).toEqual([target]);
    expect(localStorage.getItem('page-note:' + target)).toBe('existing\n\nintro memo');
    expect(localStorage.getItem('page-note:/claude-code/cmux/cmux-intro')).toBeNull();
    expect(r).toEqual({ moved: 3, dropped: 0 });
  });

  it('1 回走ったら 2 回目は何もしない', () => {
    localStorage.setItem('completed-pages', JSON.stringify([oldPath]));
    expect(runStorageMigration()).toEqual({ moved: 1, dropped: 0 });
    localStorage.setItem('completed-pages', JSON.stringify([oldPath]));
    expect(runStorageMigration()).toBeUndefined();
    expect(localStorage.getItem(STORAGE_MIGRATION_KEY)).toBe(
      String(STORAGE_MIGRATION_VERSION),
    );
  });

  it('壊れた JSON があっても落ちない', () => {
    localStorage.setItem('completed-pages', '{not json');
    expect(() => migrateStorage(localStorage)).not.toThrow();
  });
});
