import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  SKETCH_DRAFT_PREFIX,
  SKETCH_RUNNING_PREFIX,
  sketchDraftKey,
  useSketchDraft,
} from "./useSketchDraft";

const ORIGINAL = "function setup() { createCanvas(100, 100); }";
const EDITED = "function setup() { createCanvas(200, 200); }";
const TITLE = "最小のスケッチ";

function draftKeys(): string[] {
  return Object.keys(window.localStorage).filter((k) => k.startsWith(SKETCH_DRAFT_PREFIX));
}

describe("useSketchDraft", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, "", "/p5js/basics/first-sketch");
  });

  it("書き換えると、ページのパスと題名をキーにして保存する", () => {
    const { result } = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    expect(result.current.code).toBe(ORIGINAL);
    expect(result.current.status).toBe("none");

    act(() => result.current.setCode(EDITED));

    expect(result.current.code).toBe(EDITED);
    expect(result.current.status).toBe("saved");
    const key = sketchDraftKey("/p5js/basics/first-sketch", TITLE);
    expect(window.localStorage.getItem(key)).toBe(EDITED);
  });

  it("保存した下書きを、次に開いたときに復元する", () => {
    window.localStorage.setItem(sketchDraftKey("/p5js/basics/first-sketch", TITLE), EDITED);
    const { result } = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    expect(result.current.code).toBe(EDITED);
    expect(result.current.status).toBe("saved");
  });

  it("リセットすると元のコードに戻り、下書きを消す", () => {
    const { result } = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    act(() => result.current.setCode(EDITED));
    act(() => result.current.reset());

    expect(result.current.code).toBe(ORIGINAL);
    expect(result.current.status).toBe("none");
    expect(draftKeys()).toEqual([]);
  });

  it("手で元のコードに打ち直したときも、下書きを消す", () => {
    const { result } = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    act(() => result.current.setCode(EDITED));
    act(() => result.current.setCode(ORIGINAL));
    expect(draftKeys()).toEqual([]);
  });

  it("同じページの別のスケッチとは、題名で保存先が分かれる", () => {
    const first = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: "A", enabled: true }),
    );
    const second = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: "B", enabled: true }),
    );
    act(() => first.result.current.setCode(EDITED));
    expect(second.result.current.code).toBe(ORIGINAL);
    expect(draftKeys()).toHaveLength(1);
  });

  it("無効のとき・題名が無いときは、保存も復元もしない", () => {
    window.localStorage.setItem(sketchDraftKey("/p5js/basics/first-sketch", TITLE), EDITED);
    const disabled = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: false }),
    );
    expect(disabled.result.current.code).toBe(ORIGINAL);
    act(() => disabled.result.current.setCode("x"));
    expect(disabled.result.current.status).toBe("none");

    window.localStorage.clear();
    const untitled = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: undefined, enabled: true }),
    );
    act(() => untitled.result.current.setCode(EDITED));
    expect(untitled.result.current.code).toBe(EDITED);
    expect(draftKeys()).toEqual([]);
  });

  it("元のコードが差し替わったら、編集中の内容を捨てて新しい元のコードにする（保存していない場合）", () => {
    const { result, rerender } = renderHook(
      ({ original }) => useSketchDraft({ original, title: undefined, enabled: false }),
      { initialProps: { original: ORIGINAL } },
    );
    act(() => result.current.setCode("x"));
    rerender({ original: EDITED });
    expect(result.current.code).toBe(EDITED);
  });

  it("長すぎるコードは保存せず、保存できなかったことを返す", () => {
    const { result } = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    act(() => result.current.setCode("a".repeat(100_001)));
    expect(result.current.status).toBe("unsaved");
    expect(draftKeys()).toEqual([]);
  });
});

describe("useSketchDraft: 固まる下書きへの備え", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, "", "/p5js/basics/first-sketch");
  });
  const key = () => sketchDraftKey("/p5js/basics/first-sketch", TITLE);
  const running = () => SKETCH_RUNNING_PREFIX + key().slice(SKETCH_DRAFT_PREFIX.length);

  it("書き換えたコードが最初の1フレームまで届かなかったら、次は元のコードで開き、下書きは残す", () => {
    const first = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    act(() => first.result.current.setCode(EDITED));
    act(() => first.result.current.markRunning(EDITED));
    // ここで固まった（markAliveが呼ばれないまま閉じた）
    first.unmount();

    const second = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    expect(second.result.current.code).toBe(ORIGINAL);
    expect(second.result.current.status).toBe("recovered");
    expect(window.localStorage.getItem(key())).toBe(EDITED);

    // 元のコードが動いても印は外さない（もう一度開いても、固まる下書きを自動では動かさない）
    act(() => second.result.current.markRunning(ORIGINAL));
    act(() => second.result.current.markAlive());
    expect(window.localStorage.getItem(running())).toBe("1");

    // 利用者が選べば下書きを開ける
    act(() => second.result.current.restoreDraft());
    expect(second.result.current.code).toBe(EDITED);
    expect(second.result.current.status).toBe("saved");
  });

  it("書き換えたコードが動いたら印を外し、次も下書きで開く", () => {
    const first = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    act(() => first.result.current.setCode(EDITED));
    act(() => first.result.current.markRunning(EDITED));
    act(() => first.result.current.markAlive());
    first.unmount();
    expect(window.localStorage.getItem(running())).toBeNull();

    const second = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    expect(second.result.current.code).toBe(EDITED);
  });

  it("下書きを消せなかったときは、元に戻しても保存できていない扱いにする", () => {
    const { result } = renderHook(() =>
      useSketchDraft({ original: ORIGINAL, title: TITLE, enabled: true }),
    );
    act(() => result.current.setCode(EDITED));
    const spy = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    try {
      act(() => result.current.setCode(ORIGINAL));
      expect(result.current.status).toBe("unsaved");
    } finally {
      spy.mockRestore();
    }
  });
});
