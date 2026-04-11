import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLang } from '@/contexts/LanguageContext';
import { useRecipes } from '@/contexts/RecipesContext';
import { useSavedRecipes } from '@/contexts/SavedRecipesContext';
import { useAuth } from '@/contexts/AuthContext';
import TextToSpeech from '@/components/TextToSpeech';
import { ArrowLeft, MapPin, Clock, Play, Pause, RotateCcw, CheckCircle2, Calculator, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const { allRecipes } = useRecipes();
  const { user } = useAuth();
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useSavedRecipes();
  const recipe = allRecipes.find(r => r.id === Number(id));

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showCalc, setShowCalc] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const saved = user && recipe ? isRecipeSaved(user.id, recipe.id) : false;

  const speakMessage = useCallback((message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.85;
    utterance.pitch = 0.7;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Google UK English Male') || v.name.includes('Daniel') || v.name.includes('Male')
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setTimerRunning(false);
            if (recipe && activeStep === recipe.steps.length - 1) {
              speakMessage('Your dish is ready to eat! Enjoy your meal!');
            } else {
              speakMessage('Timer complete! Ready for the next step.');
            }
            if (activeStep !== null) {
              setCompletedSteps(prev => new Set(prev).add(activeStep));
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerRunning, timeLeft, activeStep, recipe, speakMessage]);

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

  const startTimer = (stepIndex: number) => {
    const step = recipe.steps[stepIndex];
    if (step.timeMinutes <= 0) {
      setCompletedSteps(prev => new Set(prev).add(stepIndex));
      if (stepIndex === recipe.steps.length - 1) speakMessage('Your dish is ready to eat!');
      else speakMessage('Step complete! Ready for the next step.');
      return;
    }
    setActiveStep(stepIndex);
    setTimeLeft(Math.round(step.timeMinutes * 60));
    setTimerRunning(true);
  };

  const toggleTimer = () => setTimerRunning(prev => !prev);
  const resetTimer = () => {
    setTimerRunning(false);
    if (activeStep !== null) setTimeLeft(Math.round(recipe.steps[activeStep].timeMinutes * 60));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const openMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(recipe.origin)}`, '_blank');
  };

  const toggleSave = () => {
    if (!user) return;
    if (saved) unsaveRecipe(user.id, recipe.id);
    else saveRecipe(user.id, recipe.id);
  };

  const allStepsText = recipe.steps.map((s, i) => `Step ${i + 1}: ${s.instruction[lang]}. Time: ${s.timeMinutes > 0 ? s.timeMinutes + ' minutes' : 'No timer needed'}`).join('. ');

  const hasIngredients = recipe.ingredients && recipe.ingredients.length > 0;

  return (
    <div className="min-h-screen bg-background">
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
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
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

          <div className="mb-8">
            <p className="text-muted-foreground leading-relaxed font-body">{recipe.description[lang]}</p>
          </div>

          {/* Ingredient Ratio Calculator - Adults & Children */}
          {hasIngredients && (
            <div className="mb-8 bg-muted/30 rounded-xl border border-border p-5">
              <button onClick={() => setShowCalc(!showCalc)} className="flex items-center gap-2 font-heading text-lg font-bold text-foreground w-full text-left">
                <Calculator size={20} className="text-primary" />
                {lang === 'kn' ? 'ತಯಾರಿಸಲು ಬಯಸುವಿರಾ? ವ್ಯಕ್ತಿಗಳ ಸಂಖ್ಯೆ ಆಯ್ಕೆಮಾಡಿ' : 'Want to prepare? Select number of persons'}
              </button>
              {showCalc && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-body font-medium text-foreground">
                        {lang === 'kn' ? 'ವಯಸ್ಕರು (ಪೂರ್ಣ ಪ್ರಮಾಣ)' : 'Adults (full portion)'}
                      </label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setAdults(Math.max(0, adults - 1))} className="w-8 h-8 rounded-lg bg-muted text-foreground font-bold flex items-center justify-center hover:bg-muted/80">−</button>
                        <span className="w-8 text-center font-heading font-bold text-foreground">{adults}</span>
                        <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center hover:bg-primary/90">+</button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-body font-medium text-foreground">
                        {lang === 'kn' ? 'ಮಕ್ಕಳು (ಅರ್ಧ ಪ್ರಮಾಣ)' : 'Children (half portion)'}
                      </label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-lg bg-muted text-foreground font-bold flex items-center justify-center hover:bg-muted/80">−</button>
                        <span className="w-8 text-center font-heading font-bold text-foreground">{children}</span>
                        <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center hover:bg-primary/90">+</button>
                      </div>
                    </div>
                  </div>

                  {(adults > 0 || children > 0) && (
                    <>
                      <div className="text-xs text-muted-foreground font-body bg-background rounded-lg px-3 py-2 border border-border">
                        {lang === 'kn'
                          ? `ಲೆಕ್ಕಾಚಾರ: ${adults} ವಯಸ್ಕರು × ಪೂರ್ಣ + ${children} ಮಕ್ಕಳು × ½ = ${adults + children * 0.5} ವ್ಯಕ್ತಿ ಪ್ರಮಾಣ`
                          : `Calculation: ${adults} adult${adults !== 1 ? 's' : ''} × full + ${children} child${children !== 1 ? 'ren' : ''} × ½ = ${adults + children * 0.5} person equivalent`}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {recipe.ingredients!.map((ing, i) => {
                          const totalRatio = ing.ratio * adults + ing.ratio * 0.5 * children;
                          return (
                            <div key={i} className="flex items-center justify-between bg-background rounded-lg px-3 py-2.5 border border-border">
                              <span className="text-sm font-body text-foreground">{ing.name[lang]}</span>
                              <span className="text-sm font-bold text-primary">
                                {ing.unit === 'cups'
                                  ? `${Math.ceil(totalRatio)} ${lang === 'kn' ? 'ಕಪ್ (200ml)' : 'cups (200ml)'}`
                                  : `${(totalRatio * 1000).toFixed(0)} ${lang === 'kn' ? 'ಗ್ರಾಂ' : 'gm'}`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground font-body italic">
                        {lang === 'kn' ? 'ಪ್ರತಿ ವಯಸ್ಕರಿಗೆ: ' : 'Per adult: '}
                        {recipe.ingredients!.map(ing =>
                          `${ing.name[lang]} ${ing.unit === 'cups' ? ing.ratio + (lang === 'kn' ? ' ಕಪ್' : ' cup') : (ing.ratio * 1000) + (lang === 'kn' ? ' ಗ್ರಾಂ' : ' gm')}`
                        ).join(', ')}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Steps */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            {lang === 'kn' ? 'ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳು' : 'Step-by-Step Instructions'}
          </h2>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => {
              const isCompleted = completedSteps.has(i);
              const isActive = activeStep === i && timerRunning;
              const isActiveTimer = activeStep === i && timeLeft > 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive ? 'border-primary bg-primary/5 shadow-md' :
                    isCompleted ? 'border-secondary/30 bg-secondary/5' :
                    'border-border bg-background'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted ? 'bg-secondary text-secondary-foreground' :
                      isActive ? 'bg-primary text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={16} /> : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-body">{step.instruction[lang]}</p>
                      {step.timeMinutes > 0 && (
                        <div className="mt-2 flex items-center gap-2 bg-muted/40 rounded-lg px-3 py-1.5 w-fit">
                          <Clock size={12} className="text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {lang === 'kn' ? 'ಸಮಯ:' : 'Time:'} {step.timeMinutes >= 60 ? `${(step.timeMinutes / 60).toFixed(step.timeMinutes % 60 === 0 ? 0 : 1)} ${lang === 'kn' ? 'ಗಂಟೆ' : 'hr'}` : `${step.timeMinutes} ${lang === 'kn' ? 'ನಿಮಿಷ' : 'min'}`}
                          </span>
                          {isActiveTimer && (
                            <span className="inline-flex items-center gap-1.5 ml-1 text-xs text-primary font-bold">
                              <span className="font-heading">{formatTime(timeLeft)}</span>
                              <button onClick={toggleTimer} className="p-0.5 rounded-full bg-primary/10 hover:bg-primary/20">
                                {timerRunning ? <Pause size={12} /> : <Play size={12} />}
                              </button>
                              <button onClick={resetTimer} className="p-0.5 rounded-full bg-muted hover:bg-muted/80">
                                <RotateCcw size={12} />
                              </button>
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {!isCompleted && (
                          <button onClick={() => startTimer(i)} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            {step.timeMinutes > 0 ? (lang === 'kn' ? 'ಟೈಮರ್ ಪ್ರಾರಂಭಿಸಿ' : 'Start Timer') : (lang === 'kn' ? 'ಮುಗಿದಿದೆ ಎಂದು ಗುರುತಿಸಿ' : 'Mark Done')}
                          </button>
                        )}
                        <TextToSpeech text={step.instruction[lang]} label={lang === 'kn' ? 'ಕೇಳಿ' : 'Listen'} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
