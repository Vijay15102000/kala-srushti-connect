import { useState, useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { places } from '@/lib/data';
import { motion } from 'framer-motion';

export default function PlacesSection() {
  const { t, lang } = useLang();

  return (
    <section id="places" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-3xl md:text-5xl font-bold text-center mb-12 text-foreground">
          {t('places.title')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {places.map((place, i) => (
            <PlaceCard key={place.id} place={place} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceCard({ place, index }: { place: typeof places[0]; index: number }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => { setHovered(true); videoRef.current?.play(); };
  const handleLeave = () => { setHovered(false); videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative aspect-video overflow-hidden">
        {/* Replace this image/video with your own */}
        <img src={place.image} alt={place.name.en} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} loading="lazy" />
        <video ref={videoRef} src={place.video} muted loop playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">{place.name[lang]}</h3>
        <p className="text-sm text-muted-foreground mt-1 font-body">{place.description[lang]}</p>
      </div>
    </motion.div>
  );
}
