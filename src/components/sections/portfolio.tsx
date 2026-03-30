'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import type { PortfolioItem } from '@/lib/types';
import { Button } from '@/components/ui/button';

const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  if (!item.featuredImageUrl) {
    return null;
  }

  return (
    <Link href={`/portfolio/${item.id}`} className="group block overflow-hidden">
      <Image
        src={item.featuredImageUrl}
        alt={item.title}
        width={800}
        height={600}
        className="w-full h-auto object-cover aspect-video transition-all duration-300 group-hover:scale-105"
      />
    </Link>
  );
};


function PortfolioComponent() {
  const { t, portfolioItems } = useLanguage();
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: t('portfolioFilterAll') },
    { key: 'design', label: t('portfolioFilterDesign') },
    { key: 'dev', label: t('portfolioFilterDev') },
    { key: 'ai', label: t('portfolioFilterAi') },
  ];

  const filteredItems = portfolioItems.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <section id="portfolio" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4 text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                {t('portfolioTitle')}
            </h2>
        </div>

        <div className="flex justify-center gap-2 mb-8">
            {categories.map((cat) => (
            <Button
                key={cat.key}
                variant={filter === cat.key ? 'default' : 'secondary'}
                onClick={() => setFilter(cat.key)}
            >
                {cat.label}
            </Button>
            ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
            ))}
        </div>
      </div>
    </section>
  );
};


const Portfolio = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PortfolioComponent />
  </Suspense>
);


export default Portfolio;
