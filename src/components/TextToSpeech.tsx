
import { useState, useRef, useEffect } from 'react';
import { Volume2, Square, Settings } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  label?: string;
  onComplete?: () => void;
}

export default function TextToSpeech({ text, label = 'Play Audio', onComplete }: TextToSpeechProps) {
  const [playing, setPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.volume = 1;

    // Try to pick a deeper/dramatic voice
    const voices = window.speechSynthesis.getVoices();
console.log("Voices:", voices.name);
    const preferred = voices.find(v =>
      v.name.includes('Google UK English Male') ||
      v.name.includes('Daniel') ||
      v.name.includes('James') ||
      v.name.includes('Male')
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (preferred) utterance.voice = preferred;

    utterance.onend = () => {
      setPlaying(false);
      onComplete?.();
    };
    utterance.onerror = () => setPlaying(false);

    utteranceRef.current = utterance;
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Preload voices
    window.speechSynthesis.getVoices();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <button
      onClick={speak}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        playing
          ? 'bg-destructive text-destructive-foreground'
          : 'bg-primary/10 text-primary hover:bg-primary/20'
      }`}
    >
      {playing ? <Square size={14} /> : <Volume2 size={14} />}
      {playing ? 'Stop' : label}
    </button>
  );
}
