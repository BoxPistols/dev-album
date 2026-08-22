import { describe, it, expect } from "vitest";
import { isDarkTheme, type ResolvedTheme } from "./ThemeContext";

// プレビュー iframe の明暗判定。Dracula（dark-soft）が light 扱いに落ちる退行を固定する
// （https://github.com/BoxPistols/dev-album/issues/82）。
describe("isDarkTheme", () => {
  const cases: Array<[ResolvedTheme, boolean]> = [
    ["light", false],
    ["dark", true],
    ["dark-soft", true],
  ];
  it.each(cases)("%s → %s", (theme, expected) => {
    expect(isDarkTheme(theme)).toBe(expected);
  });
});
