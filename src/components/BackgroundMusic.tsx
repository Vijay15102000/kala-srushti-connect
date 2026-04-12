import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Free Karnataka folk-style ambient music URL (royalty-free)
const MUSIC_URL = 'https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08cb.mp3';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;

    // Try auto-play on first user interaction (click anywhere)
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        audio.play().then(() => setPlaying(true)).catch(() => {});
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Also try immediate autoplay
    audio.play().then(() => {
      setPlaying(true);
      setHasInteracted(true);
    }).catch(() => {
      // Browser blocked autoplay, wait for user interaction
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
    });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-all"
      aria-label={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
