import { Apple, Monitor } from 'lucide-react';
import { useOS } from '@/contexts/OSContext';

interface OSToggleProps {
  onOSChange?: (os: 'mac' | 'windows') => void;
}

export default function OSToggle({ onOSChange }: OSToggleProps) {
  const { selectedOS, setSelectedOS } = useOS();

  const handleOSChange = (os: 'mac' | 'windows') => {
    setSelectedOS(os);
    onOSChange?.(os);
  };

  return (
    <div className="inline-flex gap-1 p-1 bg-muted rounded-lg">
      <button
        onClick={() => handleOSChange('mac')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium ${
          selectedOS === 'mac'
            ? 'bg-card text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Apple size={18} />
        <span>Mac</span>
      </button>
      <button
        onClick={() => handleOSChange('windows')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium ${
          selectedOS === 'windows'
            ? 'bg-card text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Monitor size={18} />
        <span>Windows</span>
      </button>
    </div>
  );
}
