// hooks/ExcuseContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ExcuseContextType = {
  favorites: Record<string, string[]>;
  saveFavorite: (category: string, excuse: string) => void;
  removeFavorite: (category: string, excuse: string) => void;
  selectedCategory: keyof typeof import('../constants/excusesData').EXCUSES | null;
  setCategory: (cat: keyof typeof import('../constants/excusesData').EXCUSES) => void;
};

const ExcuseContext = createContext<ExcuseContextType | undefined>(undefined);

export function ExcuseProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Record<string, string[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<ExcuseContextType['selectedCategory']>(null);

  const saveFavorite = (category: string, excuse: string) => {
    setFavorites(prev => {
      const arr = prev[category] || [];
      if (arr.includes(excuse)) return prev;
      return { ...prev, [category]: [...arr, excuse] };
    });
  };
  const removeFavorite = (category: string, excuse: string) => {
    setFavorites(prev => {
      const arr = prev[category] || [];
      return { ...prev, [category]: arr.filter(e => e !== excuse) };
    });
  };
  const setCategory = (cat: typeof selectedCategory) => {
    setSelectedCategory(cat);
  };

  return (
    <ExcuseContext.Provider value={{ favorites, saveFavorite, removeFavorite, selectedCategory, setCategory }}>
      {children}
    </ExcuseContext.Provider>
  );
}

export function useExcuses() {
  const ctx = useContext(ExcuseContext);
  if (!ctx) throw new Error('useExcuses must be used within an ExcuseProvider');
  return ctx;
}
