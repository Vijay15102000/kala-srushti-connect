import { createContext, useContext, useState, ReactNode } from 'react';
import { recipes as defaultRecipes, Recipe } from '@/lib/data';

interface RecipesContextType {
  allRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: number) => void;
  updateRecipe: (id: number, recipe: Partial<Recipe>) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(defaultRecipes);

  const addRecipe = (recipe: Recipe) => setAllRecipes(prev => [...prev, recipe]);
  const removeRecipe = (id: number) => setAllRecipes(prev => prev.filter(r => r.id !== id));
  const updateRecipe = (id: number, updates: Partial<Recipe>) =>
    setAllRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));

  return (
    <RecipesContext.Provider value={{ allRecipes, addRecipe, removeRecipe, updateRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes must be inside RecipesProvider');
  return ctx;
}
