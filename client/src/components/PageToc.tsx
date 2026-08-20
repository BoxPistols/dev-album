import { List } from "lucide-react";

export interface PageTocItem {
  /** 飛び先の見出しに付けた id */
  id: string;
  /** 目次に出す文言 */
  label: string;
  /** 手順セクションなら STEP 番号。概念セクションは省略する */
  step?: number;
}

interface PageTocProps {
  items: PageTocItem[];
  title?: string;
}

/**
 * ページ内の目次。手順が多いページで「何段あるか」を先に見せる。
 * 見出し側に同じ id と scroll-mt-* を付けておくこと（StepHeading は対応済み）。
 */
export default function PageToc({ items, title = "目次" }: PageTocProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className="rounded-xl border border-border bg-muted/40 p-5 mb-8"
    >
      <div className="flex items-center gap-2 mb-3">
        <List size={16} className="text-muted-foreground" aria-hidden="true" />
        <span className="text-sm font-bold text-foreground">{title}</span>
      </div>
      <ol className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
            >
              {/* 手順と概念セクションで先頭を揃えるため、番号の枠は常に確保する */}
              <span
                className="w-14 flex-shrink-0 font-mono text-xs font-bold text-primary"
                aria-hidden={item.step === undefined}
              >
                {item.step !== undefined ? `STEP ${item.step}` : ""}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
