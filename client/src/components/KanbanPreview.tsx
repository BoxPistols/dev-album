/**
 * GitHub Projects のボード（カンバン）を模した図解。
 * Todo / In progress / Done の列にカードを並べ、進捗が見える状態を示す。
 */

type ColumnAccent = "muted" | "primary" | "success";

interface KanbanCard {
  title: string;
  tag?: string;
}

interface KanbanColumn {
  title: string;
  accent?: ColumnAccent;
  cards: KanbanCard[];
}

interface KanbanPreviewProps {
  columns: KanbanColumn[];
  caption?: string;
}

const dotStyle: Record<ColumnAccent, string> = {
  muted: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-emerald-500",
};

export default function KanbanPreview({
  columns,
  caption,
}: KanbanPreviewProps) {
  return (
    <figure className="my-8">
      {caption && (
        <figcaption className="text-sm text-muted-foreground mb-3 font-medium">
          {caption}
        </figcaption>
      )}
      <div className="rounded-2xl border border-border bg-muted/20 p-4 overflow-x-auto">
        <div className="grid grid-cols-3 gap-3 min-w-[520px]">
          {columns.map((col) => (
            <div key={col.title} className="rounded-xl bg-background/60 p-2.5">
              <div className="flex items-center gap-2 px-1 pb-2.5 mb-1 border-b border-border">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${dotStyle[col.accent ?? "muted"]}`}
                  aria-hidden="true"
                />
                <span className="text-xs font-bold text-foreground">
                  {col.title}
                </span>
                <span className="text-[11px] text-muted-foreground ml-auto tabular-nums">
                  {col.cards.length}
                </span>
              </div>
              <div className="space-y-2">
                {col.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-lg border border-border bg-card p-2.5 shadow-sm"
                  >
                    <p className="text-xs text-foreground leading-snug">
                      {card.title}
                    </p>
                    {card.tag && (
                      <span className="inline-block mt-1.5 text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {card.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
