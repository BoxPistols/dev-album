import { useEffect } from "react";
import { useLocation } from "wouter";
import { getManualIdFromPath } from "@/lib/navigation";

/**
 * 現在のマニュアルを `<html data-manual="...">` に反映する副作用フック。
 * これを使って index.css 側でマニュアル別のテーマ色（例: Vue/Nuxt のブランド緑）を
 * `[data-manual="vue"]` で上書きする。マニュアル外では属性を外す。
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
  }, [location]);
}
