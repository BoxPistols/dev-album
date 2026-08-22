import { useLocation } from 'wouter';
import { getPageByPath, sections, type ManualId } from '@/lib/navigation';

const manualColors: Record<ManualId, string> = {
  react: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  git: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  threejs: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
  'claude-code': 'bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  'ai-ml': 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  'ux-design': 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800',
  api: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  vue: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  infra: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800',
  devflow: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
};

export default function SectionBadge() {
  const [location] = useLocation();
  const page = getPageByPath(location);
  if (!page) return null;

  const section = sections.find((s) => s.id === page.sectionId);
  if (!section) return null;

  return (
    <div
      className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-sm border ${
        manualColors[page.manualId]
      }`}
    >
      {section.title}
    </div>
  );
}
