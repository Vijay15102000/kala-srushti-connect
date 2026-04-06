import { useLang } from '@/contexts/LanguageContext';
import { dishHistories } from '@/lib/data';
import { motion } from 'framer-motion';

export default function DishHistorySection() {
  const { t, lang } = useLang();

  return (
    <section className="py-20 md:py-28 bg-card relative">
      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 40C1200 0 960 60 720 40C480 20 240 70 0 40L0 80Z" fill="hsl(var(--card))" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
          {t('dishHistory.title')}
        </motion.h2>

        <div className="space-y-16 max-w-5xl mx-auto">
          {dishHistories.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="flex-1 space-y-3">
                <h3 className="font-heading text-2xl font-bold text-foreground">{dish.name[lang]}</h3>
                <p className="text-muted-foreground leading-relaxed font-body">{dish.story[lang]}</p>
              </div>
              <div className="flex-1 max-w-sm">
                {/* Replace this image with your own */}
                <img src={dish.image} alt={dish.name.en} className="rounded-xl shadow-lg w-full aspect-[4/3] object-cover hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
