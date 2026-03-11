import { ExternalLink, BookOpen } from 'lucide-react';

interface ReferenceLink {
  title: string;
  url: string;
  description?: string;
}

interface ReferenceLinksProps {
  title?: string;
  links: ReferenceLink[];
}

export default function ReferenceLinks({
  title = '公式リファレンス',
  links,
}: ReferenceLinksProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-5 my-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={16} className="text-slate-500 dark:text-slate-400" />
        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {title}
        </span>
      </div>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ExternalLink
                size={14}
                className="mt-0.5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              <div className="min-w-0">
                <span className="text-sm font-medium text-primary group-hover:underline">
                  {link.title}
                </span>
                {link.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {link.description}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
