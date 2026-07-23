import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { useIsTruncated } from "@/hooks/useIsTruncated";
import { cn } from "@/lib/utils";

interface TruncatedTextProps {
  children: string;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

/**
 * 1 行 truncate で表示し、実際に省略されている時だけ hover/focus で全文ツールチップを出す。
 * 表示タイミング（ウォームアップ = delayDuration / 連続表示 = skipDelayDuration）は、
 * 上位に置く共有 TooltipProvider が制御する。ここでは Provider を内包しないよう
 * Radix プリミティブの Root/Trigger を直接使い、warmup/skip 状態を全項目で共有する。
 */
export default function TruncatedText({
  children,
  className,
  side = "right",
}: TruncatedTextProps) {
  const { ref, isTruncated } = useIsTruncated<HTMLSpanElement>([children]);

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <span ref={ref} className={cn("truncate", className)}>
          {children}
        </span>
      </TooltipPrimitive.Trigger>
      {/* 溢れている項目にだけツールチップを付ける（収まっている項目には出さない） */}
      {isTruncated && (
        <TooltipContent side={side} className="max-w-xs">
          {children}
        </TooltipContent>
      )}
    </TooltipPrimitive.Root>
  );
}
