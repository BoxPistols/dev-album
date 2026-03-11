import { Bookmark } from 'lucide-react';
import { useLocation } from 'wouter';
import { useBookmarks } from '@/hooks/useBookmarks';

export default function BookmarkButton() {
  const [location] = useLocation();
  const { toggle, isBookmarked } = useBookmarks();

  if (location === '/' || location === '/react' || location === '/git' || location === '/threejs' || location === '/claude-mux') return null;

  const active = isBookmarked(location);

  return (
    <button
      onClick={() => toggle(location)}
      className={`rounded-full p-2 transition-colors ${
        active
          ? 'text-amber-500 hover:text-amber-600'
          : 'text-muted-foreground hover:text-foreground'
      }`}
      title={active ? 'ブックマークを解除' : 'このページをブックマーク'}
    >
      <Bookmark size={20} className={active ? 'fill-current' : ''} />
    </button>
  );
}
