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
 *
 * 固まる下書きへの備え: 書き換えたスケッチを枠で動かす前に「実行中」の印を付け（markRunning）、
 * 最初の1フレームが描けたら外す（markAlive）。無限ループで固まると印が残るので、次に開いたときは
 * 下書きを自動で実行せず元のコードで開き、下書きは残したまま利用者に選んでもらう（status: 'recovered'）。
 */

export const SKETCH_DRAFT_PREFIX = 'sketch-draft:';
export const SKETCH_RUNNING_PREFIX = 'sketch-draft-running:';

/** これより長いコードは保存しない（貼り付けた大きなデータで保存領域を使い切らないため） */
const MAX_DRAFT_LENGTH = 100_000;

export type SketchDraftStatus =
  /** 元のコードのまま。保存しているものは無い */
  | 'none'
  /** 書き換えた内容を保存した */
  | 'saved'
  /** 書き換えたが保存できなかった（保存領域を使えない・長すぎる） */
  | 'unsaved'
  /** 前回この下書きを動かしたまま固まった。元のコードで開き、下書きは残している */
  | 'recovered';

export function sketchDraftKey(path: string, title: string): string {
  return `${SKETCH_DRAFT_PREFIX}${path}#${title}`;
}

function runningKey(draftKey: string): string {
  return SKETCH_RUNNING_PREFIX + draftKey.slice(SKETCH_DRAFT_PREFIX.length);
}

function read(key: string | null): string | null {
  if (!key) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function remove(key: string): boolean {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/** 保存できたらtrue。元のコードに戻ったときは下書きを消す */
function writeDraft(key: string, value: string, original: string): boolean {
  if (value === original) return remove(key);
  if (value.length > MAX_DRAFT_LENGTH) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

interface InitialState {
  code: string;
  status: SketchDraftStatus;
}

function initialState(key: string | null, original: string): InitialState {
  const draft = read(key);
  if (key && draft !== null) {
    // 前回、この下書きを動かしたまま最初の1フレームまで届かなかった
    if (read(runningKey(key)) !== null) return { code: original, status: 'recovered' };
    return { code: draft, status: 'saved' };
  }
  return { code: original, status: 'none' };
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

  const [state, setState] = useState<InitialState>(() => initialState(key, original));

  // 元のコードか保存先が変わったら、そのスケッチの下書き（無ければ元のコード）に入れ替える。
  // 初回は上のuseStateが済ませているので、変わったときだけ動かす
  const previous = useRef({ key, original });
  useEffect(() => {
    if (previous.current.key === key && previous.current.original === original) return;
    previous.current = { key, original };
    setState(initialState(key, original));
  }, [key, original]);

  const setCode = useCallback(
    (value: string) => {
      if (!key) {
        setState({ code: value, status: 'none' });
        return;
      }
      const stored = writeDraft(key, value, original);
      // 元のコードに戻したときも、下書きを消せなかったら保存できていない扱いにする（次に開くと古い下書きが出る）
      setState({ code: value, status: !stored ? 'unsaved' : value === original ? 'none' : 'saved' });
    },
    [key, original],
  );

  const reset = useCallback(() => {
    if (key) remove(runningKey(key));
    setCode(original);
  }, [key, original, setCode]);

  /** 前回固まった下書きを、利用者の判断で開き直す */
  const restoreDraft = useCallback(() => {
    if (!key) return;
    const draft = read(key);
    remove(runningKey(key));
    if (draft !== null) setState({ code: draft, status: 'saved' });
  }, [key]);

  // いま枠で動いているのが書き換えたコードかどうか。元のコードが動いただけでは印を外さない
  // （前回固まって元のコードで開いたとき、印を外すと次の読み込みで固まる下書きがまた動く）
  const runningDraft = useRef(false);

  /** 枠でコードを動かす直前に呼ぶ。印を付けるのは、書き換えたコードを動かすときだけ */
  const markRunning = useCallback(
    (running: string) => {
      runningDraft.current = running !== original;
      if (!key || !runningDraft.current) return;
      try {
        window.localStorage.setItem(runningKey(key), '1');
      } catch {
        // 保存領域を使えないときは、下書きも残らないので印も要らない
      }
    },
    [key, original],
  );

  /** 枠のスケッチが最初の1フレームを描けたら呼ぶ */
  const markAlive = useCallback(() => {
    if (key && runningDraft.current) remove(runningKey(key));
  }, [key]);

  return {
    code: state.code,
    setCode,
    reset,
    status: state.status,
    restoreDraft,
    markRunning,
    markAlive,
  };
}
