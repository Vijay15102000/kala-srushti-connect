import { useState, useRef } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { recipes } from '@/lib/data';
import { motion } from 'framer-motion';
import { Search, Clock } from 'lucide-react';

export default function RecipesSection() {
  const { t, lang } = useLang();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = recipes.filter(r => {
    const matchSearch = r.name[lang].toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.category === filter;
    return matchSearch && matchFilter;
  });

  const filters = ['all', 'veg', 'nonveg', 'coastal'] as const;
  const filterKeys: Record<string, string> = { all: 'recipes.filter.all', veg: 'recipes.filter.veg', nonveg: 'recipes.filter.nonveg', coastal: 'recipes.filter.coastal' };

  return (
    <section id="recipes" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-3xl md:text-5xl font-bold text-center mb-10 text-foreground">
          {t('recipes.title')}
        </motion.h2>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('recipes.search')}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                {t(filterKeys[f])}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecipeCard({ recipe, index }: { recipe: typeof recipes[0]; index: number }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Replace this image with your own */}
        <img src={recipe.image} alt={recipe.name.en} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} loading="lazy" />
        {/* Replace this video with your own */}
        <video ref={videoRef} src={recipe.video} muted loop playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">{recipe.name[lang]}</h3>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={14} /> {recipe.time}
        </span>
      </div>
    </motion.div>
  );
}
