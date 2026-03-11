import { useLocation } from 'wouter';
import { getPageByPath, getManualPages } from '@/lib/navigation';

export default function StepIndicator() {
  const [location] = useLocation();
  const page = getPageByPath(location);

  if (!page) return null;

  const totalPages = getManualPages(page.manualId).length;

  return (
    <div className="text-sm font-medium text-muted-foreground">
      STEP {page.step} / {totalPages}
    </div>
  );
}
