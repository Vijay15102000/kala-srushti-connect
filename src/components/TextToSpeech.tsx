
import { useState, useRef, useEffect } from 'react';
import { Volume2, Square } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  label?: string;
  onComplete?: () => void;
}

export default function TextToSpeech({ text, label = 'Play Audio', onComplete }: TextToSpeechProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speakWithBrowser = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Google UK English Male') ||
      v.name.includes('Daniel') ||
      v.name.includes('James') ||
      v.name.includes('Male')
    ) || voices.find(v => v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('kn')) || voices[0];

    if (preferred) utterance.voice = preferred;

    utterance.onend = () => {
      setPlaying(false);
      onComplete?.();
    };
    utterance.onerror = () => setPlaying(false);

    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const speakWithElevenLabs = async (apiKey: string) => {
    setPlaying(true);
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text.slice(0, 2500),
          model_id: 'eleven_monolingual_v1',
          voice_settings: { stability: 0.5, similarity_boost: 0.5 },
        }),
      });

      if (!response.ok) {
        console.warn('ElevenLabs API failed, falling back to browser TTS');
        setPlaying(false);
        speakWithBrowser();
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setPlaying(false);
        URL.revokeObjectURL(url);
        onComplete?.();
      };
      audio.onerror = () => {
        setPlaying(false);
        URL.revokeObjectURL(url);
      };
      audio.play();
    } catch {
      console.warn('ElevenLabs error, falling back to browser TTS');
      setPlaying(false);
      speakWithBrowser();
    }
  };

  const speak = () => {
    if (playing) {
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlaying(false);
      return;
    }

    const apiKey = localStorage.getItem('tts_api_key');
    if (apiKey && apiKey.trim()) {
      speakWithElevenLabs(apiKey.trim());
    } else {
      speakWithBrowser();
    }
  };

  useEffect(() => {
    window.speechSynthesis.getVoices();
    return () => {
      window.speechSynthesis.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
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
