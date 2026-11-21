import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

/**
 * 書き換えたスケッチを、この端末のlocalStorageに下書きとして残す。
 *
 * 作品を作るページでは、書き換えたコードが再読み込みやページ移動で消えると作業を続けられない。
 * 保存先はブラウザだけで、サーバーへは送らない（プライバシーのページに記載している）。
 *
 * キーは「ページのパス + スケッチの題名」。教材側の元のコードが後から変わっても、
 * 利用者が書いた下書きは残る（元のコードへはリセットで戻せる）。
 * ページのパスを変えたときは下書きを引き継がない（storage-migrationの対象外）。
 */

export const SKETCH_DRAFT_PREFIX = 'sketch-draft:';

/** これより長いコードは保存しない（貼り付けた大きなデータで保存領域を使い切らないため） */
const MAX_DRAFT_LENGTH = 100_000;

export type SketchDraftStatus =
  /** 元のコードのまま。保存しているものは無い */
  | 'none'
  /** 書き換えた内容を保存した */
  | 'saved'
  /** 書き換えたが保存できなかった（保存領域を使えない・長すぎる） */
  | 'unsaved';

export function sketchDraftKey(path: string, title: string): string {
  return `${SKETCH_DRAFT_PREFIX}${path}#${title}`;
}

function readDraft(key: string | null): string | null {
  if (!key) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** 保存できたらtrue。元のコードに戻ったときは下書きを消す */
function writeDraft(key: string, value: string, original: string): boolean {
  try {
    if (value === original) {
      window.localStorage.removeItem(key);
      return true;
    }
    if (value.length > MAX_DRAFT_LENGTH) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

interface UseSketchDraftOptions {
  /** 教材側の元のコード */
  original: string;
  /** スケッチの題名。同じページの中で一意であること。無いときは保存しない */
  title: string | undefined;
  /** falseのときは保存も復元もしない（ただの編集状態として振る舞う） */
  enabled: boolean;
}

export function useSketchDraft({ original, title, enabled }: UseSketchDraftOptions) {
  const [path] = useLocation();
  const key = enabled && title ? sketchDraftKey(path, title) : null;

  const [code, setCodeState] = useState(() => readDraft(key) ?? original);
  const [status, setStatus] = useState<SketchDraftStatus>(() =>
    readDraft(key) !== null ? 'saved' : 'none',
  );

  // 元のコードか保存先が変わったら、そのスケッチの下書き（無ければ元のコード）に入れ替える。
  // 初回は上のuseStateが済ませているので、変わったときだけ動かす
  const previous = useRef({ key, original });
  useEffect(() => {
    if (previous.current.key === key && previous.current.original === original) return;
    previous.current = { key, original };
    const draft = readDraft(key);
    setCodeState(draft ?? original);
    setStatus(draft !== null ? 'saved' : 'none');
  }, [key, original]);

  const setCode = useCallback(
    (value: string) => {
      setCodeState(value);
      if (!key) return;
      const stored = writeDraft(key, value, original);
      setStatus(value === original ? 'none' : stored ? 'saved' : 'unsaved');
    },
    [key, original],
  );

  const reset = useCallback(() => setCode(original), [setCode, original]);

  return { code, setCode, reset, status };
}
