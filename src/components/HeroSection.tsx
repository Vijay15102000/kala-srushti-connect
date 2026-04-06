import { useLang } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background video — Replace this video with your own */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1280&q=80"
        src="https://cdn.pixabay.com/video/2020/07/30/45735-446800773_large.mp4"
      />
      <div className="absolute inset-0 hero-overlay" />

      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-background leading-tight tracking-tight">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-background/80 text-base md:text-lg max-w-2xl mx-auto font-body">
          {t('hero.subtitle')}
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer" onClick={() => document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })}>
        <p className="text-background/70 text-xs md:text-sm text-center max-w-[260px] font-body">{t('scroll.text')}</p>
        <ChevronDown className="text-background/70 animate-bounce-down" size={24} />
      </div>
    </section>
  );
}
