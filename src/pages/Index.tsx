import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HistorySection from '@/components/HistorySection';
import RecipesSection from '@/components/RecipesSection';
import DishHistorySection from '@/components/DishHistorySection';
import PlacesSection from '@/components/PlacesSection';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export default function Index() {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);

  return (
    <LanguageProvider>
      <ScrollProgress />
      <Navbar onLogin={() => setAuthMode('login')} onSignup={() => setAuthMode('signup')} />
      <main>
        <HeroSection />
        <HistorySection />
        <RecipesSection />
        <DishHistorySection />
        <PlacesSection />
      </main>
      <Footer />
      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
    </LanguageProvider>
  );
}
