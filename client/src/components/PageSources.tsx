import { BookOpen, ExternalLink, FlaskConical } from "lucide-react";
import { getSourcesForPage, type Source } from "@/data/sources";

interface PageSourcesProps {
  /** navigation.ts の path。sources.ts の usedBy と突き合わせる */
  path: string;
  title?: string;
}

const KIND_LABEL: Record<Source["kind"], string> = {
  "official-docs": "公式ドキュメント",
  "official-repo": "公式リポジトリ・仕様",
  "official-post": "公式アナウンス",
  standard: "オープン仕様",
  measured: "手元での実測",
  secondary: "二次情報（他者の測定）",
};

/**
 * ページが依拠する出典を sources.ts から描画する。
 * 出典の正本はレジストリ側にあり、ページには複製を置かない。
 */
export default function PageSources({
  path,
  title = "このページの出典",
}: PageSourcesProps) {
  const sources = getSourcesForPage(path);
  if (sources.length === 0) return null;

  const linked = sources.filter((s) => s.url);
  const measured = sources.filter((s) => s.kind === "measured");

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={16} className="text-muted-foreground" />
        <span className="text-sm font-bold text-foreground">{title}</span>
      </div>

      <ul className="space-y-2">
        {linked.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-150"
            >
              <ExternalLink
                size={14}
                className="mt-0.5 text-primary flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-sm font-medium text-primary underline underline-offset-2">
                  {s.title}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {KIND_LABEL[s.kind]}
                  <span className="mx-1.5 text-border">/</span>
                  照合日 {s.verifiedAt}
                </p>
                {s.note && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {s.note}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>

      {measured.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical size={14} className="text-muted-foreground" />
            <span className="text-xs font-bold text-foreground">
              手元で再現した観測
            </span>
          </div>
          <ul className="space-y-3">
            {measured.map((s) => (
              <li key={s.id}>
                <p className="text-xs font-medium text-foreground">
                  {s.title}
                  <span className="mx-1.5 text-border">/</span>
                  <span className="font-normal text-muted-foreground">
                    確認日 {s.verifiedAt}
                  </span>
                </p>
                {s.note && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {s.note}
                  </p>
                )}
                <pre className="mt-1 overflow-x-auto rounded bg-card border border-border p-2 text-[11px] leading-relaxed text-muted-foreground">
                  <code>{s.reproduce}</code>
                </pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
