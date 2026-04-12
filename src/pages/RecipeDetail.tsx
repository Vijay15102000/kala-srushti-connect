import { useParams, useNavigate } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { useRecipes } from '@/contexts/RecipesContext';
import { useSavedRecipes } from '@/contexts/SavedRecipesContext';
import { useAuth } from '@/contexts/AuthContext';
import TextToSpeech from '@/components/TextToSpeech';
import RecipeStepsAccordion from '@/components/RecipeStepsAccordion';
import IngredientCalculator from '@/components/IngredientCalculator';
import { ArrowLeft, MapPin, Clock, Heart } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const { allRecipes } = useRecipes();
  const { user } = useAuth();
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useSavedRecipes();
  const recipe = allRecipes.find(r => r.id === Number(id));

  const saved = user && recipe ? isRecipeSaved(user.id, recipe.id) : false;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            {lang === 'kn' ? 'ಪಾಕವಿಧಾನ ಸಿಗಲಿಲ್ಲ' : 'Recipe not found'}
          </h1>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-body">
            {lang === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ' : 'Go Home'}
          </button>
        </div>
      </div>
    );
  }

  const openMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(recipe.origin)}`, '_blank');
  };

  const toggleSave = () => {
    if (!user) return;
    if (saved) unsaveRecipe(user.id, recipe.id);
    else saveRecipe(user.id, recipe.id);
  };

  const allStepsText = recipe.steps.map((s, i) => `Step ${i + 1}: ${s.instruction[lang]}`).join('. ');
  const hasIngredients = recipe.ingredients && recipe.ingredients.length > 0;
  const hasAccompaniments = recipe.accompaniments && recipe.accompaniments.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img src={recipe.image} alt={recipe.name[lang]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/80 text-foreground backdrop-blur-sm">
          <ArrowLeft size={20} />
        </button>
        {user && (
          <button onClick={toggleSave} className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-sm transition-colors text-sm font-body font-medium ${saved ? 'bg-destructive/80 text-white' : 'bg-background/80 text-foreground'}`}>
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
            {saved ? (lang === 'kn' ? 'ಉಳಿಸಲಾಗಿದೆ' : 'Saved') : (lang === 'kn' ? 'ಉಳಿಸಿ' : 'Save')}
          </button>
        )}
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg space-y-6">
          {/* Title & Meta */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{recipe.name[lang]}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock size={16} /> {recipe.time}</span>
                <button onClick={openMaps} className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <MapPin size={16} /> {recipe.origin}
                </button>
              </div>
            </div>
            <TextToSpeech text={`${recipe.name[lang]}. ${recipe.description[lang]}. ${allStepsText}`} label={lang === 'kn' ? 'ಪಾಕವಿಧಾನ ಓದಿ' : 'Read Recipe'} />
          </div>

          <p className="text-muted-foreground leading-relaxed font-body">{recipe.description[lang]}</p>

          {/* Ingredient Calculator for Main Dish */}
          {hasIngredients && (
            <IngredientCalculator
              ingredients={recipe.ingredients!}
              lang={lang}
              label={lang === 'kn' ? `${recipe.name.kn} - ಪದಾರ್ಥಗಳ ಲೆಕ್ಕಾಚಾರ` : `${recipe.name.en} - Ingredient Calculator`}
            />
          )}

          {/* Main Dish Steps */}
          <RecipeStepsAccordion
            title={lang === 'kn' ? `${recipe.name.kn} - ಹಂತಗಳು` : `${recipe.name.en} - Steps`}
            steps={recipe.steps}
            lang={lang}
            defaultOpen={true}
          />

          {/* Accompanying Dishes */}
          {hasAccompaniments && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-foreground">
                {lang === 'kn' ? 'ಜೊತೆ ಖಾದ್ಯಗಳು' : 'Accompanying Dishes'}
              </h2>
              {recipe.accompaniments!.map((acc, idx) => (
                <div key={idx} className="space-y-3">
                  {/* Accompaniment Ingredient Calculator */}
                  {acc.ingredients && acc.ingredients.length > 0 && (
                    <IngredientCalculator
                      ingredients={acc.ingredients}
                      lang={lang}
                      label={lang === 'kn' ? `${acc.name.kn} - ಪದಾರ್ಥಗಳ ಲೆಕ್ಕಾಚಾರ` : `${acc.name.en} - Ingredient Calculator`}
                    />
                  )}
                  {/* Accompaniment Steps */}
                  <RecipeStepsAccordion
                    title={acc.name[lang]}
                    steps={acc.steps}
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
