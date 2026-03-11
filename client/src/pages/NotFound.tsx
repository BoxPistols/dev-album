import { Link } from 'wouter';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          お探しのページが見つかりませんでした
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Home size={20} />
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
