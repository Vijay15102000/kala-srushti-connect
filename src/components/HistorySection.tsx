import { useLang } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function HistorySection() {
  const { t } = useLang();

  const paragraphs = ['history.p1', 'history.p2', 'history.p3', 'history.p4'];

  return (
    <section id="history" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center mb-12 text-foreground"
        >
          {t('history.title')}
        </motion.h2>

        <div className="space-y-6">
          {paragraphs.map((key, i) => (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-muted-foreground leading-relaxed text-base md:text-lg font-body"
            >
              {t(key)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
