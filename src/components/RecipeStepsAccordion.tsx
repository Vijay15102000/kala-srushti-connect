import { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, Play, Pause, RotateCcw, CheckCircle2, Undo2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import TextToSpeech from '@/components/TextToSpeech';
import type { RecipeStep } from '@/lib/data';

interface Props {
  title: string;
  steps: RecipeStep[];
  lang: 'en' | 'kn';
  defaultOpen?: boolean;
}

export default function RecipeStepsAccordion({ title, steps, lang, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
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
            if (activeStep === steps.length - 1) {
              speakMessage('This section is complete!');
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
  }, [timerRunning, timeLeft, activeStep, steps.length, speakMessage]);

  const startTimer = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (step.timeMinutes <= 0) {
      setCompletedSteps(prev => new Set(prev).add(stepIndex));
      speakMessage('Step complete!');
      return;
    }
    setActiveStep(stepIndex);
    setTimeLeft(Math.round(step.timeMinutes * 60));
    setTimerRunning(true);
  };

  const toggleTimer = () => setTimerRunning(prev => !prev);
  const resetTimer = () => {
    setTimerRunning(false);
    if (activeStep !== null) setTimeLeft(Math.round(steps[activeStep].timeMinutes * 60));
  };

  const toggleComplete = (i: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const completedCount = completedSteps.size;
  const allStepsText = steps.map((s, i) => `Step ${i + 1}: ${s.instruction[lang]}`).join('. ');

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border hover:bg-muted/60 transition-colors">
        <div className="flex items-center gap-3">
          <span className="font-heading text-lg font-bold text-foreground">{title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-body">
            {completedCount}/{steps.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TextToSpeech text={allStepsText} label={lang === 'kn' ? 'ಕೇಳಿ' : 'Listen'} />
          <span className="text-muted-foreground text-sm">{open ? '▲' : '▼'}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-3">
        {steps.map((step, i) => {
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
                  <p className={`font-body ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{step.instruction[lang]}</p>
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
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {!isCompleted ? (
                      <>
                        {step.timeMinutes > 0 && (
                          <button onClick={() => startTimer(i)} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            {lang === 'kn' ? 'ಟೈಮರ್ ಪ್ರಾರಂಭಿಸಿ' : 'Start Timer'}
                          </button>
                        )}
                        <button onClick={() => toggleComplete(i)} className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 transition-colors flex items-center gap-1">
                          <CheckCircle2 size={12} /> {lang === 'kn' ? 'ಮುಗಿದಿದೆ' : 'Mark Done'}
                        </button>
                      </>
                    ) : (
                      <button onClick={() => toggleComplete(i)} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors flex items-center gap-1">
                        <Undo2 size={12} /> {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Undo'}
                      </button>
                    )}
                    <TextToSpeech text={step.instruction[lang]} label={lang === 'kn' ? 'ಕೇಳಿ' : 'Listen'} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
