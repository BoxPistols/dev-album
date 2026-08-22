import type { ManualInfo } from '@/lib/navigation';

interface ManualGlyphProps {
  manual: ManualInfo;
  /** 一覧の行なら 24px、カード見出しなら 32px */
  size?: 'sm' | 'md';
}

const TINT_ALPHA = 0.22;

/**
 * `#RRGGBB` を rgba() に開く。
 *
 * color-mix() でも同じ結果になるが、ブラウザが `color(srgb 0.95 0.24 0.36 / 0.22)`
 * という 0-1 表記へ解決するため、getComputedStyle を読むツール（axe や自前の
 * コントラスト検査）が 0-255 と取り違えて誤った値を出す。rgba() で書けば
 * どのツールからも素直に読める。
 */
function tint(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${TINT_ALPHA})`;
}

/**
 * マニュアルの識別バッジ。
 *
 * 10 マニュアルを縦に並べると文字だけでは走査しづらいので、地色に各マニュアルの
 * ブランド色を薄く敷いて見分けをつける。色は補助で、識別そのものは頭文字が担う
 * （色だけに情報を持たせない）。地色を低い alpha に留めているのは、文字を
 * text-foreground のまま置いてコントラストを落とさないため。
 */
export default function ManualGlyph({ manual, size = 'sm' }: ManualGlyphProps) {
  const box = size === 'sm' ? 'w-6 h-6 rounded-md text-xs' : 'w-8 h-8 rounded-lg text-sm';
  return (
    <span
      aria-hidden
      className={`shrink-0 flex items-center justify-center font-bold text-foreground ${box}`}
      style={{ backgroundColor: tint(manual.color) }}
    >
      {manual.icon}
    </span>
  );
}
