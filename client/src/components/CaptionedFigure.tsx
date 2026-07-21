import type { ReactNode } from "react";

interface CaptionedFigureProps {
  caption?: string;
  className?: string;
  children: ReactNode;
}

export default function CaptionedFigure({
  caption,
  className = "my-8",
  children,
}: CaptionedFigureProps) {
  return (
    <figure className={className}>
      {caption && (
        <figcaption className="text-sm text-muted-foreground mb-3 font-medium">
          {caption}
        </figcaption>
      )}
      {children}
    </figure>
  );
}
