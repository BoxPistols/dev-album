import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
}

export default function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20 p-6 my-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
          <MessageCircleQuestion className="text-white" size={16} />
        </div>
        <span className="text-sm font-bold text-orange-700 dark:text-orange-300 uppercase tracking-wider">
          よくある質問
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-lg border border-orange-200/60 dark:border-orange-800/60 bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors"
              >
                <span className="text-sm font-medium text-foreground pr-4">
                  Q. {item.question}
                </span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-muted-foreground transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-0">
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
