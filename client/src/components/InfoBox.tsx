import { AlertCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ReactNode } from 'react';

type InfoBoxType = 'info' | 'warning' | 'success' | 'error';

interface InfoBoxProps {
  type?: InfoBoxType;
  title?: string;
  children: ReactNode;
}

const styles: Record<InfoBoxType, { bg: string; border: string; icon: ReactNode; title: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    icon: <Info className="text-blue-600 dark:text-blue-400" size={20} />,
    title: '情報',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    icon: <AlertTriangle className="text-amber-600 dark:text-amber-400" size={20} />,
    title: '注意',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    icon: <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />,
    title: '成功',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    icon: <AlertCircle className="text-red-600 dark:text-red-400" size={20} />,
    title: 'エラー',
  },
};

export default function InfoBox({ type = 'info', title, children }: InfoBoxProps) {
  const style = styles[type];

  return (
    <div className={`rounded-r-lg border-l-4 ${style.bg} ${style.border} p-4`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-0.5">{style.icon}</div>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1 text-foreground">{title}</h4>}
          <div className="text-sm leading-relaxed text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
}
