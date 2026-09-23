import { useId, useState, type ReactNode } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

export interface SliderConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
}

interface SliderChallengeProps {
  title: string;
  description: string;
  sliders: SliderConfig[];
  render: (values: Record<string, number>) => ReactNode;
  explanation?: string;
  /** stackedはスライダーの下に結果を横幅いっぱいで置く。一覧や表を出すとき用 */
  layout?: "split" | "stacked";
}

export default function SliderChallenge({
  title,
  description,
  sliders,
  render,
  explanation,
  layout = "split",
}: SliderChallengeProps) {
  const uid = useId();
  const initial = Object.fromEntries(
    sliders.map((s) => [s.id, s.defaultValue]),
  );
  const [values, setValues] = useState<Record<string, number>>(initial);

  const handleChange = (id: string, v: number) => {
    setValues((prev) => ({ ...prev, [id]: v }));
  };

  const handleReset = () => setValues(initial);

  return (
    <div className="rounded-xl border border-border bg-card p-6 my-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <SlidersHorizontal
            className="text-primary"
            size={16}
            aria-hidden="true"
          />
        </div>
        <span className="text-sm font-bold text-primary uppercase tracking-wider">
          パラメータ探索
        </span>
      </div>

      <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>

      <div
        className={
          layout === "stacked"
            ? "flex flex-col gap-4 mb-4"
            : "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        }
      >
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          {sliders.map((s) => (
            <div key={s.id}>
              <div className="flex items-baseline justify-between mb-1.5">
                <label
                  htmlFor={`${uid}-${s.id}`}
                  className="text-sm font-medium text-foreground"
                >
                  {s.label}
                </label>
                <span className="text-sm font-mono tabular-nums text-primary">
                  {values[s.id]}
                  {s.unit && (
                    <span className="text-muted-foreground ml-0.5">
                      {s.unit}
                    </span>
                  )}
                </span>
              </div>
              <input
                id={`${uid}-${s.id}`}
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={values[s.id]}
                onChange={(e) => handleChange(s.id, Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-0.5 font-mono">
                <span>
                  {s.min}
                  {s.unit ?? ""}
                </span>
                <span>
                  {s.max}
                  {s.unit ?? ""}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className={
            layout === "stacked"
              ? "rounded-lg border border-border bg-background p-4"
              : "rounded-lg border border-border bg-background p-4 flex items-center justify-center min-h-[160px]"
          }
        >
          {render(values)}
        </div>
      </div>

      {explanation && (
        <div className="px-4 py-3 rounded-lg bg-card border border-border mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleReset}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <RotateCcw size={14} />
        リセット
      </button>
    </div>
  );
}
