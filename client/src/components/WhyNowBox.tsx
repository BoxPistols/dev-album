import { Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface WhyNowBoxProps {
  title?: string;
  children: ReactNode;
  tags?: [string, ...string[]];
}

export default function WhyNowBox({ title = 'なぜ今、これを学ぶのか？', children, tags }: WhyNowBoxProps) {
  return (
    <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-6 mb-10">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="text-white" size={16} aria-hidden="true" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-primary mb-2 text-base">{title}</h3>
          <div className="text-sm leading-relaxed text-foreground/80 space-y-2">{children}</div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
