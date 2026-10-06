'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useLanguage } from '@/hooks/use-language';
import type { AppItem } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Film,
  Image as ImageIcon,
} from 'lucide-react';

const CategoriesSlider = () => {
  const { t, apps } = useLanguage();
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'image'>('video');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  if (!apps || apps.length === 0) {
    return null;
  }

  const handleOpenApp = (app: AppItem) => {
    setSelectedApp(app);
    setActiveMediaTab(app.videoUrl ? 'video' : 'image');
    setActiveGalleryIndex(0);
  };

  // Duplicate items for a smooth and infinite loop
  const carouselApps = [...apps, ...apps];

  // Helper to check if a video URL is an embed (YouTube, Vimeo, Loom)
  const isEmbedVideo = (url?: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('loom.com') || url.includes('vimeo.com');
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background border-y border-border/40 relative">
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t('labSectionBadge')}</span>
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              {t('labSectionTitle')}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {t('labSectionSubtitle')}
            </p>
          </div>
          <div>
            <Button asChild variant="outline" size="sm" className="rounded-full gap-2 group">
              <Link href="/ai-lab">
                <span>{t('labSectionCta')}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: 'start',
          dragFree: true,
        }}
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="-ml-3 md:-ml-4 px-4">
          {carouselApps.map((app, index) => (
            <CarouselItem
              key={`${app.id}-${index}`}
              className="basis-[85%] sm:basis-[50%] md:basis-[38%] lg:basis-[28%] xl:basis-[24%] pl-3 md:pl-4"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleOpenApp(app)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenApp(app);
                  }
                }}
                className="group relative h-[380px] rounded-2xl overflow-hidden border border-border/70 bg-card cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:border-primary/50 flex flex-col justify-between p-5 text-left select-none focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {/* Background Image with grayscale to color on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={app.sliderImage || app.image}
                    alt={app.title}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 35vw, 25vw"
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Contrast gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35 group-hover:via-black/50 transition-colors duration-500" />
                </div>

                {/* Top Badge & Status */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/65 backdrop-blur-md text-white border border-white/20 shadow-sm">
                    <span
                      className={`h-2 w-2 rounded-full ${app.badge.dotColor || 'bg-primary'} animate-pulse`}
                    />
                    {app.badge.label}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {app.videoUrl && (
                      <span className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 border border-white/10 group-hover:text-primary transition-all shadow-sm">
                        <Film className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {app.liveUrl ? (
                      <span className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/80 border border-white/10 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/70 border border-white/10 transition-all shadow-sm">
                        <Lock className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 mt-auto pt-6">
                  <h3 className="font-headline text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                    {app.subtitle}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {app.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white border border-white/15"
                      >
                        {tech}
                      </span>
                    ))}
                    {app.techStack.length > 3 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-white/80">
                        +{app.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Interactive hint */}
                  <div className="mt-3.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-white/80 font-medium group-hover:text-white transition-colors">
                    <span>{t('labCardHoverCta')}</span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Interactive Detail Modal (Dialog) */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        {selectedApp && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-card border border-border">
            <DialogHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="gap-1.5 text-xs py-1 px-3 border-primary/30 bg-primary/10 text-primary font-medium"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${selectedApp.badge.dotColor || 'bg-primary'}`}
                    />
                    {selectedApp.badge.label}
                  </Badge>
                  {selectedApp.confidential && (
                    <Badge variant="secondary" className="gap-1 text-xs py-1 px-2.5 text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Usage Privé</span>
                    </Badge>
                  )}
                </div>

                {/* Direct quick link in header if liveUrl available */}
                {selectedApp.liveUrl && (
                  <Button asChild size="sm" className="gap-1.5 rounded-full shadow-sm text-xs h-8">
                    <a
                      href={selectedApp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{selectedApp.liveUrlLabel || t('labModalLiveBtn')}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </div>

              <DialogTitle className="font-headline text-3xl font-bold tracking-tight text-foreground">
                {selectedApp.title}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground leading-normal">
                {selectedApp.subtitle}
              </DialogDescription>
            </DialogHeader>

            {/* Media Selector Tabs (if both video & image exist) */}
            {selectedApp.videoUrl && (
              <div className="flex items-center gap-2 pt-2">
                <Button
                  size="sm"
                  variant={activeMediaTab === 'video' ? 'default' : 'outline'}
                  onClick={() => setActiveMediaTab('video')}
                  className="rounded-full text-xs gap-1.5 h-8"
                >
                  <Film className="h-3.5 w-3.5" />
                  <span>{t('labModalTabVideo')}</span>
                </Button>
                <Button
                  size="sm"
                  variant={activeMediaTab === 'image' ? 'default' : 'outline'}
                  onClick={() => setActiveMediaTab('image')}
                  className="rounded-full text-xs gap-1.5 h-8"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>{t('labModalTabImages')}</span>
                </Button>
              </div>
            )}

            {/* Media Viewer Banner (Video OR Image) */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-black/90 my-2 shadow-inner">
              {activeMediaTab === 'video' && selectedApp.videoUrl ? (
                isEmbedVideo(selectedApp.videoUrl) ? (
                  <iframe
                    src={selectedApp.videoUrl}
                    title={`Video Demo ${selectedApp.title}`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={selectedApp.videoUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                )
              ) : (
                <Image
                  src={
                    selectedApp.gallery && selectedApp.gallery.length > 0
                      ? selectedApp.gallery[activeGalleryIndex]
                      : selectedApp.image
                  }
                  alt={selectedApp.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Gallery Thumbnails (if multiple images are available) */}
            {activeMediaTab === 'image' && selectedApp.gallery && selectedApp.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {selectedApp.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      activeGalleryIndex === idx
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-border/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Context & Presentation */}
            <div className="space-y-5 text-sm text-foreground/90">
              <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
                {selectedApp.description}
              </p>

              {/* Challenge & Solution Grid */}
              {(selectedApp.challenge || selectedApp.solution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {selectedApp.challenge && (
                    <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                        <Cpu className="h-4 w-4 text-primary" />
                        <span>{t('labModalChallengeTitle')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedApp.challenge}
                      </p>
                    </div>
                  )}
                  {selectedApp.solution && (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-primary text-sm">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>{t('labModalSolutionTitle')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedApp.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Features */}
              {selectedApp.features && selectedApp.features.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Layers className="h-4 w-4 text-primary" />
                    <span>{t('labModalFeaturesTitle')}</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedApp.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/40"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span>{t('labModalTechTitle')}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs font-mono py-1 px-3"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Notice if Confidential */}
              {selectedApp.confidential && selectedApp.confidentialNotice && (
                <div className="p-3.5 rounded-xl bg-muted/60 border border-border/80 text-xs text-muted-foreground flex items-start gap-2.5">
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span>{selectedApp.confidentialNotice}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/60">
              <div className="text-xs text-muted-foreground">
                {selectedApp.liveUrl ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-500 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Lien direct disponible
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Environnement privé / démo locale
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedApp(null)}
                  className="w-full sm:w-auto"
                >
                  {t('labModalCloseBtn')}
                </Button>

                {selectedApp.liveUrl && (
                  <Button asChild className="w-full sm:w-auto gap-2">
                    <a
                      href={selectedApp.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{selectedApp.liveUrlLabel || t('labModalLiveBtn')}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default CategoriesSlider;
