interface BrandMarkProps {
  /** サイズは Tailwind のクラスで渡す（既定はサイドバーのロゴ寸法） */
  className?: string;
}

/**
 * Dev Album のシンボル。
 *
 * 棚に立てた本と、そこから 1 冊引き出したところ。引き出した 1 冊が
 * 「いま読んでいるマニュアル」で、--primary が入るのでマニュアルを移ると
 * 色が変わる（index.css の [data-manual] が --primary を差し替える）。
 * ロゴが現在地の手がかりを兼ねる。
 *
 * 傾いた 1 冊はこのマークの要。垂直の棒だけを並べると棒グラフに読めてしまい、
 * 本には見えない（実際に並べて比べて決めた）。
 *
 * 図形は装飾なので aria-hidden とし、名前は隣のワードマークが担う。
 */
export default function BrandMark({ className = 'w-9 h-9' }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <g fill="var(--primary)">
        <rect x="4" y="9" width="6" height="19" rx="1.8" opacity="0.32" />
        <rect x="12" y="5" width="6" height="23" rx="1.8" opacity="0.55" />
        <rect x="20" y="4" width="6" height="23.5" rx="1.8" transform="rotate(14 23 27.5)" />
      </g>
    </svg>
  );
}
