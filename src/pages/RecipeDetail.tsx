import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipes } from '@/lib/data';
import { useLang } from '@/contexts/LanguageContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import TextToSpeech from '@/components/TextToSpeech';
import { ArrowLeft, MapPin, Clock, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function RecipeDetailContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const recipe = recipes.find(r => r.id === Number(id));

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
            // Check if last step
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
          <h1 className="font-heading text-2xl font-bold text-foreground">Recipe not found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-body">Go Home</button>
        </div>
      </div>
    );
  }

  const startTimer = (stepIndex: number) => {
    const step = recipe.steps[stepIndex];
    if (step.timeMinutes <= 0) {
      setCompletedSteps(prev => new Set(prev).add(stepIndex));
      if (stepIndex === recipe.steps.length - 1) {
        speakMessage('Your dish is ready to eat! Enjoy your meal!');
      } else {
        speakMessage('Step complete! Ready for the next step.');
      }
      return;
    }
    setActiveStep(stepIndex);
    setTimeLeft(Math.round(step.timeMinutes * 60));
    setTimerRunning(true);
  };

  const toggleTimer = () => setTimerRunning(prev => !prev);

  const resetTimer = () => {
    setTimerRunning(false);
    if (activeStep !== null) {
      setTimeLeft(Math.round(recipe.steps[activeStep].timeMinutes * 60));
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const openMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(recipe.origin)}`, '_blank');
  };

  const allStepsText = recipe.steps.map((s, i) => `Step ${i + 1}: ${s.instruction[lang]}. Time: ${s.timeMinutes > 0 ? s.timeMinutes + ' minutes' : 'No timer needed'}`).join('. ');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img src={recipe.image} alt={recipe.name[lang]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/80 text-foreground backdrop-blur-sm">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
          {/* Header */}
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
            <TextToSpeech text={`${recipe.name[lang]}. ${recipe.description[lang]}. ${allStepsText}`} label="Read Recipe" />
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-muted-foreground leading-relaxed font-body">{recipe.description[lang]}</p>
          </div>

          {/* Timer display */}
          {activeStep !== null && timeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
            >
              <p className="text-sm text-primary font-medium mb-2">Step {activeStep + 1} Timer</p>
              <p className="text-4xl font-bold text-primary font-heading">{formatTime(timeLeft)}</p>
              <div className="flex gap-3 justify-center mt-3">
                <button onClick={toggleTimer} className="p-2 rounded-full bg-primary text-primary-foreground">
                  {timerRunning ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button onClick={resetTimer} className="p-2 rounded-full bg-muted text-muted-foreground">
                  <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Steps */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            {lang === 'en' ? 'Step-by-Step Instructions' : 'ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳು'}
          </h2>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => {
              const isCompleted = completedSteps.has(i);
              const isActive = activeStep === i && timerRunning;

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
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {step.timeMinutes > 0 && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} /> {step.timeMinutes} min
                          </span>
                        )}
                        {!isCompleted && (
                          <button
                            onClick={() => startTimer(i)}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            {step.timeMinutes > 0 ? 'Start Timer' : 'Mark Done'}
                          </button>
                        )}
                        <TextToSpeech text={step.instruction[lang]} label="Listen" />
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

export default function RecipeDetail() {
  return (
    <LanguageProvider>
      <RecipeDetailContent />
    </LanguageProvider>
  );
}
