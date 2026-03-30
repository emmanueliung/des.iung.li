'use client';

import { useLanguage } from '@/hooks/use-language';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <main className="flex-1 text-foreground bg-background">
      <section id="about" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              {t('aboutTitle')}
            </h1>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>{t('aboutParagraph1')}</p>
              <p>{t('aboutParagraph2')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
