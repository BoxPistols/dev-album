import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  FlaskConical,
} from "lucide-react";
import {
  getGeneratedSourcesForPage,
  getSourcesForPage,
  type Source,
} from "@/data/sources";

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
 * 機械生成した出典のタイトルは URL を途中で切った文字列なので、そのまま出すと
 * 途切れて見える。URL から読める形（ホスト + パス）を作り直す。
 */
function urlLabel(source: Source): string {
  if (!source.url) return source.title;
  try {
    const url = new URL(source.url);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return source.title;
  }
}

/** URL を持つ出典 1 件。手書き分と機械照合分で同じ見た目にする */
function SourceLink({
  source,
  label = source.title,
}: {
  source: Source;
  label?: string;
}) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <ExternalLink
        size={14}
        aria-hidden="true"
        className="mt-0.5 text-primary flex-shrink-0"
      />
      <div className="min-w-0">
        <span className="text-sm font-medium text-primary underline underline-offset-2 break-words">
          {label}
        </span>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {KIND_LABEL[source.kind]}
          <span className="mx-1.5 text-border">/</span>
          照合日 {source.verifiedAt}
        </p>
        {source.note && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {source.note}
          </p>
        )}
      </div>
    </a>
  );
}

/**
 * ページが依拠する出典を sources.ts から描画する。
 * 出典の正本はレジストリ側にあり、ページには複製を置かない。
 *
 * 機械照合した出典（issue 49 の試行ページのみ）は既定で閉じた開閉ブロックに入れる。
 * 件数が多いページで本文の読みを妨げないため。
 */
export default function PageSources({
  path,
  title = "このページの出典",
}: PageSourcesProps) {
  const sources = getSourcesForPage(path);
  const generated = getGeneratedSourcesForPage(path);
  if (sources.length === 0 && generated.length === 0) return null;

  const linked = sources.filter((s) => s.url);
  const measured = sources.filter((s) => s.kind === "measured");

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen
          size={16}
          aria-hidden="true"
          className="text-muted-foreground"
        />
        <span className="text-sm font-bold text-foreground">{title}</span>
      </div>

      {linked.length > 0 && (
        <ul className="space-y-2">
          {linked.map((s) => (
            <li key={s.id}>
              <SourceLink source={s} />
            </li>
          ))}
        </ul>
      )}

      {measured.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical
              size={14}
              aria-hidden="true"
              className="text-muted-foreground"
            />
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
                <pre className="mt-1 overflow-x-auto rounded bg-card border border-border p-2 text-xs leading-relaxed text-muted-foreground">
                  <code>{s.reproduce}</code>
                </pre>
              </li>
            ))}
          </ul>
        </div>
      )}

      {generated.length > 0 && (
        <details
          className={`group ${linked.length > 0 || measured.length > 0 ? "mt-4 pt-4 border-t border-border" : ""}`}
        >
          <summary className="flex items-center gap-2 px-2 py-1.5 -mx-2 rounded-lg cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-muted transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <ChevronRight
              size={14}
              aria-hidden="true"
              className="flex-shrink-0 text-muted-foreground transition-transform duration-150 group-open:rotate-90"
            />
            <span className="text-xs font-bold text-foreground">
              機械照合した出典 {generated.length} 件
            </span>
          </summary>
          <p className="text-xs text-muted-foreground leading-relaxed mt-2 px-1">
            引用文が原文に逐語で含まれることは自動照合している。その引用がこのページの主張を支えているかどうかは、人が読んで判断する範囲で、ここには含まれない。
          </p>
          <ul className="mt-2 space-y-1">
            {generated.map((s) => (
              <li key={s.id}>
                <SourceLink source={s} label={urlLabel(s)} />
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
