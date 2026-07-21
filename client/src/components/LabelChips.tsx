/**
 * GitHub のラベルを模した色付きピルを並べて表示する。
 * デザイナーが「ラベルとは何か」を実物のUIに近い形で掴めるようにする。
 */

type LabelColor =
  "blue" | "green" | "amber" | "red" | "purple" | "zinc" | "pink";

interface LabelItem {
  text: string;
  color?: LabelColor;
}

interface LabelChipsProps {
  labels: LabelItem[];
  caption?: string;
}

const colorStyle: Record<LabelColor, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700",
  green:
    "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700",
  amber:
    "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700",
  red: "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700",
  purple:
    "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700",
  zinc: "bg-zinc-200 dark:bg-zinc-700/50 text-zinc-800 dark:text-zinc-100 border-zinc-300 dark:border-zinc-600",
  pink: "bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-200 border-pink-300 dark:border-pink-700",
};

export default function LabelChips({ labels, caption }: LabelChipsProps) {
  return (
    <figure className="my-6">
      {caption && (
        <figcaption className="text-sm text-muted-foreground mb-3 font-medium">
          {caption}
        </figcaption>
      )}
      <div className="flex flex-wrap gap-2">
        {labels.map((l) => (
          <span
            key={l.text}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold font-mono ${colorStyle[l.color ?? "zinc"]}`}
          >
            {l.text}
          </span>
        ))}
      </div>
    </figure>
  );
}
