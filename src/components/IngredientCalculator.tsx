import { useState } from 'react';
import { Calculator } from 'lucide-react';
import type { Ingredient } from '@/lib/data';

interface Props {
  ingredients: Ingredient[];
  lang: 'en' | 'kn';
  label?: string;
}

export default function IngredientCalculator({ ingredients, lang, label }: Props) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showCalc, setShowCalc] = useState(false);

  return (
    <div className="bg-muted/30 rounded-xl border border-border p-5">
      <button onClick={() => setShowCalc(!showCalc)} className="flex items-center gap-2 font-heading text-lg font-bold text-foreground w-full text-left">
        <Calculator size={20} className="text-primary" />
        {label || (lang === 'kn' ? 'ತಯಾರಿಸಲು ಬಯಸುವಿರಾ? ವ್ಯಕ್ತಿಗಳ ಸಂಖ್ಯೆ ಆಯ್ಕೆಮಾಡಿ' : 'Want to prepare? Select number of persons')}
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
                {ingredients.map((ing, i) => {
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
                {ingredients.map(ing =>
                  `${ing.name[lang]} ${ing.unit === 'cups' ? ing.ratio + (lang === 'kn' ? ' ಕಪ್' : ' cup') : (ing.ratio * 1000) + (lang === 'kn' ? ' ಗ್ರಾಂ' : ' gm')}`
                ).join(', ')}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
