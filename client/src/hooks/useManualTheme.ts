import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  getManualIdFromPath,
  getSectionThemeIdFromPath,
} from "@/lib/navigation";

/**
 * 現在のマニュアルを `<html data-manual="...">` に反映する副作用フック。
 * これを使って index.css 側でマニュアル別のテーマ色（例: Vue/Nuxt のブランド緑）を
 * `[data-manual="vue"]` で上書きする。マニュアル外では属性を外す。
 *
 * マニュアルの中の一部だけが別の製品を扱うセクション（Jevなど）は
 * `<html data-section="...">` も付け、`[data-section="jev"]` でさらに上書きする。
 */
export function useManualTheme() {
  const [location] = useLocation();

  useEffect(() => {
    const manualId = getManualIdFromPath(location);
    const root = document.documentElement;
    if (manualId) {
      root.dataset.manual = manualId;
    } else {
      delete root.dataset.manual;
    }
    const sectionId = getSectionThemeIdFromPath(location);
    if (sectionId) {
      root.dataset.section = sectionId;
    } else {
      delete root.dataset.section;
    }
  }, [location]);
}
