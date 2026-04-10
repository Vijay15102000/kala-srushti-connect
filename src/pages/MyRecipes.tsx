import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRecipes } from '@/contexts/RecipesContext';
import { useSavedRecipes } from '@/contexts/SavedRecipesContext';
import { useLang } from '@/contexts/LanguageContext';
import { ArrowLeft, Clock, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyRecipes() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { allRecipes } = useRecipes();
  const { getUserSavedIds, unsaveRecipe } = useSavedRecipes();
  const { lang } = useLang();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {lang === 'kn' ? 'ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಆಗಿ' : 'Please login first'}
          </h1>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-body">
            {lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ' : 'Go Home'}
          </button>
        </div>
      </div>
    );
  }

  const savedIds = getUserSavedIds(user.id);
  const savedRecipesList = allRecipes.filter(r => savedIds.includes(r.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-heading text-xl font-bold text-foreground">
            {lang === 'kn' ? 'ನನ್ನ ಪಾಕವಿಧಾನಗಳು' : 'My Recipes'}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {savedRecipesList.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-body">
              {lang === 'kn' ? 'ಯಾವುದೇ ಉಳಿಸಿದ ಪಾಕವಿಧಾನಗಳಿಲ್ಲ' : 'No saved recipes yet'}
            </p>
            <p className="text-sm text-muted-foreground font-body mt-1">
              {lang === 'kn' ? 'ಪಾಕವಿಧಾನ ಕಾರ್ಡ್‌ಗಳಲ್ಲಿ ❤️ ಒತ್ತಿ ಉಳಿಸಿ' : 'Tap the ❤️ on recipe cards to save them here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedRecipesList.map((recipe, i) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-xl transition-shadow cursor-pointer relative"
              >
                <div onClick={() => navigate(`/recipe/${recipe.id}`)} className="aspect-[4/3] overflow-hidden">
                  <img src={recipe.image} alt={recipe.name[lang]} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-foreground" onClick={() => navigate(`/recipe/${recipe.id}`)}>{recipe.name[lang]}</h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={14} /> {recipe.time}</span>
                  </div>
                  <button
                    onClick={() => unsaveRecipe(user.id, recipe.id)}
                    className="mt-2 text-xs text-destructive hover:underline font-body"
                  >
                    {lang === 'kn' ? 'ತೆಗೆದುಹಾಕಿ' : 'Remove'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
