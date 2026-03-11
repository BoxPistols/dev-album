import React, { createContext, useContext, useState, useEffect } from 'react';

type LayoutMode = 'normal' | 'wide';

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
    const stored = localStorage.getItem('layout-mode');
    return stored === 'wide' ? 'wide' : 'normal';
  });

  useEffect(() => {
    localStorage.setItem('layout-mode', layoutMode);
  }, [layoutMode]);

  const toggleLayout = () => {
    setLayoutMode((prev) => (prev === 'normal' ? 'wide' : 'normal'));
  };

  return (
    <LayoutContext.Provider value={{ layoutMode, setLayoutMode, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
}
