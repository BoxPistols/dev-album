import { useEffect } from 'react';
import { useLocation } from 'wouter';
import {
  getNextPage,
  getPreviousPage,
  getNextSectionFirstPage,
  getPrevSectionFirstPage,
} from '@/lib/navigation';

export function useKeyboardNav() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('focus-search'));
        return;
      }

      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.ctrlKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();

        if (e.shiftKey) {
          const target =
            e.key === 'ArrowDown'
              ? getNextSectionFirstPage(location)
              : getPrevSectionFirstPage(location);
          if (target) setLocation(target.path);
        } else {
          const target =
            e.key === 'ArrowDown'
              ? getNextPage(location)
              : getPreviousPage(location);
          if (target) setLocation(target.path);
        }
      }
    }

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [location, setLocation]);
}
