import { useState } from 'react';
import { StickyNote, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { usePageNotes } from '@/hooks/usePageNotes';

interface PageNotesProps {
  path: string;
}

export default function PageNotes({ path }: PageNotesProps) {
  const { note, setNote } = usePageNotes(path);
  const [isOpen, setIsOpen] = useState(!!note);

  return (
    <div className="my-6 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/10 overflow-hidden">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <StickyNote size={16} />
          <span>このページのメモ</span>
          {note && !isOpen && (
            <span className="text-xs text-amber-500 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
              メモあり
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="このページに関するメモを自由に書けます（自動保存）"
            className="w-full min-h-[100px] p-3 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-white dark:bg-[#1e1e2e] text-foreground text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-700 placeholder:text-muted-foreground/50"
          />
          {note && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setNote('')}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              >
                <Trash2 size={12} />
                メモを削除
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
