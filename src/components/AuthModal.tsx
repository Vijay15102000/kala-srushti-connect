import { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'signup' | null;
  onClose: () => void;
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const { t } = useLang();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!mode) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.includes('@')) errs.email = 'Invalid email';
    if (password.length < 6) errs.password = 'Min 6 characters';
    if (mode === 'signup' && password !== confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Replace with actual API call to your backend
      // Your backend should return { id, email, role } after authentication
      // For now, simulating: use "admin@admin.com" to get admin role
      const role = email.toLowerCase() === 'admin@admin.com' ? 'admin' : 'user';
      login({ id: Date.now().toString(), email, role });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="glass-panel rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>

          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            {mode === 'login' ? t('auth.login.title') : t('auth.signup.title')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground font-body">{t('auth.email')}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm" />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground font-body">{t('auth.password')}</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm" />
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-sm font-medium text-foreground font-body">{t('auth.confirmPassword')}</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm" />
                {errors.confirm && <p className="text-destructive text-xs mt-1">{errors.confirm}</p>}
              </div>
            )}

            <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity font-body">
              {t('auth.submit')}
            </button>

            <p className="text-xs text-muted-foreground text-center font-body">
              Demo: use <strong>admin@admin.com</strong> to login as admin
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
