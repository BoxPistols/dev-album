import React, { createContext, useContext, useState, useEffect } from 'react';

type OS = 'mac' | 'windows';

interface OSContextType {
  selectedOS: OS;
  setSelectedOS: (os: OS) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

interface OSProviderProps {
  children: React.ReactNode;
}

export function OSProvider({ children }: OSProviderProps) {
  const [selectedOS, setSelectedOS] = useState<OS>('mac');
  const [isHydrated, setIsHydrated] = useState(false);

  // マウント時にlocalStorageから復元
  useEffect(() => {
    const stored = localStorage.getItem('selectedOS') as OS | null;
    if (stored && (stored === 'mac' || stored === 'windows')) {
      setSelectedOS(stored);
    }
    setIsHydrated(true);
  }, []);

  // selectedOSが変更されたときにlocalStorageに保存
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('selectedOS', selectedOS);
    }
  }, [selectedOS, isHydrated]);

  return (
    <OSContext.Provider value={{ selectedOS, setSelectedOS }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within OSProvider');
  }
  return context;
}
