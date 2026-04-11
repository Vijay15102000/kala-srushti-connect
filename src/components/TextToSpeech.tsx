import { useState, useEffect, useRef } from 'react';
import { Volume2, Square } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  lang: 'en-US' | 'kn-IN';
  label?: string;
}

export default function TextToSpeech({ text, lang, label = 'Play' }: TextToSpeechProps) {
  const [playing, setPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length > 0) {
        setVoices(allVoices);
      }
    };

    // Chrome/Edge/Safari need this listener
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial attempt

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    // Safety check: ensure voices are loaded
    const currentVoices = window.speechSynthesis.getVoices();
    const activeVoices = currentVoices.length > 0 ? currentVoices : voices;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // --- DRAMATIC SETTINGS ---
    utterance.lang = lang;
    utterance.rate = 0.70;  // 70% speed (Deliberate & Heavy)
    utterance.pitch = 0.6;  // Lower pitch (Deep & Serious)
    utterance.volume = 1;

    // --- SMART VOICE SELECTION ---
    const languagePrefix = lang.split('-')[0]; // 'en' or 'kn'
    const filteredVoices = activeVoices.filter(v => v.lang.startsWith(languagePrefix));

    let selectedVoice = null;

    if (lang === 'kn-IN') {
      // Kannada usually only has one Google voice; we pick the first one 
      // and let the Pitch/Rate settings do the dramatic work.
      selectedVoice = filteredVoices.find(v => v.name.includes('Google')) || filteredVoices[0];
    } else {
      // English Male Selection
      selectedVoice = filteredVoices.find(v => 
        v.name.includes('Daniel') || // The "Classic" dramatic British male
        v.name.includes('Google UK English Male') ||
        v.name.includes('Guy') ||
        v.name.includes('Microsoft Andrew') ||
        v.name.includes('Male')
      ) || filteredVoices[0];
    }

    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.onend = () => setPlaying(false);
    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setPlaying(false);
    };

    synthesisRef.current = utterance;
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={speak} 
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        playing ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
      }`}
    >
      {playing ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} />}
      <span className="text-sm font-semibold">{playing ? 'Stop Narration' : label}</span>
    </button>
  );
}
// import { useState, useRef, useEffect } from 'react';
// import { Volume2, Square, Settings } from 'lucide-react';

// interface TextToSpeechProps {
//   text: string;
//   label?: string;
//   onComplete?: () => void;
// }

// export default function TextToSpeech({ text, label = 'Play Audio', onComplete }: TextToSpeechProps) {
//   const [playing, setPlaying] = useState(false);
//   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

//   const speak = () => {
//     if (playing) {
//       window.speechSynthesis.cancel();
//       setPlaying(false);
//       return;
//     }

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = 0.9;
//     utterance.pitch = 0.8;
//     utterance.volume = 1;

//     // Try to pick a deeper/dramatic voice
//     const voices = window.speechSynthesis.getVoices();
//     const preferred = voices.find(v =>
//       v.name.includes('Google UK English Male') ||
//       v.name.includes('Daniel') ||
//       v.name.includes('James') ||
//       v.name.includes('Male')
//     ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

//     if (preferred) utterance.voice = preferred;

//     utterance.onend = () => {
//       setPlaying(false);
//       onComplete?.();
//     };
//     utterance.onerror = () => setPlaying(false);

//     utteranceRef.current = utterance;
//     setPlaying(true);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     // Preload voices
//     window.speechSynthesis.getVoices();
//     return () => {
//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   return (
//     <button
//       onClick={speak}
//       className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
//         playing
//           ? 'bg-destructive text-destructive-foreground'
//           : 'bg-primary/10 text-primary hover:bg-primary/20'
//       }`}
//     >
//       {playing ? <Square size={14} /> : <Volume2 size={14} />}
//       {playing ? 'Stop' : label}
//     </button>
//   );
// }
