import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Navbar({ onLogin, onSignup }: NavbarProps) {
  const { t, toggleLang } = useLang();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['home', 'recipes', 'history', 'places'] as const;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <button onClick={() => scrollTo('home')} className="font-heading text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Karnataka <span className="text-gradient">Culinary</span>
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <button key={l} onClick={() => scrollTo(l)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors capitalize">
                {t(`nav.${l}`)}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleLang} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.langToggle')}
            </button>

            {user ? (
              <>
                {isAdmin && (
                  <button onClick={() => navigate('/admin')} className="text-sm font-medium px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity flex items-center gap-1.5">
                    <Shield size={14} /> Admin
                  </button>
                )}
                <span className="text-sm text-muted-foreground font-body">{user.email}</span>
                <button onClick={logout} className="text-sm font-medium px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={onLogin} className="text-sm font-medium px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors">
                  {t('nav.login')}
                </button>
                <button onClick={onSignup} className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  {t('nav.signup')}
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 z-40 md:hidden" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-72 z-50 glass-panel shadow-2xl p-6 flex flex-col gap-6 md:hidden">
              <button onClick={() => setOpen(false)} className="self-end p-2"><X size={24} /></button>
              {links.map(l => (
                <button key={l} onClick={() => scrollTo(l)} className="text-lg font-heading font-medium text-foreground capitalize text-left">
                  {t(`nav.${l}`)}
                </button>
              ))}
              <hr className="border-border" />
              <button onClick={toggleLang} className="text-sm text-muted-foreground">
                {t('nav.langToggle')}
              </button>

              {user ? (
                <>
                  {isAdmin && (
                    <button onClick={() => { navigate('/admin'); setOpen(false); }} className="text-left font-medium flex items-center gap-2 text-accent">
                      <Shield size={16} /> Admin Dashboard
                    </button>
                  )}
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                  <button onClick={() => { logout(); setOpen(false); }} className="text-left font-medium text-destructive">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => { onLogin(); setOpen(false); }} className="text-left font-medium">{t('nav.login')}</button>
                  <button onClick={() => { onSignup(); setOpen(false); }} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center font-medium">{t('nav.signup')}</button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
