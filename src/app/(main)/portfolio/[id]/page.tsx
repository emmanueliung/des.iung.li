'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import type { PortfolioItem } from '@/lib/types';
import { portfolioItems as allPortfolioItems } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, CheckCircle2, Code2, Sparkles, Layers } from 'lucide-react';

const ProjectPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const [item, setItem] = useState<PortfolioItem | undefined>(undefined);
  
  useEffect(() => {
    const id = params.id;
    if (!id || typeof id !== 'string') return;
    
    const numericId = parseInt(id, 10);
    const items = allPortfolioItems[language];
    const foundItem = items.find((p) => p.id === numericId);
    setItem(foundItem);
  }, [params.id, language]);

  const labels = {
    fr: {
      back: 'Retour aux projets',
      notFound: 'Projet non trouvé',
      liveButtonDefault: 'Voir le site en direct',
      aboutTitle: 'À propos du développement',
      featuresTitle: 'Fonctionnalités & Réalisations clés',
      techTitle: 'Technologies employées',
    },
    en: {
      back: 'Back to projects',
      notFound: 'Project not found',
      liveButtonDefault: 'Visit Live Website',
      aboutTitle: 'Development Overview',
      featuresTitle: 'Key Features & Deliverables',
      techTitle: 'Technologies Used',
    },
    es: {
      back: 'Volver a los proyectos',
      notFound: 'Proyecto no encontrado',
      liveButtonDefault: 'Ver sitio en vivo',
      aboutTitle: 'Acerca del desarrollo',
      featuresTitle: 'Funcionalidades y logros clave',
      techTitle: 'Tecnologías utilizadas',
    },
  }[language] || {
    back: 'Retour aux projets',
    notFound: 'Projet non trouvé',
    liveButtonDefault: 'Voir le site en direct',
    aboutTitle: 'À propos du développement',
    featuresTitle: 'Fonctionnalités & Réalisations clés',
    techTitle: 'Technologies employées',
  };

  if (!item) {
    return (
      <main className="flex-1">
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center space-y-4">
            <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              {labels.notFound}
            </h1>
            <div>
              <Button asChild variant="outline" size="sm" className="rounded-full gap-2">
                <Link href="/#portfolio">
                  <ArrowLeft className="h-4 w-4" />
                  <span>{labels.back}</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Top Back Navigation */}
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
                <Link href="/#portfolio">
                  <ArrowLeft className="h-4 w-4" />
                  <span>{labels.back}</span>
                </Link>
              </Button>
            </div>

            {/* Header Block */}
            <div className="mb-10 text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-3 w-3" />
                <span className="capitalize">{item.category}</span>
              </div>

              <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                {item.title}
              </h1>

              <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs px-2.5 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Live Website Button - ONLY FOR WEB PROJECTS WITH A LIVE URL */}
              {item.liveUrl && (
                <div className="pt-4 flex justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full gap-2 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6"
                  >
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{item.liveUrlLabel || labels.liveButtonDefault}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* In-depth Development Explanation (if provided) */}
            {item.longDescription && (
              <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2 font-headline text-xl font-bold text-foreground">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h2>{labels.aboutTitle}</h2>
                </div>
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.longDescription}
                </div>
              </div>
            )}

            {/* Key Features / Highlights (if provided) */}
            {item.features && item.features.length > 0 && (
              <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-muted/30 border border-border/60 shadow-sm space-y-4">
                <div className="flex items-center gap-2 font-headline text-lg font-bold text-foreground">
                  <Layers className="h-5 w-5 text-primary" />
                  <h2>{labels.featuresTitle}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Images */}
            <div className="space-y-8">
              {item.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-border/70 shadow-md relative aspect-video bg-muted"
                >
                  <Image
                    src={url}
                    alt={`${item.title} - image ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover w-full h-full"
                    data-ai-hint={item.imageHints[index] || ''}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Back Action */}
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="sm" className="rounded-full gap-2">
                <Link href="/#portfolio">
                  <ArrowLeft className="h-4 w-4" />
                  <span>{labels.back}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
