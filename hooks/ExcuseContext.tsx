// hooks/ExcuseContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ExcuseContextType = {
  favorites: Record<string, string[]>;
  saveFavorite: (category: string, excuse: string) => void;
};

const ExcuseContext = createContext<ExcuseContextType | undefined>(undefined);

export function ExcuseProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Record<string, string[]>>({});

  const saveFavorite = (category: string, excuse: string) => {
    setFavorites(prev => {
      const arr = prev[category] || [];
      if (arr.includes(excuse)) return prev;
      return { ...prev, [category]: [...arr, excuse] };
    });
  };

  return (
    <ExcuseContext.Provider value={{ favorites, saveFavorite }}>
      {children}
    </ExcuseContext.Provider>
  );
}

export function useExcuses() {
  const ctx = useContext(ExcuseContext);
  if (!ctx) throw new Error('useExcuses must be inside <ExcuseProvider>');
  return ctx;
}
