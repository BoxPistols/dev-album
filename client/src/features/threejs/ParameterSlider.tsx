import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}

export default function ParameterSlider({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  unit = "",
}: ParameterSliderProps) {
  return (
    <div className="flex items-center gap-4">
      <Label className="min-w-[120px] text-sm text-muted-foreground">
        {label}
      </Label>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]: number[]) => onChange(v)}
        className="flex-1"
      />
      <span className="min-w-[60px] text-right text-sm font-mono text-foreground">
        {value.toFixed(step < 1 ? 1 : 0)}
        {unit}
      </span>
    </div>
  );
}
