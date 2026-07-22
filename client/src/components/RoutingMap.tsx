import { ArrowRight, FolderGit2, Users } from "lucide-react";
import CaptionedFigure from "./CaptionedFigure";

/**
 * CODEOWNERS の「変更パス → レビュー担当」の対応を、矢印で結んだ行として視覚化する。
 * どの領域を誰が見るのかが一目で分かるようにする。
 */

interface RoutingItem {
  path: string;
  owner: string;
}

interface RoutingMapProps {
  routes: RoutingItem[];
  caption?: string;
}

export default function RoutingMap({ routes, caption }: RoutingMapProps) {
  return (
    <CaptionedFigure caption={caption}>
      <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
        {routes.map((r) => (
          <div
            key={r.path}
            className="flex flex-wrap items-center gap-3 rounded-xl bg-card border border-border px-3 py-2.5"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground bg-muted px-2.5 py-1 rounded-lg min-w-0">
              <FolderGit2
                size={13}
                className="text-muted-foreground flex-shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{r.path}</span>
            </span>
            <ArrowRight
              size={16}
              className="text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
              <Users size={13} className="flex-shrink-0" aria-hidden="true" />
              {r.owner}
            </span>
          </div>
        ))}
      </div>
    </CaptionedFigure>
  );
}
