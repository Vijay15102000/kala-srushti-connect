import { useLang } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground font-body">{t('footer.text')}</p>
      </div>
    </footer>
  );
}
