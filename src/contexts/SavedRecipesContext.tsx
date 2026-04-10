import { createContext, useContext, useState, ReactNode } from 'react';

interface SavedRecipesContextType {
  savedRecipes: Record<string, number[]>; // userId -> recipeIds
  saveRecipe: (userId: string, recipeId: number) => void;
  unsaveRecipe: (userId: string, recipeId: number) => void;
  isRecipeSaved: (userId: string, recipeId: number) => boolean;
  getUserSavedIds: (userId: string) => number[];
}

const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(undefined);

export function SavedRecipesProvider({ children }: { children: ReactNode }) {
  const [savedRecipes, setSavedRecipes] = useState<Record<string, number[]>>({});

  const saveRecipe = (userId: string, recipeId: number) => {
    setSavedRecipes(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), recipeId],
    }));
  };

  const unsaveRecipe = (userId: string, recipeId: number) => {
    setSavedRecipes(prev => ({
      ...prev,
      [userId]: (prev[userId] || []).filter(id => id !== recipeId),
    }));
  };

  const isRecipeSaved = (userId: string, recipeId: number) =>
    (savedRecipes[userId] || []).includes(recipeId);

  const getUserSavedIds = (userId: string) => savedRecipes[userId] || [];

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, saveRecipe, unsaveRecipe, isRecipeSaved, getUserSavedIds }}>
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const ctx = useContext(SavedRecipesContext);
  if (!ctx) throw new Error('useSavedRecipes must be inside SavedRecipesProvider');
  return ctx;
}
