'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import type { PortfolioItem } from '@/lib/types';
import { portfolioItems as allPortfolioItems } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const ProjectPage = () => {
  const params = useParams();
  const { t, language } = useLanguage();
  const [item, setItem] = useState<PortfolioItem | undefined>(undefined);
  
  useEffect(() => {
    const id = params.id;
    if (!id || typeof id !== 'string') return;
    
    const numericId = parseInt(id, 10);
    const items = allPortfolioItems[language];
    const foundItem = items.find((p) => p.id === numericId);
    setItem(foundItem);
  }, [params.id, language]);

  if (!item) {
    return (
      <main className="flex-1">
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
              Projet non trouvé
            </h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
                <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                {item.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">{item.description}</p>
            </div>
            
            <div className='text-center mb-12'>
              <div className="flex flex-wrap justify-center gap-2">
                {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </div>

            <div className="space-y-8">
              {item.imageUrls.map((url, index) => (
                <div key={index} className="overflow-hidden relative aspect-video">
                    <Image
                        src={url}
                        alt={`${item.title} - image ${index + 1}`}
                        fill
                        className="object-cover w-full h-auto"
                        data-ai-hint={item.imageHints[index]}
                    />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectPage;
